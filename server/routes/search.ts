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
      include: {
        party_videos: {
          select: {
            party: true,
          },
        },
      },
    });
    videos.map((vd: any) => {
      vd.parties = vd.party_videos.map((pt) => ({
        ...pt.party,
      }));
      delete vd.party_videos;
      return vd;
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
    const usersIds = users.map((u) => u.id);
    const now = new Date(Date.now());
    const nowAdj = new Date(
      now.setTime(now.getTime() - now.getTimezoneOffset() * 60 * 1000)
    );
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
          {
            user_parties: {
              some: {
                AND: [
                  {
                    user_id: {
                      in: usersIds,
                    },
                  },
                  {
                    role: 'CREATOR',
                  },
                ],
              },
            },
          },
        ],
        AND: [
          {
            start_date: {
              gte: nowAdj.toISOString(),
            },
            type: 'PARTY',
          },
        ],
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
    parties.forEach((pt: any) => {
      pt.users = pt.user_parties.map((usr) => ({
        id: usr.user.id,
        username: usr.user.user_name,
        role: usr.role,
      }));
      pt.videos = pt.party_videos.map((vid) => ({
        ...vid.video,
        index: vid.index,
      }));
      pt.videos.sort((a, b) => a.index - b.index);
      delete pt.user_parties;
      delete pt.party_videos;
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
    let parties: any = await prisma.video.findUnique({
      where: {
        id: videoId,
      },
      include: {
        party_videos: {
          select: {
            party: true,
          },
        },
      },
    });
    parties = parties.party_videos.map((vd: any) => vd.party);
    delete parties.party_videos;
    res.status(200).send(parties);
  } catch (err) {
    console.error('The error from :videoId endpoint:\n', err);
    res.sendStatus(500);
  }
});
