// File for handling user endpoints
const express = require('express');

const user = express.Router();

user.get('/', (req: any, res: any) => {
  res.status(200).send(JSON.stringify('WOOP'));
});

export default user;
