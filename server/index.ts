// File for creating the server
import express, { Express, Request, Response } from 'express';
import * as path from 'path';
import * as dotenv from 'dotenv';
import session from 'express-session';
import { prisma } from './db/index';
import { party } from './routes/watchParty';

const app: Express = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);

const passport = require('passport');
// const axios = require('axios');
// const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { default: user } = require('./routes/user.ts');

dotenv.config();
const PORT = process.env.PORT || 4040;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve('client', 'dist')));
app.use(express.json());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `http://localhost:${PORT}/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile, 'profile......');
      const user = await prisma.user.findUnique({
        where: {
          googleId: profile.id,
        },
      });
      // if the user doesn't exist, create it
      if (!user) {
        const newUser = await prisma.user.create({
          data: {
            user_name: profile.name.givenName,
            googleId: profile.id,
            profile: profile.photos.value,
          },
        });
        if (newUser) {
          done(null, newUser);
        }
      } else {
        done(null, user);
      }
    },
  ),
);

app.use(
  session({
    secret: process.env.GOOGLE_CLIENT_SECRET,
    saveUninitialized: false,
    resave: true,
  }),
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
app.use('/api/user', user);
app.use('/api/party', party);

app.get('/test', (req: any, res: Response) => {
  res.json(req.user);
});

app.get(
  '/auth/google',
  passport.authenticate(
    'google',
    { scope: ['profile'] },
    (req: Request, res: Response) => {
      console.log('not empty now');
    },
  ),
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/home' }),
  (req: Request, res: Response) => {
    // Successful authentication, redirect home.
    res.redirect('/dashboard');
  },
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
        console.log(req.session, 'logout server........');
        res.redirect('/home');
        res.status(200).send('logged out worked');
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
    console.log('Error from /seed', err);
    res.sendStatus(500);
  }
});

app.get('/*', (req: Request, res: Response) => {
  res.sendFile(
    path.resolve(__dirname, '..', 'client', 'dist', 'index.html'),
    (_data: object, err: string) => {
      if (err) {
        res.status(500).send(err);
      }
    },
  );
});

// socket.io testing
io.on('connection', (socket: any) => {
  socket.on('join', (room: string) => {
    socket.join(room);
    io.to(room).emit('roomCheck');
  });
  socket.on('pause', (pause: { room: string; bool: boolean }) => {
    socket.broadcast.to(pause.room).emit('pause', pause.bool);
  });
  socket.on('play', (play: { room: string; bool: boolean }) => {
    io.to(play.room).emit('play', play.bool);
  });
  socket.on('seek', (seconds: { room: string; amount: number }) => {
    socket.broadcast.to(seconds.room).emit('seek', seconds.amount);
  });
  socket.on(
    'giveRoom',
    (video: { room: string; video: number; start: number }) => {
      socket.broadcast.to(video.room).emit('giveRoom', video);
    },
  );
});

http.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});
