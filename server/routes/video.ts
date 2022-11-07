import express, { Request, Response, Router } from 'express';
import { prisma } from '../db/index';

export const video: Router = express.Router();

// get all parties a video is attached to
video.get('/parties/:videoId', async (req: Request, res: Response) => {
  const { videoId } = req.params;
  try {
    const parties = await prisma.party.findMany({
      where: {
        party_videos: {
          some: {
            video_id: videoId,
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
    });
    parties.forEach((party: any) => {
      party.users = party.user_parties.map((uP) => ({
        id: uP.user.id,
        username: uP.user.user_name,
        role: uP.role,
      }));
      delete party.user_parties;
    });
    res.status(200).send(parties);
  } catch (err) {
    res.sendStatus(500);
  }
});
