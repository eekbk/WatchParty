// File for handling user endpoints
import express, { Request, Response, Router } from 'express';
import prisma from '../db/index';

const user: Router = express.Router();

user.get('/', (req: Request, res: Response) => {
  //
  res.status(200).send(JSON.stringify('WOOP'));
});

export default user;
