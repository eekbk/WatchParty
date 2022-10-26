import express, { Request, Response, Router } from 'express';
import { prisma } from '../db/index';

export const video: Router = express.Router();

// get all parties a video is attached to
video.get('/parties/:videoId', (req: Request, res: Response) => {
  const { videoId } = req.params;
  prisma.party
    .findMany({
      where: {
        videos: {
          some: {
            id: videoId,
          },
        },
      },
      include: {
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
    .then((parties) => {
      parties.forEach((party: any) => {
        party.users = party.user_parties.map((usr) => ({
          id: usr.user.id,
          username: usr.user.user_name,
          role: usr.role,
        }));
        delete party.user_parties;
      });
      return parties;
    })
    .then((parties) => {
      res.status(200).send(parties);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});
