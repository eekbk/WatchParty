// File for creating the server
import * as path from 'path';

const express = require('express');

const app = express();
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

app.get('/', (req: any, res: any) => {
  res.status(200).send();
});

app.get('/*', (req: any, res: any) => {
  res.sendFile(
    path.resolve(__dirname, '..', 'client', 'dist', 'index.html'),
    (data: any, err: any) => {
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
});

http.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});
