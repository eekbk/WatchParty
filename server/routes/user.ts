// File for handling user endpoints
const express = require('express');
const { default: prisma } = require('../db/index.ts');

const user = express.Router();

user.get('/', (req, res) => {
  res.status(200).send(JSON.stringify('WOOP'));
});

export default user;
