import { BookCondition } from '@prisma/client';
import { z } from 'zod';

export const bookSchema = z.object({
  title: z
    .string()
    .min(2, { message: 'عنوان کتاب باید حداقل ۲ حرف داشته باشد' })
    .max(100, { message: 'عنوان کتاب نمی‌تواند بیش از ۱۰۰ حرف باشد' }),
  author: z
    .string()
    .min(2, { message: 'نام نویسنده باید حداقل ۲ حرف داشته باشد' })
    .max(50, { message: 'نام نویسنده نمی‌تواند بیش از ۵۰ حرف باشد' }),
  isbn: z
    .string()
    .optional(),
  publisher: z
    .string()
    .min(2, { message: 'نام ناشر باید حداقل ۲ حرف داشته باشد' })
    .max(50, { message: 'نام ناشر نمی‌تواند بیش از ۵۰ حرف باشد' }),
  edition: z
    .string()
    .min(1, { message: 'شماره چاپ ضروری است' })
    .max(20, { message: 'شماره چاپ نمی‌تواند بیش از ۲۰ کاراکتر باشد' }),
  category: z
    .string()
    .min(2, { message: 'دسته‌بندی باید حداقل ۲ حرف داشته باشد' })
    .max(30, { message: 'دسته‌بندی نمی‌تواند بیش از ۳۰ حرف باشد' }),
  condition: z
  .string()
  .min(2, { message: 'وضعیت کتاب نامعتبر است' }),
  language: z
    .string()
    .min(2, { message: 'زبان باید حداقل ۲ حرف داشته باشد' }),
  pageCount: z.coerce
    .number()
    .int()
    .positive({ message: 'تعداد صفحات باید عددی مثبت باشد' })
    .max(5000, { message: 'تعداد صفحات نمی‌تواند بیش از ۵۰۰۰ باشد' })
    .optional(),
  location: z
    .string()
    .min(2, { message: 'نام شهر باید حداقل ۲ حرف داشته باشد' }),
  dailyPrice: z.coerce
    .number()
    .int()
    .positive({ message: 'قیمت روزانه باید عددی مثبت باشد' })
    .max(1000000, { message: 'قیمت روزانه نمی‌تواند بیش از ۱,۰۰۰,۰۰۰ تومان باشد' }),
  deposit: z.coerce
    .number()
    .int()
    .positive({ message: 'مبلغ ودیعه باید عددی مثبت باشد' })
    .max(5000000, { message: 'مبلغ ودیعه نمی‌تواند بیش از ۵,۰۰۰,۰۰۰ تومان باشد' })
  // .refine(val => val > this.dailyPrice, 'ودیعه باید بیشتر از قیمت روزانه باشد')
  ,
  featured: z.coerce.boolean().default(false),
  description: z
    .string()
    .min(20, { message: 'توضیحات باید حداقل ۲۰ حرف داشته باشد' })
    .max(2000, { message: 'توضیحات نمی‌تواند بیش از ۲۰۰۰ حرف باشد' })
    .optional(),
  tags: z.array(z.string()).optional()
});

export const imageSchema = z.object({
  image: z
    .instanceof(File)
    .refine(file => file.size <= 5 * 1024 * 1024, 'حداکثر حجم فایل ۵ مگابایت است')
    .refine(
      file => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
      'فقط فرمت‌های JPEG، PNG و WebP پشتیبانی می‌شوند'
    )
});

export type BookFormValues = z.infer<typeof bookSchema>;

export function validateWithZodSchema<T>(schema: z.ZodSchema<T>, data: unknown): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors = result.error.errors.map(err => `${err.path.join('.')}: ${err.message}`);
    throw new Error(errors.join('\n'));
  }
  return result.data;
}