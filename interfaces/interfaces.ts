import { Request } from 'express';
import { Playlist } from '@prisma/client';

export interface User extends Express.User {
	id: string;
	playlists: Playlist[];
	parties: any[];
	friends: any[];
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
// User interface from Express.User
// Options interface for typeahead for selecting users for party and admin privileges
// socket interface
// model interfaces
// youtube return interface
