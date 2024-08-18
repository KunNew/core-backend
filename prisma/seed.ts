// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as argon from 'argon2';

// initialize Prisma Client
const prisma = new PrismaClient();

export async function createRandomUser() {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  return {
    email: faker.internet.email(firstName, lastName, 'email.com'),
    username: `${firstName} ${lastName}`,
    // role: 'USER',
    password: await argon.hash('pwned'),
  };
}

async function main() {
  await prisma.user.deleteMany({});

  // create users
  for (let i = 0; i <= 100; ++i) {
    const userData = await createRandomUser();
    await prisma.user.create({
      data: {
        username: userData.username,
        email: userData.email,
        password: userData.password,
        role: 'USER',
      },
    });
  }
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
