import express, { Request, Response, Router } from 'express';
import { prisma } from '../db/index';

export const video: Router = express.Router();

video.get('/playlists/:videoId', (req: Request, res: Response) => {
  const { videoId } = req.params;
  prisma.playlist_Video
    .findMany({
      where: {
        video_id: videoId,
      },
      include: {
        playlist: {
          include: {
            parties: true,
          },
        },
      },
    })
    .then((parties) => {
      // console.log('the parties:\n', parties);
      res.status(200).send(parties);
    })
    .catch((err) => {
      console.log('err', err);
      res.sendStatus(500);
    });
});
