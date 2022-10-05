// File for creating the server
import express, { Express, Request, Response } from 'express';
import * as path from 'path';

import * as dotenv from 'dotenv';
import { prisma } from './db/index';

const app: Express = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);

const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { default: party } = require('./routes/watchParty.ts');
const { default: user } = require('./routes/user.ts');

dotenv.config();
const PORT = process.env.PORT || 4040;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve('client', 'dist')));
app.use(express.json());

// routes
/*
AT CAITY'S SUGGESTION: add 'api' before before the route endpoint of
any backend routes to avoid front end navigation "crossing streams"
with backend
*/
app.use('api/user', user);
app.use('api/party', party);

// passport.use(new GoogleStrategy({
//   clientID: GOOGLE_CLIENT_ID,
//   clientSecret: GOOGLE_CLIENT_SECRET,
//   callbackURL: `https://localhost:${PORT}/auth/google/callback`
// },
// async function(accessToken, refreshToken, profile, cb) {
//   try {
//     let user = await prisma.user.findUnique({
//       where: {
//         email: profile.email,
//       }
//     })
//     if (!user) {
//       let user = await prisma.user.create({
//         data: profile,
//       })
//     }
//   } catch (error) {
//   }
//   }, function(err, user) {
//     return cb(err, user);
//   });

// ));

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `https://localhost:${PORT}/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await prisma.user.findUnique({
          where: {
            email: profile.email,
          },
        });
        if (!user) {
          await prisma.user.create({
            data: {
              user_name: profile.name,
              email: profile.email,
            },
          });
        }
      } catch (error) {}
      done(null, profile);
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (user, done) => {
  done(null, user);
});

app.use(
  session({
    secret: process.env.GOOGLE_CLIENT_SECRET,
    saveUninitialized: false,
    resave: true,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile'] }, (req, res) => {
    console.log('not empty');
  }),
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  },
);

app.get('/', (req, res) => {
  res.status(200).send();
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
  socket.on('pause', (arg: boolean) => {
    io.emit('pause', arg);
  });
  socket.on('play', (arg: boolean) => {
    io.emit('play', arg);
  });
});

http.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});
