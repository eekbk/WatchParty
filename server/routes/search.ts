import express, { Request, Response, Router } from 'express';
import { prisma } from '../db/index';

export const search: Router = express.Router();

// endpoint for search queries
search.get('/:q', async (req: Request, res: Response) => {
  // destructure the query from the req.body
  // const { q } = req.body;
  const { q } = req.params;
  const qSearch = q.replace(/&/g, ' | ');
  // console.log('qsearch:', qSearch);
  // const qSearch = q.replaceAll('&', ' | ');
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
    });
    const results = {
      videos,
      users,
      parties,
    };
    res.status(200).send(results);
  } catch (err) {
    console.log('Error from search:\n', err);
    res.sendStatus(500);
  }
});
