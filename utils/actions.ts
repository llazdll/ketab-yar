'use server'
import { auth } from '@/auth'
import db from '@/utils/db'
import { bookSchema, imageSchema, validateWithZodSchema } from './schema';
import { uploadImage } from './supabase';

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
    const condition=formData.get('condition')
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
