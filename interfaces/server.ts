import { Request } from 'express';
import { Playlist } from '@prisma/client';

export interface User extends Express.User {
  id: string;
  playlists: Playlist[];
  parties: any[];
  friends: any[];
  followers: any[];
  tempFollowers: any[];
  following: any[];
  tempFollowing: any[];
  blockers: any[];
  blocking: any[];
  enemies: any[];
}

export interface RequestWithUser extends Request {
  user: User;
}

export interface YoutubeVideo {
  data: {
    items: {
      snippet: {
        title: string;
        description: string;
        thumbnails: {
          medium: {
            url: string;
          };
        };
      };
    }[];
  };
}
