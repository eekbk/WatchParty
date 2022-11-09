import express, { Request, Response, Router } from 'express';
import axios from 'axios';
import { prisma } from '../db/index';
import { YoutubePlaylist } from '../../interfaces/server';

export const playlist: Router = express.Router();

// Creates a playlist of videos associated with a specific user
playlist.post('/', (req: Request, res: Response) => {
  const { playlist } = req.body;
  const { videos } = playlist;
  delete playlist.videos;
  prisma.playlist
    .create({
      data: {
        ...playlist,
        playlist_videos: {
          create: videos,
        },
      },
    })
    .then((pl) => {
      res.status(200).send(pl.id);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

// TODO: Minimize API calls, current idea is to store a youtube playlist relation on videos imported from a playlist
// Adds videos from a youtube playlist to the database
playlist.get('/youtube/:playlistId', (req: Request, res: Response) => {
  const { playlistId } = req.params;
  let formattedPlaylist;
  let tempPlaylist;
  axios
    .get(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=${process.env.YOUTUBE_KEY}`
    )
    .then((playlist: YoutubePlaylist) => {
      if (playlist === undefined) {
        return undefined;
      }
      tempPlaylist = playlist.data.items;
      formattedPlaylist = tempPlaylist.map((video) => ({
        id: video.snippet.resourceId.videoId,
        url: `https://youtu.be/${video.snippet.resourceId.videoId}`,
        title: video.snippet.title,
        description: video.snippet.description,
        thumbnail: video.snippet.thumbnails.medium.url,
      }));
      let { nextPageToken } = playlist.data;
      // Getting the rest of the pages of results
      return Promise.resolve(
        (async () => {
          while (nextPageToken) {
            try {
              const playlist: YoutubePlaylist = await axios.get(
                `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=${process.env.YOUTUBE_KEY}&pageToken=${nextPageToken}`
              );
              tempPlaylist = playlist.data.items.filter(
                (i) => i.snippet.title !== 'Private video'
              );
              formattedPlaylist = formattedPlaylist.concat(
                tempPlaylist.map((video) => ({
                  id: video.snippet.resourceId.videoId,
                  url: `https://youtu.be/${video.snippet.resourceId.videoId}`,
                  title: video.snippet.title,
                  description: video.snippet.description,
                  thumbnail: video.snippet.thumbnails.medium
                    ? video.snippet.thumbnails.medium.url
                    : video.snippet.thumbnails.default.url,
                }))
              );
              nextPageToken = playlist.data.nextPageToken;
            } catch (err) {
              console.error(err);
            }
          }
          return formattedPlaylist;
        })()
      );
    })
    .then((r) => {
      if (r === undefined) {
        return undefined;
      }
      return Promise.all(
        formattedPlaylist.map((video) =>
          prisma.video.upsert({
            where: {
              id: video.id,
            },
            update: {},
            create: video,
          })
        )
      );
    })
    .then((r) => {
      if (r === undefined && formattedPlaylist === undefined) {
        res.sendStatus(400);
      }
      res.send(formattedPlaylist);
    })
    .catch((err) => {
      console.error('error: ', err);
      res.sendStatus(500);
    });
});
