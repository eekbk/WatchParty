import express, { Request, Response, Router } from 'express';
import { CustomParty } from '../../interfaces/server';
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
      orderBy: {
        start_date: 'asc',
      },
      include: {
        party_videos: {
          select: {
            video: true,
            index: true,
          },
        },
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
    parties.forEach((party: CustomParty) => {
      party.users = party.user_parties.map((uP) => ({
        id: uP.user.id,
        username: uP.user.user_name,
        role: uP.role,
      }));
      party.videos = party.party_videos.map((vid) => ({
        ...vid.video,
        index: vid.index,
      }));
      party.videos.sort((a, b) => a.index - b.index);
      delete party.user_parties;
      delete party.party_videos;
    });
    res.status(200).send(parties);
  } catch (err) {
    res.sendStatus(500);
  }
});
