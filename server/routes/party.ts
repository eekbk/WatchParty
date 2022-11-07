// File for handling WatchParty endpoints
import express, { Request, Response, Router } from 'express';
import axios from 'axios';
import { prisma } from '../db/index';
import { YoutubeVideo, RequestWithUser } from '../../interfaces/interfaces';

export const party: Router = express.Router();

// Get all watch parties
party.get('/', (req: Request, res: Response) => {
  // Retrieve all watch parties from the database
  prisma.party
    .findMany({
      where: {
        type: 'PARTY',
        NOT: {
          status: 'ARCHIVED',
        },
      },
      include: {
        party_videos: {
          select: {
            video: true,
            index: true,
          },
        },
        user_parties: {
          select: {
            role: true,
            user: {
              select: {
                user_name: true,
                id: true,
              },
            },
          },
        },
      },
    })
    .then((parties: any) => {
      parties.forEach((pt) => {
        pt.users = pt.user_parties.map((usr) => ({
          id: usr.user.id,
          username: usr.user.user_name,
          role: usr.role,
        }));
        pt.videos = pt.party_videos.map((vd) => ({
          ...vd.video,
          index: vd.index,
        }));
        pt.videos.sort((a, b) => a.index - b.index);
        delete pt.user_parties;
        delete pt.party_videos;
      });
      res.status(200).send(JSON.stringify(parties));
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(err.status);
    });
});

// Creates a watch party
party.post('/', (req: RequestWithUser, res: Response) => {
  const { party } = req.body;
  let {
    name,
    description,
    type,
    status,
    is_private,
    will_archive,
    admins,
    invitees,
    date_time,
    user_id,
    videos,
    thumbnail,
  } = party;
  invitees = invitees || [];
  admins = admins || [];
  invitees = invitees.filter((i) => !admins.some((a) => i.id === a.id));
  const participants = admins
    .map((ad: any) => ({ role: 'ADMIN', user: { connect: { id: ad.id } } }))
    .concat(
      invitees.map((inv: any) => ({
        role: 'NORMIE',
        user: {
          connect: {
            id: inv.id,
          },
        },
      }))
    );
  participants.push({
    role: 'CREATOR',
    user: {
      connect: {
        id: user_id,
      },
    },
  });
  prisma.party
    .create({
      data: {
        name,
        description,
        date_time,
        type,
        status,
        is_private,
        will_archive,
        thumbnail,
        party_videos: {
          create: videos,
        },
        user_parties: {
          create: participants,
        },
      },
    })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

// Gets a watch party by its id
party.get('/id/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  prisma.party
    .findUnique({
      where: {
        id,
      },
      include: {
        party_videos: {
          select: {
            video: true,
            index: true,
          },
        },
        user_parties: {
          select: {
            role: true,
            user: {
              select: {
                user_name: true,
                id: true,
              },
            },
          },
        },
      },
    })
    .then((pt: any) => {
      pt.users = pt.user_parties.map((usr) => ({
        id: usr.user.id,
        username: usr.user.user_name,
        role: usr.role,
      }));
      pt.videos = pt.party_videos.map((vd) => ({
        ...vd.video,
        index: vd.index,
      }));
      pt.videos.sort((a, b) => a.index - b.index);
      delete pt.user_parties;
      delete pt.party_videos;
      res.status(200).send(pt);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

// Gets a video from the youtube api and stores its relevant information in the database
party.post('/video', (req: Request, res: Response) => {
  const { videoId, videoUrl } = req.body;
  let formattedVideo;
  prisma.video
    .findFirst({
      where: {
        id: videoId,
      },
    })
    .then((results) => {
      if (results) {
        res.status(200).send(results);
      } else {
        return Promise.resolve(
          axios.get(
            `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${process.env.YOUTUBE_KEY}`
          )
        );
      }
    })
    .then((video: YoutubeVideo) => {
      if (video === undefined) {
        return undefined;
      }
      const tempVideo = video.data;
      formattedVideo = {
        id: videoId,
        url: videoUrl,
        title: tempVideo.items[0].snippet.title,
        description: tempVideo.items[0].snippet.description,
        thumbnail: tempVideo.items[0].snippet.thumbnails.medium.url,
      };
      return prisma.video.upsert({
        where: {
          id: videoId,
        },
        update: {},
        create: formattedVideo,
      });
    })
    .then((r) => {
      if (r === undefined) {
        return undefined;
      }
      res.send(formattedVideo);
    })
    .catch((err) => {
      console.error('error: ', err);
      res.sendStatus(500);
    });
});

// Gets all archived WatchParties
party.get('/archive', (req: RequestWithUser, res: Response) => {
  const { user } = req;
  prisma.party
    .findMany({
      where: {
        status: 'ARCHIVED',
        user_parties: {
          some: {
            user_id: user.id,
          },
        },
      },
      include: {
        party_videos: {
          select: {
            video: true,
            index: true,
          },
        },
      },
    })
    .then((archives: any) => {
      archives.map((pt) => {
        pt.videos = pt.party_videos.map((vd) => ({
          ...vd.video,
          index: vd.index,
        }));
        delete pt.party_videos;
        pt.videos.sort((a, b) => a.index - b.index);
        return pt;
      });
      res.status(200).send(JSON.stringify(archives));
    })
    .catch((err) => res.status(404).send(JSON.stringify(err)));
});

// Archives A watchParty
party.post('/archive', (req: RequestWithUser, res: Response) => {
  const party = req.body;
  prisma.party
    .update({
      where: {
        id: party.id,
      },
      data: {
        status: 'ARCHIVED',
      },
    })
    .then((data) => res.status(201).send(JSON.stringify(data)))
    .catch((err) => res.status(404).send(JSON.stringify(err)));
});

// Adds a video to an existing watch party
party.put('/addVideo/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { video, index } = req.body;
  prisma.party_Video
    .create({
      data: {
        index,
        party: {
          connect: {
            id,
          },
        },
        video: {
          connect: {
            id: video,
          },
        },
      },
    })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

// Removes a video from an existing watch party
party.put('/removeVideo/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { video, index } = req.body;
  prisma.party_Video
    .deleteMany({
      where: {
        AND: {
          party_id: id,
          video_id: video,
          index,
        },
      },
    })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

// Changes a user's role in a watch party
party.post('/role', (req: RequestWithUser, res: Response) => {
  const { user_id, party_id, role } = req.body;
  prisma.user_Party
    .updateMany({
      where: {
        AND: [
          {
            user_id: {
              contains: user_id,
            },
          },
          {
            party_id: {
              contains: party_id,
            },
          },
        ],
      },
      data: {
        role,
      },
    })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

// Removes a user's connection to a watch party
party.delete('/role', (req: RequestWithUser, res: Response) => {
  const { user_id, party_id } = req.body;
  prisma.user_Party
    .deleteMany({
      where: {
        AND: [
          {
            user_id: {
              contains: user_id,
            },
          },
          {
            party_id: {
              contains: party_id,
            },
          },
        ],
      },
    })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

// attend a party as a normie!
party.post('/attend', async (req: RequestWithUser, res: Response) => {
  const { party_id, user_id } = req.body;
  try {
    await prisma.user_Party.create({
      data: {
        party_id,
        user_id,
        role: 'NORMIE',
      },
    });
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
});

party.post('/dmMessages', (req: RequestWithUser, res: Response) => {
  const { room } = req.body;
  if (room) {
    prisma.message
      .findMany({
        where: {
          party_id: room,
        },
        select: {
          user: true,
          message: true,
        },
      })
      .then((messages) => {
        res.status(200).send(messages);
      })
      .catch((err) => res.status(404).send(JSON.stringify(err)));
  }
});

// Deletes a watch party by its id
party.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  prisma.user_Party
    .deleteMany({
      where: {
        party_id: id,
      },
    })
    .then(() => prisma.message.deleteMany({
        where: {
          party_id: id,
        },
      }))
    .then(() => prisma.party_Video.deleteMany({
        where: {
          party_id: id,
        },
      }))
    .then(() => prisma.party.delete({
        where: {
          id,
        },
      }))
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});
