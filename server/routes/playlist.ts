import express, { Request, Response, Router } from 'express';
import { prisma } from '../db/index';

export const playlist: Router = express.Router();

playlist.post('/seed', async (req: Request, res: Response) => {
  console.log('inside the playlist seed');
  try {
    await prisma.playlist.create(req.body);
    res.sendStatus(201);
  } catch (err) {
    console.log('err from playlist seed:', err);
    res.sendStatus(500);
  }
});
