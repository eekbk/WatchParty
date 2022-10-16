import express, { Request, Response, Router } from 'express';
import axios from 'axios';
import { prisma } from '../db/index';

export const playlist: Router = express.Router();

playlist.post('/seed', async (req: Request, res: Response) => {
  try {
    await prisma.playlist.create(req.body);
    res.sendStatus(201);
  } catch (err) {
    console.error('err from playlist seed:', err);
    res.sendStatus(500);
  }
});

playlist.post('/', (req: Request, res: Response) => {
  const { playlist } = req.body;
  const {
    name, description, videos, thumbnail,
  } = playlist;
  prisma.playlist
    .create({
      data: {
        name,
        description,
        thumbnail: thumbnail || '',
        playlist_videos: {
          create: videos.map((id: string) => ({ video: { connect: { id } } })),
        },
      },
    })
    .then((pl) => {
      res.status(200).send(pl.id);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(err.status);
    });
});

playlist.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  prisma.playlist_Video
    .findMany({
      where: {
        playlist_id: id,
      },
      include: {
        video: true,
      },
    })
    .then((videos) => {
      res.status(200).send(JSON.stringify(videos));
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

playlist.put('/video', (req: Request, res: Response) => {
  const { video_id, playlist_id } = req.body;
  prisma.playlist_Video
    .deleteMany({
      where: {
        playlist_id,
        video_id,
      },
    })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

playlist.post('/video', (req: Request, res: Response) => {
  // Add video to playlist
  const { video_id, playlist_id } = req.body;
  prisma.playlist_Video
    .create({
      data: {
        video_id,
        playlist_id,
      },
    })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

// Adds videos from a youtube playlist to the database
playlist.get('/youtube/:playlistId', (req: Request, res: Response) => {
  const { playlistId } = req.params;
  let formattedPlaylist; let
    tempPlaylist;
  axios
    .get(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=${process.env.YOUTUBE_KEY}`,
    )
    .then((playlist: any) => {
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
              const playlist: any = await axios.get(
                `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=${process.env.YOUTUBE_KEY}&pageToken=${nextPageToken}`,
              );
              tempPlaylist = playlist.data.items;
              formattedPlaylist = formattedPlaylist.concat(
                tempPlaylist.map((video) => ({
                  id: video.snippet.resourceId.videoId,
                  url: `https://youtu.be/${video.snippet.resourceId.videoId}`,
                  title: video.snippet.title,
                  description: video.snippet.description,
                  thumbnail: video.snippet.thumbnails.medium.url,
                })),
              );
              nextPageToken = playlist.data.nextPageToken;
            } catch (err) {
              console.error(err);
            }
          }
        })(),
      ).then(() => Promise.all(
        formattedPlaylist.map((video) =>
          prisma.video.upsert({
            where: {
              id: video.id,
            },
            update: {},
            create: video,
          })),
      ));
    })
    .then((r) => {
      if (r === undefined) {
        return undefined;
      }
      res.send(formattedPlaylist);
    })
    .catch((err) => {
      console.error('error: ', err);
      res.sendStatus(500);
    });
});
