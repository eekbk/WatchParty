// File for creating the server
import express, { Express, Request, Response } from 'express';
import * as path from 'path';

const app: Express = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);

const { default: user } = require('./routes/user.ts');
const { default: party } = require('./routes/watchParty.ts');

const PORT = process.env.PORT || 4040;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve('client', 'dist')));
app.use(express.json());

// routes
app.use('/user', user);
app.use('/party', party);

app.get('/', (req: Request, res: Response) => {
  res.status(200).send();
});

app.get('/*', (req: any, res: any) => {
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
