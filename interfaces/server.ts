import { Request } from 'express';
import { Playlist, Party, Role } from '@prisma/client';
import { Socket } from 'socket.io-client';

export interface CustomUser extends Express.User {
  id: string;
  playlists: CustomPlaylist[];
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
  user: CustomUser;
}

export interface YoutubeVideo {
  data: {
    items: {
      snippet: {
        title: string;
        description: string;
        thumbnails: {
          default: {
            url: string;
          };
          medium: {
            url: string;
          };
        };
      };
    }[];
  };
}

export interface CustomParty extends Party {
  party_videos?: any[];
  likes?: any[];
  dislikes?: any[];
  user_parties?: any[];
  videos?: any[];
  users?: any[];
}

export interface CustomPlaylist extends Playlist {
  playlist_videos?: any[];
}

export interface userConnection {
  role: Role;
  user: {
    connect: {
      id: string;
    };
  };
}

export interface ptVd {
  party: CustomParty;
}

export interface SearchParty {
  party_videos?: ptVd[];
}

export interface SearchVideo {
  party_videos: any[];
  parties?: Party[];
}

export interface CustomSocket extends Socket {
  join?: any;
  broadcast?: any;
}

export interface YoutubePlaylist {
  data: {
    nextPageToken: string;
    items: {
      snippet?: {
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
