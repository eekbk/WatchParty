// File for creating the server
import * as path from 'path';

const express = require('express');
const { default: user } = require('./routes/user.ts');
const { default: party } = require('./routes/watchParty.ts');

const PORT = process.env.PORT || 4040;
const app = express();

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

app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});
