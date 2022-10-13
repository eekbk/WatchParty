// File for handling user endpoints
import express, { Response, Router } from 'express';
import { RequestWithUser } from '../../interfaces/interfaces';
import { prisma } from '../db/index';

const user: Router = express.Router();

user.get('/', (req: RequestWithUser, res: Response) => {
  const { user } = req;
  if (user === undefined) {
    res.sendStatus(400);
  } else {
    prisma.playlist
      .findMany({
        where: {
          user_id: user.id,
        },
        include: {
          playlist_videos: {
            select: {
              video: true,
            },
          },
        },
      })
      .then((playlists: any) => {
        console.log('checking playlists:', playlists[0].playlist_videos);
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
          include: {
            videos: true,
          },
        });
      })
      .then((parties: any) => {
        user.parties = parties;
        return prisma.user_Party.findMany({
          where: {
            user_id: user.id,
          },
        });
      })
      .then((UP) => {
        user.parties = user.parties.map((p) => {
          p.role = UP.filter((up) => up.party_id === p.id)[0].role;
          return p;
        });
        return prisma.user.findMany({
          where: {
            relatee: {
              some: {
                type: 'FOLLOW',
                relator: {
                  id: user.id,
                },
              },
            },
          },
        });
      })
      .then((friends) => {
        user.friends = friends.map((f) => ({
          id: f.id,
          username: f.user_name,
        }));
        return prisma.user.findMany({
          where: {
            relatee: {
              some: {
                type: 'BLOCK',
                relator: {
                  id: user.id,
                },
              },
            },
          },
        });
      })
      .then((enemies) => {
        user.enemies = enemies.map((f) => ({
          id: f.id,
          username: f.user_name,
        }));
        res.status(200).json(user);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(err.status);
      });
  }
});

user.post('/playlist', (req: RequestWithUser, res: Response) => {
  const { playlist } = req.body;
  const { videos } = playlist;
  delete playlist.videos;
  prisma.playlist
    .create({
      data: {
        ...playlist,
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
      res.sendStatus(500);
    });
});

user.post('/');

export default user;
