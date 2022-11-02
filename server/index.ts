// File for creating the server
import express, { Express, Request, Response } from 'express';
import * as path from 'path';
import * as dotenv from 'dotenv';
import session from 'express-session';
import { prisma } from './db/index';
import { party } from './routes/party';
import { playlist } from './routes/playlist';
import { search } from './routes/search';
import { video } from './routes/video';

const app: Express = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);

const passport = require('passport');
// const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { default: user } = require('./routes/user.ts');

dotenv.config();
const PORT = process.env.DATABASE_PORT || 4040;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve('client', 'dist')));
app.use(express.json());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await prisma.user.findUnique({
        where: {
          googleId: profile.id,
        },
      });
      // if the user doesn't exist, create it
      if (!user) {
        const newUser = await prisma.user.create({
          data: {
            user_name: profile.name.givenName + profile.name.familyName[0],
            googleId: profile.id,
            profile: profile.photos[0].value,
          },
        });
        if (newUser) {
          done(null, newUser);
        }
      } else {
        done(null, user);
      }
    }
  )
);

app.use(
  session({
    secret: process.env.GOOGLE_CLIENT_SECRET,
    saveUninitialized: false,
    resave: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  done(null, user);
});

// Routes
app.use('/api/user', user);
app.use('/api/party', party);
app.use('/api/playlist', playlist);
app.use('/api/search', search);
app.use('/api/video', video);

app.get(
  '/auth/google',
  passport.authenticate(
    'google',
    { scope: ['profile'] },
    (req: Request, res: Response) => {
      // console.log('not empty now');
    }
  )
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req: Request, res: Response) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);

app.get('/', (req, res) => {
  res.status(200).send();
});

app.post('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res.status(400).send('Unable to log out');
      } else {
        res.redirect('/');
      }
    });
  } else {
    res.end();
  }
});

// endpoint for seeding database
app.post('/api/seed', async (req: Request, res: Response) => {
  const { table, dataObj } = req.body;
  try {
    const createdData = await prisma[table].createMany(dataObj);
    res.status(201).send(createdData);
  } catch (err) {
    console.error('Error from /seed', err);
    res.sendStatus(500);
  }
});

// Socket.io events and listeners
io.on('connection', (socket: any) => {
  // Joining a watch party
  socket.on('join', (place: { room: string; type: string }) => {
    if (place.type === 'DM') {
      socket.join(place.room);
    } else {
      socket.join(place.room);
      io.to(place.room).emit('roomCheck');
    }
  });
  // pauses all WatchParties by roomId
  socket.on('pause', (pause: { room: string; bool: boolean }) => {
    socket.broadcast.to(pause.room).emit('pause', pause.bool);
  });
  // play all WatchParties by roomId
  socket.on('play', (play: { room: string; bool: boolean }) => {
    io.to(play.room).emit('play', play.bool);
  });
  // tells watchParty room what time to seek to
  socket.on('seek', (seconds: { room: string; amount: number }) => {
    socket.broadcast.to(seconds.room).emit('seek', seconds.amount);
  });
  socket.on(
    'giveRoom',
    (video: {
      room: string;
      video: number;
      start: number;
      playing: boolean;
    }) => {
      socket.broadcast.to(video.room).emit('giveRoom', video);
    }
  );

  // Chat

  // sends a message to a watchParty chat
  // create new message in db as well
  socket.on(
    'chat',
    (chat: { room: string; message: string; user: string; type: any }) => {
      prisma.message
        .create({
          data: {
            message: chat.message,
            room_timestamp: '420',
            user_id: chat.user,
            party_id: chat.room,
            type: chat.type,
          },
          include: {
            user: true,
          },
        })
        .then((message) => io.to(chat.room).emit('chat', message))
        .catch((err) => {
          console.error(err);
        });
    }
  );

  // Sends back all of the messages in the db by a roomId
  // this includes dm rooms!
  socket.on('getMessages', (room) => {
    if (room) {
      prisma.message
        .findMany({
          where: {
            party_id: room,
          },
          select: {
            user: true,
            message: true,
          },
        })
        .then((messages) => {
          io.to(room).emit('getMessages', messages);
        })
        .catch((err) => console.error(err));
    }
  });

  // Get's user by user id to get their name
  socket.on('GetUser', (q: { room: string; userId: string }) => {
    prisma.user
      .findUnique({
        where: {
          id: q.userId,
        },
      })
      .then((user) => {
        io.to(q.room).emit('GetUser', user.user_name);
      })
      .catch((err) => console.error(err));
  });

  // Direct Messages

  // Sends out chat to dm-d user
  socket.on(
    'DmChat',
    (chat: { dmId: string; message: string; user: any; type: any }) => {
      prisma.message
        .create({
          data: {
            message: chat.message,
            room_timestamp: '420',
            user_id: chat.user.id,
            party_id: chat.dmId,
            type: chat.type,
          },
        })
        .then(() =>
          socket.broadcast.to(chat.dmId).emit('DmChat', {
            message: chat.message,
            user: {
              user_name: chat.user.user_name,
              id: chat.user.id,
            },
          })
        )
        .catch((err) => {
          console.error(err);
        });
    }
  );
  // gives all user parties with type "DM"
  socket.on('getDms', (user) => {
    if (user) {
      prisma.user_Party
        .findMany({
          where: {
            user_id: user.id,
            party: {
              type: 'DM',
            },
          },
        })
        .then((parties) => {
          Promise.all(
            parties.map((party) =>
              prisma.user.findFirst({
                where: {
                  user_parties: {
                    some: {
                      party_id: party.party_id,
                      NOT: [
                        {
                          user_id: user.id,
                        },
                      ],
                    },
                  },
                },
              })
            )
          ).then((userInfo) => socket.emit('getDms', { userInfo, parties }));
        });
    }
  });
});

app.get('/*', (req: Request, res: Response) => {
  res.sendFile(
    path.resolve(__dirname, '..', 'client', 'dist', 'index.html'),
    (_data: object, err: string) => {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

http.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});
