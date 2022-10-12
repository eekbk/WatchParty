import express, { Request, Response, Router } from 'express';
import { prisma } from '../db/index';

export const playlist: Router = express.Router();

playlist.post('/seed', async (req: Request, res: Response) => {
  console.log('inside the playlist seed');
  try {
    await prisma.playlist.create(req.body);
    res.sendStatus(201);
  } catch (err) {
    console.error('err from playlist seed:', err);
    res.sendStatus(500);
  }
});

playlist.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  prisma.playlist_Video
    .findMany({
      where: {
        playlist_id: id,
      },
      include: {
        video: true,
      },
    })
    .then((videos) => {
      res.status(200).send(
        JSON.stringify(
          videos.map(({ video: { url, title, description } }) => ({
            url,
            snippet: {
              title,
              description,
            },
          })),
        ),
      );
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});
