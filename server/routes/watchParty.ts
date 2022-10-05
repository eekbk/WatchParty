// File for handling WatchParty endpoints
import express, { Request, Response, Router } from 'express';

const { default: dummyData } = require('../../dummyData.ts');

const party: Router = express.Router();

// All Watch Parties that exist
party.get('/all', (req: Request, res: Response) => {
  res.status(200).send(JSON.stringify(dummyData.items[0]));
});

export default party;
