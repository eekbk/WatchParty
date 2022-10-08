// File for handling user endpoints
import express, { Response, Router } from 'express';
import { User, RequestWithUser } from '../../interfaces';
import { prisma } from '../db/index';

const user: Router = express.Router();

user.get('/', (req: RequestWithUser, res: Response) => {
  const { user } = req;
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

user.post('/playlist', (req: RequestWithUser, res: Response) => {
  const { playlist } = req.body;
  const { user } = req;
  const {
    name, description, videos, thumbnail,
  } = playlist;
  prisma.playlist
    .create({
      data: {
        name,
        description,
        thumbnail: thumbnail || '',
        user_id: user.id,
        playlist_videos: {
          connect: videos.map((id: string) => ({ id })),
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
