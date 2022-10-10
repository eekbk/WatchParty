// File for handling WatchParty endpoints
import express, { Request, Response, Router } from 'express';
import { Party } from '@prisma/client';
import axios from 'axios';
import { prisma } from '../db/index';
import { YoutubeVideo, RequestWithUser } from '../../interfaces';

const { default: dummyData } = require('../../dummyData.ts');

export const party: Router = express.Router();

// Get video dummy data
party.get('/test', (req: Request, res: Response) => {
  res.status(200).send(JSON.stringify(dummyData));
});

// Get all watch parties
party.get('/', (req: Request, res: Response) => {
  // Retrieve all watch parties from the database
  prisma.party
    .findMany()
    .then((parties) => {
      res.status(200).send(JSON.stringify(parties));
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(err.status);
    });
});

party.get('/topParties', (req: Request, res: Response) => {
  // Retrieve all watch parties that have a not null id from the database
  prisma.party
    .findMany({
      where: {
        NOT: {
          playlist_id: null,
        },
      },
    }) // return where playlist id is truthy)
    .then((playlists) => {
      res.status(200).send(JSON.stringify(playlists));
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(err.status);
    });
});

// Create a watch party
// Create a playlist if not importing, then send playlist id to this endpoint either way
// New rules: Either create from a playlist only or by adding videos individually.
// type, status, is_recurring, is_private, user_parties
party.post('/', (req: RequestWithUser, res: Response) => {
  // Get the party values out of the request body
  const { party, playlistId } = req.body;
  console.log(playlistId);
  // Create the new party in the database
  let {
    name,
    description,
    type,
    status,
    is_private,
    is_recurring,
    admins,
    invitees,
  } = party;
  invitees = invitees || [];
  admins = admins || [];
  const participants = admins
    .map((id: string) => ({ role: 'ADMIN', user: { connect: { id } } }))
    .concat(
      invitees.map((id: string) => ({
        role: 'NORMIE',
        user: { connect: { id } },
      })),
    );
  participants.push({
    role: 'CREATOR',
    user: { connect: { id: req.user.id } },
  });
  prisma.party
    .create({
      data: {
        name,
        type,
        description,
        status,
        is_private,
        is_recurring,
        playlist: {
          connect: {
            id: playlistId,
          },
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
      res.sendStatus(err.status);
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

party.post('/playlist', (req: Request, res: Response) => {
  const { playlist } = req.body;
  const {
    name, description, videos, thumbnail,
  } = playlist;
  prisma.playlist
    .create({
      data: {
        name,
        description,
        thumbnail: thumbnail || '',
        playlist_videos: {
          create: videos.map((id: string) => ({ video: { connect: { id } } })),
        },
      },
    })
    .then((pl) => {
      res.status(200).send(pl.id);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(err.status);
    });
});

/*
trying
to save
this
merge
I
hate
merging
lets
see
what
happens
when
i
do
this
ok
hello
d
fdfdfdf
*/

// get the playlist attached to a party
party.get('/playlist/:roomId', async (req: Request, res: Response) => {
  const { roomId } = req.params;
  console.log('roomId:\n', roomId);
  try {
    const playlistVideos = await prisma.party.findUnique({
      where: {
        id: roomId,
      },
      include: {
        playlist: {
          include: {
            videos: true,
          },
        },
      },
    });

    res.status(200).json(playlistVideos);
  } catch (err) {
    res.sendStatus(500);
  }
});
