import { Party } from '@prisma/client';

export interface Room extends Party {
  dislikes: any[];
  likes: any[];
  users: any[];
  videos: any[];
}

export interface Relation {
  id: string;
  username: string;
}
