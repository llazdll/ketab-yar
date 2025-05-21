'use server'
import { auth } from '@/auth'
import db from '@/utils/db'
import { bookSchema, imageSchema, validateWithZodSchema } from './schema';
import { uploadImage } from './supabase';
import { revalidatePath } from 'next/cache';

const getAuthUser = async () => {
  const user = await auth();
  if (!user) {
    throw new Error('You must be logged in to access this route');
  }
  return user;
};

export const fetchFeaturedBooks = async () => {
  const books = await db.book.findMany({
    where: {
      featured: true
    }
  })
  return books
}

export const fetchAllBooks = async () => {
  return db.book.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })
}


export const createBookAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {

  const user = await getAuthUser();

  try {
    const rawData = Object.fromEntries(formData);
    const file = formData.get('images') as File
    const condition = formData.get('condition')
    console.log(condition);

    const validatedFields = validateWithZodSchema(bookSchema, rawData);
    console.log(validatedFields);

    const validatedFile = validateWithZodSchema(imageSchema, { image: file })
    console.log(validatedFile);
    const fullPath = await uploadImage(validatedFile.image, user.user?.id as string);
    await db.book.create({
      data: {
        ...validatedFields,
        images: [fullPath],
        ownerId: user.user?.id,
        owner: {
          connect: { id: "user_1rT9LK2J7mQ4eWXK3vY8hGQ1eH" }
        }
      },
    });

    return { message: 'کتاب با موفقیت ایجاد شد' };  // Success message
  } catch (error) {
    return renderError(error);
  }
};

function renderError(error: unknown): { message: string } {
  if (error instanceof Error) {
    return { message: error.message };  // Return error message
  }
  return { message: 'خطای ناشناخته رخ داده است' };  // Fallback error message
}

export const addToCartAction = async (bookId: string) => {
  const user = await getAuthUser();
  console.log("added to cart", bookId);


  try {
    await db.cart.create({
      data: {
        bookId,
        userId: user.user?.email as string,
        quantity: 1,
      }
    });
    console.log(user.user?.email);

    return {
      success: true,
      message: 'کتاب به سبد خرید اضافه شد',
    };
  } catch (error) {
    console.error('Error adding to cart:', error);
    return { error: 'خطا در اضافه کردن به سبد خرید' };
  }
};

// export const getCartItems = async () => {
//   const user = await getAuthUser();
//   const cartItems = await db.cart.findMany({
//     where: {
//       userId: user.user?.email as string,
//     },
//     const title = cartItems.title;
//     const books = await db.book.findMany({
//       where: {
//         bookId: cartItems.bookId,
//       },
//     });
//   });
//   return cartItems;
// }

export const getCartItems = async () => {
  const user = await getAuthUser();

  // Fetch cart items for the authenticated user
  const cartItems = await db.cart.findMany({
    where: {
      userId: user.user?.email as string,
    },
  });

  // Fetch related books for each cart item
  const cartItemsWithBooks = await Promise.all(
    cartItems.map(async (cartItem) => {
      const book = await db.book.findUnique({
        where: {
          id: cartItem.bookId, // Assuming bookId corresponds to the id in the books table
        },
      });
      return {
        ...cartItem,
        book, // Attach the book information to the cart item
      };
    })
  );

  return cartItemsWithBooks; // Return cart items with associated books
};


export async function removeFromCart(bookId: string, userId: string) {
  await db.cart.delete({
    where: { userId_bookId: { userId, bookId } }
  });
  revalidatePath('/cart');
}

export async function updateCartItem(bookId: string, userId: string, quantity: number) {
  if (quantity <= 0) {
    await removeFromCart(bookId, userId);
    return;
  }
  
  await db.cart.update({
    where: { userId_bookId: { userId, bookId } },
    data: { quantity }
  });
  revalidatePath('/cart');
}
function name(params:type) {
  
}
export async  function fetchSingleBooks  (bookId: string) {
  try {
    const book = await db.book.findUnique({
      where: { id: bookId }
    })

    if (!book) {
      throw new Error('Book not found')
    }

    return book
  } catch (error) {
    console.error('Error fetching book:', error)
    throw error 
  }
}