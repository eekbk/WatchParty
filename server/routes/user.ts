// File for handling user endpoints
import express, { Response, Router } from 'express';
import { RequestWithUser } from '../../interfaces';
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
      })
      .then((playlists) => {
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
        res.status(200).json(user);
      })
      .catch((err) => {
        console.error(err);
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
      console.error(err);
      res.sendStatus(500);
    });
});

// // endpoint for adding or removing a follow
// user.put('/follows', (req: Request, res: Response) => {
//   // deconstruct the req.body
//   const { followedId, followingId, isFollowing } = req.body;
//   // find the user with id of the following user
//   if (!isFollowing) {
//     prisma.user.update({
//       where: {
//         id: followingId,
//       },
//     })

//   }
//     // connect the followed Id to the followingId
//     // increment the follows of the followed id up or down
//     //
// });

export default user;
