import { PrismaClient } from '@prisma/client';
// import { mainModule } from 'process';

const prisma = new PrismaClient();

// const main = async () => {
//   // func for connecting prisma
// };

// main()
//   .catch((err) => {
//     console.error(err.message);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

export default prisma;
