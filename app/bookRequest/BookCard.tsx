'use client';

import { useState } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { addToCartAction } from "@/utils/actions";
import Link from 'next/link';
import { toast } from 'sonner';

export default function BookCard({ book }: { book: any }) {
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      const result = await addToCartAction(book.id);

      if (result.success) {
        toast.success('کتاب به سبد خرید اضافه شد', {
          description: 'شما می‌توانید با مراجعه به سبد خرید فرآیند اجاره را ادامه دهید.',
          action: {
            label: 'مشاهده سبد خرید',
            onClick: () => window.location.href = '/cart'
          },
        });
      } else {
        toast.error('این کتاب در  سبد خرید هست', {
          description: result.error || 'درحال حاظر این کتاب توی سبد خریدت هست. برای تغیر مقدار به سبد خرید مرجعه کن'
        });
      }
    } catch (error) {
      toast.error('خطای غیرمنتظره', {
        description: 'در هنگام افزودن کتاب به سبد خرید مشکلی پیش آمد.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="h-full flex flex-col border border-gray-200 shadow-sm hover:shadow-2xl transition-shadow duration-200 ease-in-out">
      <Link 
        href={`/bookRequest/${book.id}`}
        className="relative aspect-[3/4] bg-gray-100 rounded-t-lg overflow-hidden"
      >
        <Image
          src={book.images[0] || '/books/default.jpg'}
          alt={book.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 85vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
          priority={false}
        />
        {book.dailyPrice && (
          <div className="absolute top-2 left-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">
            <span>
              {book.dailyPrice.toLocaleString()}
              <span className="text-[10px] font-normal mr-1">تومان/روز</span>
            </span>
          </div>
        )}
      </Link>

      <CardContent className="flex-grow p-3 space-y-1">
        <h3 className="font-bold text-sm line-clamp-2 leading-tight h-12 flex items-center">
          {book.title}
        </h3>
        <p className="text-xs text-gray-600 line-clamp-1">
          {book.author}
        </p>
      </CardContent>

      <CardFooter className="p-3 pt-0 flex flex-col">
        <div className="flex justify-between w-full items-center mb-2">
          <span className="text-[10px] text-gray-500">
            ودیعه: {book.deposit?.toLocaleString() || '---'} تومان
          </span>
        </div>
        <button 
          onClick={handleAddToCart}
          disabled={loading}
          className={`w-full bg-primary hover:bg-primary/80 text-white py-2 rounded-lg text-xs transition-colors ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'در حال افزودن...' : 'اجاره کتاب'}
        </button>
      </CardFooter>
    </Card>
  );
}
