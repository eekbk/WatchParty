// File for handling user endpoints
// const express = require('express');
const user = express.Router();

user.get('/', (req, res) => {
  res.status(200).send(JSON.stringify('WOOP'));
});

module.exports = { user };
