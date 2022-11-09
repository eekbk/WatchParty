// File for handling user endpoints
import express, { Response, Router } from 'express';
import { RequestWithUser } from '../../interfaces/server';
import { prisma } from '../db/index';

const user: Router = express.Router();

// Gets relevant user data from the database and appends it to the user
user.get('/', (req: RequestWithUser, res: Response) => {
  const { user } = req;
  if (user === undefined) {
    res.status(200).send(null);
  } else {
    // Getting all the user's playlists
    prisma.playlist
      .findMany({
        where: {
          user_id: user.id,
        },
        include: {
          playlist_videos: {
            select: {
              video: true,
              index: true,
            },
          },
        },
      })
      .then((playlists: any) => {
        user.playlists = playlists.map((pl) => ({
          id: pl.id,
          name: pl.name,
          description: pl.description,
          user_id: pl.user_id,
          thumbnail: pl.thumbnail,
          videos: pl.playlist_videos.map((plv) => ({
            ...plv.video,
            index: plv.index,
          })),
        }));
        // Getting all the parties the user is affiliated with
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
      })
      .then((parties: any) => {
        parties.forEach((pt) => {
          pt.users = pt.user_parties.map((usr) => ({
            id: usr.user.id,
            username: usr.user.user_name,
            role: usr.role,
          }));
          pt.videos = pt.party_videos.map((vd) => ({
            ...vd.video,
            index: vd.index,
          }));
          pt.videos.sort((a, b) => a.index - b.index);
          delete pt.user_parties;
          delete pt.party_videos;
        });
        user.parties = parties;
        // Getting the user's roles in their parties
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
        // Getting the users followers
        return prisma.user.findMany({
          where: {
            relator: {
              some: {
                relatee_id: user.id,
              },
            },
          },
          select: {
            id: true,
            user_name: true,
          },
        });
      })
      .then((tempFollowers) => {
        // Storing the followers and following data in two places until
        // search component is improved
        user.tempFollowers = tempFollowers.map((f) => ({
          id: f.id,
          username: f.user_name,
        }));
        // TODO: Convert components that use the id string array to use the full object
        user.followers = user.tempFollowers.map((friend) => friend.id);
        // Getting the accounts the user follows
        return prisma.user.findMany({
          where: {
            relatee: {
              some: {
                relator_id: user.id,
              },
            },
          },
          select: {
            id: true,
            user_name: true,
          },
        });
      })
      .then((tempFollowing) => {
        user.tempFollowing = tempFollowing.map((f) => ({
          id: f.id,
          username: f.user_name,
        }));
        user.following = tempFollowing.map((follow) => follow.id);
        // Getting the accounts that block the user
        return prisma.relation.findMany({
          where: {
            relatee_id: user.id,
            type: 'BLOCK',
          },
          select: {
            relator_id: true,
          },
        });
      })
      .then((blockers) => {
        user.blockers = blockers.map((blocker) => blocker.relator_id);
        // Getting the accounts blocked by the user
        return prisma.relation.findMany({
          where: {
            relator_id: user.id,
            type: 'BLOCK',
          },
          select: {
            relatee_id: true,
          },
        });
      })
      .then((blocking) => {
        user.blocking = blocking.map((blocked) => blocked.relatee_id);
        res.status(200).json(user);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(err.status);
      });
  }
});

// find the follows through the join table
user.get(
  '/explicit/followers/:id',
  async (req: RequestWithUser, res: Response) => {
    const { id } = req.params;
    try {
      const num = await prisma.relation.count({
        where: {
          relatee_id: id,
          type: 'FOLLOW',
        },
      });
      res.status(200).json(num);
    } catch (err) {
      console.error('The err from getting followers:\n', err);
      res.sendStatus(err.status);
    }
  }
);

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
      res.sendStatus(200);
    } else {
      await prisma.relation.create({
        data: {
          relator_id: followerId,
          relatee_id: followedId,
          type: 'FOLLOW',
        },
      });
      res.sendStatus(201);
    }
  } catch (err) {
    console.error(err);
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
    .then(() => {
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
      res.sendStatus(200);
    } else {
      await prisma.relation.create({
        data: {
          relator_id: blockerId,
          relatee_id: blockedId,
          type: 'BLOCK',
        },
      });
      await prisma.relation.deleteMany({
        where: {
          OR: [
            {
              AND: [
                { relatee_id: blockedId },
                { relator_id: blockerId },
                { type: 'FOLLOW' },
              ],
            },
            {
              AND: [
                { relatee_id: blockerId },
                { relator_id: blockedId },
                { type: 'FOLLOW' },
              ],
            },
          ],
        },
      });
      res.sendStatus(201);
    }
  } catch (err) {
    console.error(err);
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
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error('Err from follow delete:\n', err);
      res.sendStatus(500);
    });

  // delete the relation between the follower and the followed
});

user.post('/dm', (req: RequestWithUser, res: Response) => {
  const { currentUserId, otherUserId } = req.body;
  const users = [currentUserId, otherUserId];

  prisma.party
    .findMany({
      where: {
        type: 'DM',
        user_parties: {
          some: {
            user_id: currentUserId,
          },
        },
      },
      include: {
        user_parties: {
          select: {
            user_id: true,
          },
        },
      },
    })
    .then((uParties) => {
      let bool = false;
      uParties.forEach((u) => {
        u.user_parties.forEach((id) => {
          if (id.user_id === otherUserId) {
            bool = true;
          }
        });
      });
      if (bool) {
        res.status(404).send('connection already exist');
      } else {
        const dm: any = users.map((user) => ({
          role: 'CREATOR',
          user: {
            connect: {
              id: user,
            },
          },
        }));
        // creates the dm joining two users
        prisma.party
          .create({
            data: {
              type: 'DM',
              user_parties: {
                create: dm,
              },
            },
          })
          .then(() => res.status(201).send('created connection'))
          .catch((err) => console.error(err));
      }
    })
    .catch((err) => console.error(err));
});

export default user;
