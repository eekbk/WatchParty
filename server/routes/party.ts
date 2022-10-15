// File for handling WatchParty endpoints
import express, { Request, Response, Router } from 'express';
import { Party } from '@prisma/client';
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
      },
      include: {
        videos: true,
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
        delete pt.user_parties;
      });
      res.status(200).send(JSON.stringify(parties));
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(err.status);
    });
});

// Create a watch party
party.post('/', (req: RequestWithUser, res: Response) => {
  // Get the party values out of the request body
  const { party } = req.body;
  // Create the new party in the database
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
  const participants = admins
    .map((id: string) => ({ role: 'ADMIN', user: { connect: { id } } }))
    .concat(
      invitees.map((id: string) => ({
        role: 'NORMIE',
        user: {
          connect: {
            id,
          },
        },
      })),
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
        videos: {
          connect: videos,
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

// Update a watch party
party.put('/:partyId', (req: Request, res: Response) => {
  // Get the party id out of the request params
  const { partyId } = req.params;
  // Get the updated values out of the request body
  const { party }: { party: Party } = req.body;
  // Update the party with the updated values with the matching id in the database
  prisma.party
    .update({
      where: {
        id: partyId,
      },
      data: party,
    })
    .then(() => {
      res.sendStatus(300);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(err.status);
    });
});

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
            `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${process.env.YOUTUBE_KEY}`,
          ),
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

party.put('/addVideo/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { video } = req.body;
  prisma.party
    .update({
      where: {
        id,
      },
      data: {
        videos: {
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

party.put('/removeVideo/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { video } = req.body;
  prisma.party
    .update({
      where: {
        id,
      },
      data: {
        videos: {
          disconnect: {
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
    .then((results) => {
      console.log('success: ', results);
      res.sendStatus(200);
    })
    .catch(() => {
      res.sendStatus(500);
    });
});

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
    .then((results) => {
      console.log('success: ', results);
      res.sendStatus(200);
    })
    .catch(() => {
      res.sendStatus(500);
    });
});
