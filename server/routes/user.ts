// File for handling user endpoints
import express, { Response, Router } from 'express';
import { RequestWithUser } from '../../interfaces/interfaces';
import { prisma } from '../db/index';

const user: Router = express.Router();

user.get('/', (req: RequestWithUser, res: Response) => {
  const { user } = req;
  if (user === undefined) {
    res.sendStatus(400);
  } else {
    prisma.playlist
      .findMany({
        where: {
          user_id: user.id,
        },
        include: {
          playlist_videos: {
            select: {
              video: true,
            },
          },
        },
      })
      .then((playlists: any) => {
        console.log('checking playlists:', playlists[0].playlist_videos);
        user.playlists = playlists;
        return prisma.party.findMany({
          where: {
            user_parties: {
              some: {
                user: {
                  id: user.id,
                },
              },
            },
          },
          include: {
            videos: true,
          },
        });
      })
      .then((parties: any) => {
        user.parties = parties;
        return prisma.user_Party.findMany({
          where: {
            user_id: user.id,
          },
        });
      })
      .then((UP) => {
        user.parties = user.parties.map((p) => {
          p.role = UP.filter((up) => up.party_id === p.id)[0].role;
          return p;
        });
        return prisma.user.findMany({
          where: {
            relatee: {
              some: {
                type: 'FOLLOW',
                relator: {
                  id: user.id,
                },
              },
            },
          },
        });
      })
      .then((friends) => {
        user.friends = friends.map((f) => ({
          id: f.id,
          username: f.user_name,
        }));
        user.followers = user.friends.map((friend) => friend.id);
        return prisma.relation.findMany({
          where: {
            relator_id: user.id,
            type: 'FOLLOW',
          },
          select: {
            relatee_id: true,
          },
        });
      })
      .then((following: any) => {
        user.following = following.map((follow) => follow.relatee_id);
        return prisma.user.findMany({
          where: {
            relatee: {
              some: {
                type: 'BLOCK',
                relator: {
                  id: user.id,
                },
              },
            },
          },
        });
      })
      .then((blockers) => {
        user.blockers = blockers.map((blocker) => ({
          id: blocker.id,
          username: blocker.user_name,
        }));
        return prisma.user.findMany({
          where: {
            relator: {
              some: {
                type: 'BLOCK',
                relatee: {
                  id: user.id,
                },
              },
            },
          },
        });
      })
      .then((blocking) => {
        user.blocking = blocking.map((blocked) => ({
          id: blocked.id,
          username: blocked.user_name,
        }));
        res.status(200).json(user);
      })
      .catch((err) => {
        console.log('AN ERROR WHATS IT MEAN?!?!:\n', err);
        res.sendStatus(err.status);
      });
  }
});

user.post('/playlist', (req: RequestWithUser, res: Response) => {
  const { playlist } = req.body;
  const { videos } = playlist;
  delete playlist.videos;
  prisma.playlist
    .create({
      data: {
        ...playlist,
        playlist_videos: {
          create: videos.map((id: string) => ({ video: { connect: { id } } })),
        },
      },
    })
    .then((pl) => {
      res.status(200).send(pl.id);
    })
    .catch((err) => {
      console.error('ERROR ERROR ERROR', err);
      res.sendStatus(500);
    });
});
// create a relation between current user and followed for a follow click
user.post('/follow', async (req: RequestWithUser, res: Response) => {
  // deconstruct req body
  const { followerId, followedId } = req.body;
  // create a new relation between the follower and the followed
  try {
    const existingFollow = await prisma.relation.findFirst({
      where: {
        AND: [
          { relator_id: followerId },
          { relatee_id: followedId },
          { type: 'FOLLOW' },
        ],
      },
    });
    if (existingFollow) {
      console.log('Hey you already following, foo!');
      res.sendStatus(200);
    } else {
      await prisma.relation.create({
        data: {
          relator_id: followerId,
          relatee_id: followedId,
          type: 'FOLLOW',
        },
      });
      await prisma.user.update({
        where: {
          id: followedId,
        },
        data: {
          follows: {
            increment: 1,
          },
        },
      });
      res.sendStatus(201);
    }
  } catch (err) {
    console.log('This is error please fix now:\n', err);
    res.sendStatus(500);
  }
});

// delete a relation between current user and followed
user.delete('/follow', (req: RequestWithUser, res: Response) => {
  // deconstruct req body
  const { followerId, followedId } = req.body;

  prisma.relation
    .deleteMany({
      where: {
        AND: [
          { relator_id: followerId },
          { relatee_id: followedId },
          { type: 'FOLLOW' },
        ],
      },
    })
    .then(() =>
      prisma.user.update({
        where: {
          id: followedId,
        },
        data: {
          follows: {
            decrement: 1,
          },
        },
      }))
    .then(() => {
      // console.log('heres the data after the update:\n', data);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error('Err from follow delete:\n', err);
      res.sendStatus(500);
    });

  // delete the relation between the follower and the followed
});

// create a relation between current user and followed for a follow click
user.post('/block', async (req: RequestWithUser, res: Response) => {
  // deconstruct req body
  const { blockerId, blockedId } = req.body;
  // create a new relation between the follower and the followed
  try {
    const existingBlock = await prisma.relation.findFirst({
      where: {
        AND: [
          { relator_id: blockerId },
          { relatee_id: blockedId },
          { type: 'BLOCK' },
        ],
      },
    });
    if (existingBlock) {
      console.log('Hey you already blocking, foo!');
      res.sendStatus(200);
    } else {
      await prisma.relation.create({
        data: {
          relator_id: blockerId,
          relatee_id: blockedId,
          type: 'BLOCK',
        },
      });
      res.sendStatus(201);
    }
  } catch (err) {
    console.log('This is error please fix now:\n', err);
    res.sendStatus(500);
  }
});

// delete a BLOCK between current user and BLOCKed
user.delete('/block', (req: RequestWithUser, res: Response) => {
  // deconstruct req body
  const { blockerId, blockedId } = req.body;

  prisma.relation
    .deleteMany({
      where: {
        AND: [
          { relator_id: blockerId },
          { relatee_id: blockedId },
          { type: 'BLOCK' },
        ],
      },
    })
    .then(() => {
      // console.log('heres the data after the update:\n', data);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error('Err from follow delete:\n', err);
      res.sendStatus(500);
    });

  // delete the relation between the follower and the followed
});

user.post('/');

export default user;
