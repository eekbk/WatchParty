// File for connecting the database
import { PrismaClient } from '@prisma/client';
// import { mainModule } from 'process';

const prisma = new PrismaClient();

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

export default prisma;
