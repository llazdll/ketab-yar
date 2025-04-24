const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const books = require('./books.json');

const users = [
  {
    id: "user_2fRZ4XK1J3lQ1dWYK4vX4hGQ2eD",
    email: "owner1@example.com",
    name: "Owner One",
    authUserId: "auth_user_1"
  },
  {
    id: "user_5tY8LK9J2mQ3eWXK7vY1hGQ4eF",
    email: "owner2@example.com",
    name: "Owner Two",
    authUserId: "auth_user_2"
  },
  {
    id: "user_8uI3MK4J1nQ2dWXK9vY5hGQ3eG",
    email: "owner3@example.com",
    name: "Owner Three",
    authUserId: "auth_user_3"
  },
  {
    id: "user_1rT9LK2J7mQ4eWXK3vY8hGQ1eH",
    email: "owner4@example.com",
    name: "Owner Four",
    authUserId: "auth_user_4"
  }
];

async function seedUsers() {
  for (const user of users) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: {
        id: user.id,
        email: user.email,
        name: user.name,
        authUserId: user.authUserId,
        verified: true,
      },
    });
  }
}

async function seedBooks() {
  for (const book of books) {
    await prisma.book.create({ data: book });
  }
}

async function main() {
  await seedUsers();
  await seedBooks();
}

main()
  .then(() => {
    console.log('✅ Seed completed.');
  })
  .catch((e) => {
    console.error('❌ Seed failed:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
