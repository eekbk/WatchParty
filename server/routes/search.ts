import express, { Request, Response, Router } from 'express';
import { prisma } from '../db/index';

export const search: Router = express.Router();

// endpoint for search queries
search.get('/:q', async (req: Request, res: Response) => {
  // destructure the query from the req.body
  const { q } = req.params;
  const qSearch = q.replace(/&/g, ' | ');
  // query the database for videos with description or title matching q
  try {
    const videos = await prisma.video.findMany({
      where: {
        OR: [
          {
            title: {
              search: qSearch,
              mode: 'insensitive',
            },
          },
          {
            description: {
              search: qSearch,
              mode: 'insensitive',
            },
          },
        ],
      },
    });
    // query the db for users matching q
    const users = await prisma.user.findMany({
      where: {
        user_name: {
          search: qSearch,
          mode: 'insensitive',
        },
      },
    });
    // query the db for parties with descrip or name matching q
    const parties = await prisma.party.findMany({
      where: {
        OR: [
          {
            name: {
              search: qSearch,
              mode: 'insensitive',
            },
          },
          {
            description: {
              search: qSearch,
              mode: 'insensitive',
            },
          },
        ],
      },
      include: {
        videos: true,
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
    parties.forEach((pt: any) => {
      pt.users = pt.user_parties.map((usr) => ({
        id: usr.user.id,
        username: usr.user.user_name,
        role: usr.role,
      }));
      delete pt.user_parties;
    });
    const results = {
      videos,
      users,
      parties,
    };
    res.status(200).send(results);
  } catch (err) {
    console.error('Error from search:\n', err);
    res.sendStatus(500);
  }
});

search.get('/party/:videoId', async (req: Request, res: Response) => {
  const { videoId } = req.params;
  try {
    // find all the parties with a playlist that contains the video
    const parties = await prisma.video.findUnique({
      where: {
        id: videoId,
      },
      include: {
        parties: true,
      },
    });
    res.status(200).send(parties);
  } catch (err) {
    console.error('The error from :videoId endpoint:\n', err);
    res.sendStatus(500);
  }
});
