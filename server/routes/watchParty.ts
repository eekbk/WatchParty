// File for handling WatchParty endpoints
const express = require('express');
const { default: dummyData } = require('../../dummyData.ts');

const party = express.Router();

party.get('/', (req: any, res: any) => {
  res.status(200).send(JSON.stringify(dummyData.items[0]));
});

export default party;
