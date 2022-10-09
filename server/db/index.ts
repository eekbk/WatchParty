// File for connecting the database
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

const main = async () => {
  // funcs interacting with the database
  // add playlist
  await prisma.playlist.createMany({
    data: [
      {
        name: 'Cat Videos',
        description: 'A bunch of cats',
        thumbnail: 'https://i.ytimg.com/vi/CtpdMkKvB6U/mqdefault.jpg',
      },
      {
        name: 'Anime',
        description: 'A bunch of Anime',
        thumbnail: 'https://i.ytimg.com/vi/5paBeSE3fRY/mqdefault.jpg',
      },
      {
        name: 'Sports Highlights',
        description: 'A bunch of highlights',
        thumbnail: 'https://i.ytimg.com/vi/oIgCd-4oDzI/default.jpg',
      },
    ],
  });
  // add user
  // add video
};

main()
  .catch((err) => {
    console.error(err.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

/* Test for creating a playlist in the database
const playlist : any = {
  id: 'hello',
  name: 'hello',
  description: 'hello',
  thumbnail: 'hello'
};

prisma.playlist.create({ data: playlist })
.then((r) => {
  console.log(r);
})
.catch(err => {
  console.error(err);
})
*/
