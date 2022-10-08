// File for handling user endpoints
import express, { Request, Response, Router } from 'express';
import { prisma } from '../db/index';
// import { Playlist } from '@prisma/client';

const user: Router = express.Router();

user.get('/', (req: Request, res: Response) => {
  const { user } = req;
  console.log(req.user);
  prisma.playlist
    .findMany({
      where: {
        user_id: user.id,
      },
    })
    .then((playlists) => {
      user.playlists = playlists;
      return prisma.party.findMany({
        where: {
          user_parties: {
            some: {
              user: {
                id: user.id,
              },
            },
          },
        },
      });
    })
    .then((parties) => {
      user.parties = parties;
      res.status(200).json(user);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(err.status);
    });
});

user.post('/playlist', (req: Request, res: Response) => {
  const { playlist } = req.body;
  const { user } = req;
  const {
    name,
    description,
    videos,
    thumbnail,
  }: { name: any; description: any; videos: any; thumbnail: any } = playlist;
  prisma.playlist
    .create({
      data: {
        name,
        description,
        thumbnail: thumbnail || '',
        user_id: user.id,
        playlist_videos: {
          connect: videos.map((id) => ({ id })),
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

export default user;
