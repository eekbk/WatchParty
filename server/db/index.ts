// File for connecting the database
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

// const main = async () => {
//   // funcs interacting with the database
//   // add user
//   // add video
// };

// main()
//   .catch((err) => {
//     console.error(err.message);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

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
