// File for creating the server
const express = require('express');
const { default: user } = require('./routes/user.ts');

const PORT = process.env.PORT || 4040;
const app = express();

app.use('/user', user);

app.get('/', (req, res) => {
  res.status(200).send('WOOP');
});

app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});
