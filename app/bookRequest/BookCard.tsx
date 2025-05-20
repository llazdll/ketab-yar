'use client';

import { useState } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { addToCartAction } from "@/utils/actions";
import { toast } from 'sonner';
import Link from 'next/link';

export default function BookCard({ book }: { book: any }) {
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      const result = await addToCartAction(book.id);
      
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error('خطای ناشناخته در اضافه کردن به سبد خرید');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="h-full flex flex-col border border-gray-200 shadow-sm hover:shadow-2xl ease-in">
      <Link 
      href={`/bookRequest/${book.id}`}
      className="relative aspect-[3/4] bg-gray-100 rounded-t-lg overflow-hidden">
        <Image
          src={book.images[0]}
          alt={book.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 85vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
          priority={false}
        />
        {book.tags && (
          <div className="absolute top-2 left-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">
            <span className="text-primary-600 font-bold text-sm">
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
            ودیعه: {book.deposit.toLocaleString()} تومان
          </span>
        </div>
        <button 
          onClick={handleAddToCart}
          disabled={loading}
          className={`w-full bg-primary hover:bg-primary/80 text-white py-2 rounded-lg text-xs transition-colors ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'در حال اضافه کردن...' : 'اجاره کتاب'}
        </button>
      </CardFooter>
    </Card>
  );
}