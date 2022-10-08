// File for handling WatchParty endpoints
import express, { Request, Response, Router } from 'express';
import { Party } from '@prisma/client';
import axios from 'axios';
import { prisma } from '../db/index';

const { default: dummyData } = require('../../dummyData.ts');

export const party: Router = express.Router();

// Get video dummy data
party.get('/test', (req: Request, res: Response) => {
  res.status(200).send(JSON.stringify(dummyData[0]));
});

// Get all watch parties
party.get('/', (req: Request, res: Response) => {
  // Retrieve all watch parties from the database
  prisma.party
    .findMany()
    .then((parties) => {
      res.status(200).send(JSON.stringify(parties));
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(err.status);
    });
});

// Create a watch party
// New rules: Either create from a playlist only or by adding videos individually.
party.post('/', (req: Request, res: Response) => {
  // Get the party values out of the request body
  const { party, playlist }: { party: Party; playlist: any } = req.body;
  // Create the new party in the database
  prisma.party
    .create({
      data: {
        name: party.name,
        description: party.description,
      },
    })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(err.status);
    });
});

// Update a watch party
party.put('/:partyId', (req: Request, res: Response) => {
  // Get the party id out of the request params
  const { partyId } = req.params;
  // Get the updated values out of the request body
  const { party }: { party: Party } = req.body;
  // Update the party with the updated values with the matching id in the database
  prisma.party
    .update({
      where: {
        id: partyId,
      },
      data: party,
    })
    .then(() => {
      res.sendStatus(300);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(err.status);
    });
});

party.post('/video', (req: Request, res: Response) => {
  console.log('arrived');
  const { videoId, videoUrl } = req.body;
  prisma.video
    .findFirst({
      where: {
        id: videoId,
      },
    })
    .then((results) => {
      if (results) {
        res.status(200).send(results);
      } else {
        return Promise.resolve(
          axios.get(
            `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${process.env.YOUTUBE_KEY}`,
          ),
        );
      }
    })
    .then((video: any) => {
      console.log('video: ', video);
      video = video.data;
      const formattedVideo: any = {
        id: videoId,
        url: videoUrl,
        title: video.items[0].snippet.title,
        description: video.items[0].snippet.description,
        thumbnail: video.items[0].snippet.thumbnails.default.url,
      };
      prisma.video.upsert({
        where: {
          id: videoId,
        },
        update: {},
        create: formattedVideo,
      });
      res.send(formattedVideo);
    })
    .catch((err) => {
      console.error('error: ', err);
      res.sendStatus(err.response.status);
    });
});
