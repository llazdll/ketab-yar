const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const books = require('./books.json');

// Utility function for delays
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Environment check
if (process.env.NODE_ENV === 'production') {
  console.error('❌ Seeding is not allowed in production!');
  process.exit(1);
}

const users = [
  {
    id: "user_5tY8LK9J2mQ3eWXK7vY1hGQ4eF", // Matching ownerId from books.json
    email: "bookowner@example.com",
    name: "Book Owner",
    authUserId: "auth_user_bookowner"
  },
  {
    id: "user_2",
    email: "renter1@example.com",
    name: "Renter One",
    authUserId: "auth_user_renter1"
  },
  {
    id: "user_3",
    email: "renter2@example.com",
    name: "Renter Two",
    authUserId: "auth_user_renter2"
  }
];

async function cleanup() {
  console.log('🧹 Cleaning up existing data...');
  try {
    // Delete in reverse order of creation to respect foreign key constraints
    await prisma.rental.deleteMany();
    await prisma.review.deleteMany();
    await prisma.wishlist.deleteMany();
    await prisma.cart.deleteMany();
    await prisma.book.deleteMany();
    await prisma.user.deleteMany();
    console.log('✅ Database cleaned up');
  } catch (error) {
    console.error('❌ Error cleaning up database:', error);
    throw error;
  }
}

async function seedUsers() {
  try {
    console.log('🌱 Seeding users...');
    for (const user of users) {
      await prisma.user.upsert({
        where: { email: user.email },
        update: {
          name: user.name,
          authUserId: user.authUserId,
          verified: true
        },
        create: {
          id: user.id,
          email: user.email,
          name: user.name,
          authUserId: user.authUserId,
          address: '',
          phone: '',
          verified: true,
        },
      });
      await delay(100);
    }
    console.log('✅ Users seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding users:', error);
    throw error;
  }
}

let createdBooks = [];

async function seedBooks() {
  try {
    console.log('🌱 Seeding books...');
    
    // Verify the owner user exists
    const ownerExists = await prisma.user.findUnique({
      where: { id: "user_5tY8LK9J2mQ3eWXK7vY1hGQ4eF" }
    });
    
    if (!ownerExists) {
      throw new Error('Owner user not found in database');
    }

    for (const book of books) {
      // Convert string dates to Date objects
      const createdAt = book.createdAt ? new Date(book.createdAt) : new Date();
      const updatedAt = book.updatedAt ? new Date(book.updatedAt) : new Date();
      
      const bookData = {
        id: book.id,
        title: book.title,
        altTitle: book.altTitle || null,
        author: book.author,
        isbn: book.isbn || null,
        publisher: book.publisher,
        edition: book.edition || null,
        description: book.description,
        condition: book.condition || 'LIKE_NEW',
        category: book.category || 'General',
        language: book.language || 'Persian',
        pageCount: book.pageCount || null,
        images: book.images || [],
        dailyPrice: book.dailyPrice || 10.0,
        deposit: book.deposit || 30.0,
        status: book.status || 'AVAILABLE',
        featured: book.featured || false,
        ownerId: book.ownerId || "user_5tY8LK9J2mQ3eWXK7vY1hGQ4eF",
        location: book.location || null,
        tags: book.tags || [],
        views: book.views || 0,
        createdAt,
        updatedAt
      };

      const created = await prisma.book.upsert({
        where: { id: book.id },
        update: bookData,
        create: bookData
      });
      createdBooks.push(created);
      await delay(50);
    }
    console.log(`✅ ${createdBooks.length} books seeded successfully`);
  } catch (error) {
    console.error('❌ Error seeding books:', error);
    throw error;
  }
}

async function seedCarts() {
  try {
    if (users.length < 2 || createdBooks.length === 0) {
      console.log('⚠️ Skipping carts - not enough users or books available');
      return;
    }

    console.log('🌱 Seeding carts...');
    await prisma.cart.createMany({
      data: [
        {
          userId: users[1].id, // renter1
          bookId: createdBooks[0].id,
          quantity: 1
        },
        {
          userId: users[2].id, // renter2
          bookId: createdBooks[1].id,
          quantity: 1
        }
      ]
    });
    console.log('✅ Carts seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding carts:', error);
  }
}

async function seedWishlists() {
  try {
    if (users.length < 2 || createdBooks.length === 0) {
      console.log('⚠️ Skipping wishlists - not enough users or books available');
      return;
    }

    console.log('🌱 Seeding wishlists...');
    await prisma.wishlist.createMany({
      data: [
        {
          userId: users[1].id, // renter1
          bookId: createdBooks[2].id
        },
        {
          userId: users[2].id, // renter2
          bookId: createdBooks[3].id
        }
      ]
    });
    console.log('✅ Wishlists seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding wishlists:', error);
  }
}

async function seedReviews() {
  try {
    if (users.length < 2 || createdBooks.length === 0) {
      console.log('⚠️ Skipping reviews - not enough users or books available');
      return;
    }

    console.log('🌱 Seeding reviews...');
    await prisma.review.createMany({
      data: [
        {
          userId: users[1].id, // renter1
          bookId: createdBooks[0].id,
          rating: 5,
          comment: "کتاب فوق‌العاده‌ای بود! | Excellent book!"
        },
        {
          userId: users[2].id, // renter2
          bookId: createdBooks[1].id,
          rating: 4,
          comment: "حالت کتاب خیلی خوب بود | Book was in great condition"
        }
      ]
    });
    console.log('✅ Reviews seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding reviews:', error);
  }
}

async function seedRentals() {
  try {
    if (users.length < 2 || createdBooks.length === 0) {
      console.log('⚠️ Skipping rentals - not enough users or books available');
      return;
    }

    console.log('🌱 Seeding rentals...');
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + 7); // 1 week rental

    // Get books that are marked as RENTED in the seed data
    const rentedBooks = createdBooks.filter(b => b.status === 'RENTED');
    
    if (rentedBooks.length > 0) {
      await prisma.rental.createMany({
        data: [
          {
            bookId: rentedBooks[0].id,
            renterId: users[1].id, // renter1
            lenderId: users[0].id, // owner
            startDate,
            endDate,
            status: 'ACTIVE',
            totalPrice: rentedBooks[0].dailyPrice * 7
          },
          {
            bookId: rentedBooks[1]?.id || createdBooks[4].id,
            renterId: users[2].id, // renter2
            lenderId: users[0].id, // owner
            startDate,
            endDate,
            status: 'ACTIVE',
            totalPrice: (rentedBooks[1]?.dailyPrice || createdBooks[4].dailyPrice) * 7
          }
        ]
      });
    }
    console.log('✅ Rentals seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding rentals:', error);
  }
}

async function main() {
  console.log('🚀 Starting database seeding...');
  
  try {
    await cleanup();
    await seedUsers();
    await seedBooks();
    await seedCarts();
    await seedWishlists();
    await seedReviews();
    await seedRentals();
    
    console.log('🎉 Database seeding completed successfully!');
  } catch (error) {
    console.error('💥 Seeding failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();