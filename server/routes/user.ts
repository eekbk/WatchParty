// File for handling user endpoints
import express = require('express');
const user = express.Router();

user.get('/', (req, res) => {
  res.status(200).send('WOOP');
});

export default user;
