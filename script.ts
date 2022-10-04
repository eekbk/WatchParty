import { PrismaClient } from '@prisma/client';
// import { mainModule } from 'process';

const prisma = new PrismaClient();

const main = async () => {
  // we're gonna write our Prisma Client queries here
  // const user = await prisma.user.create({
  //   data: {
  //     user_name: 'Dahlak ',
  //     email: 'xyz@123.com',
  //   },
  // });
  // console.log(user);
};

main()
  .catch((err) => {
    console.error(err.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
