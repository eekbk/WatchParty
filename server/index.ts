// File for creating the server
import express, { Express, Request, Response } from 'express';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { prisma } from './db/index';
import { party } from './routes/watchParty';

const app: Express = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);

const passport = require('passport');
const axios = require('axios');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
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

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `http://localhost:${PORT}/auth/google/callback`,
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
            user_name: profile.name.givenName,
            googleId: profile.id,
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
  passport.authenticate('google', { failureRedirect: '/' }),
  (req: Request, res: Response) => {
    // Successful authentication, redirect home.
    res.redirect('/dashboard');
  },
);

app.get('/', (req, res) => {
  res.status(200).send();
});

// const isLoggedIn = (req, res, next) => {
//   if (req.user) {
//     next();
//   } else {
//       res.status(401).send('Not Logged In');
//     }
//   }

//   const isLoggedIn = require('./Middleware/auth')
//   app.get('/', isLoggedIn,(req, res) => res.send(`Welcome ${req.user.displayName}!`))
//   app.get('/logout', (req, res) => {
//     req.session = null;
//     req.logout();
//     res.redirect('/');
//   })

// app.post('/logout', (req, res) => {
//   if (req.session) {
//     req.session.destroy((err) => {
//       if (err) {
//         res.status(400).send('Unable to log out');
//       } else {
//         res.status(200).send('logged out worked');
//       }
//     });
//   } else {
//     res.end();
//   }
// });

app.post('/video', (req: Request, res: Response) => {
  const { videoId, videoUrl } = req.body;
  prisma.video
    .findFirst({
      where: {
        id: videoId,
      },
    })
    .then((results) => {
      if (results) {
        res.status(200).send(results);
      } else {
        return Promise.resolve(
          axios.get(
            `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${process.env.YOUTUBE_KEY}`,
          ),
        );
      }
    })
    .then((video: any) => {
      console.log('video: ', video);
      video = video.data;
      const formattedVideo: any = {
        id: videoId,
        url: videoUrl,
        title: video.items[0].snippet.title,
        description: video.items[0].snippet.description,
        thumbnail: video.items[0].snippet.thumbnails.default.url,
      };
      prisma.video.upsert({
        where: {
          id: videoId,
        },
        update: {},
        create: formattedVideo,
      });
      res.send(formattedVideo);
    })
    .catch((err) => {
      console.error('error: ', err);
      res.sendStatus(err.response.status);
    });
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
  socket.on('seek', (seconds: number) => {
    io.emit('seek', seconds);
  });
});

http.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});
