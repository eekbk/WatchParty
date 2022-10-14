import express, { Request, Response, Router } from 'express';
import { prisma } from '../db/index';

export const playlist: Router = express.Router();

playlist.post('/seed', async (req: Request, res: Response) => {
  try {
    await prisma.playlist.create(req.body);
    res.sendStatus(201);
  } catch (err) {
    console.error('err from playlist seed:', err);
    res.sendStatus(500);
  }
});

playlist.post('/', (req: Request, res: Response) => {
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
      res.status(200).send(JSON.stringify(videos));
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

playlist.put('/video', (req: Request, res: Response) => {
  const { video_id, playlist_id } = req.body;
  prisma.playlist_Video
    .deleteMany({
      where: {
        playlist_id,
        video_id,
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

playlist.post('/video', (req: Request, res: Response) => {
  // Add video to playlist
  const { video_id, playlist_id } = req.body;
  prisma.playlist_Video
    .create({
      data: {
        video_id,
        playlist_id,
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
