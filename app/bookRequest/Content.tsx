"use client";

import { useState, useMemo, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { fetchFeaturedBooks,fetchAllBooks} from "@/utils/actions";
import Image from "next/image";
import BookCard from "./BookCard";
import {TypeProduct} from '@/utils/types'

export default function Content() {
  const [books, setBooks] = useState<TypeProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    const loadBooks = async () => {
      const fetchedBooks: TypeProduct[] = await fetchAllBooks();
      setBooks(fetchedBooks);
    };
    loadBooks();
  }, []);

  const categories = useMemo<string[]>(() => {
    const uniqueCategories = new Set<string>();
    books.forEach((book) => uniqueCategories.add(book.category));
    return Array.from(uniqueCategories);
  }, [books]);

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchQuery =
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory =
        selectedCategory === "all" || book.category === selectedCategory;
      return matchQuery && matchCategory;
    });
  }, [books, searchQuery, selectedCategory]);

  return (
    <>
      {/* بخش Carousel */}
      <div dir="ltr" className="mx-auto md:w-[70%] w-[65%] pt-10">
        <h2 className="text-center text-3xl py-10" id="special_book">
          کتاب های ویژه
        </h2>
        <Carousel className="w-full" opts={{ loop: true }}>
          <CarouselContent className="-ml-1">
            {books.map((book) => (
              <CarouselItem
                key={`carousel-${book.id}`}
                className="flex-shrink-0 w-48 md:basis-3/12"
              >
                <div className="p-1 h-full">
                  <Card className="h-full flex flex-col border border-gray-200 shadow-sm">
                    <div className="relative aspect-[3/4] bg-gray-100 rounded-t-lg overflow-hidden">
                      <Image
                        src={book?.images?.[0] ?? ""}
                        alt={book?.title ?? "Book image"}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 85vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                        priority={false}
                      />
                      {book.featured && (
                        <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">
                          ویژه
                        </div>
                      )}
                    </div>
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
                        <span className="text-red-600 font-bold text-sm">
                          {book.dailyPrice.toLocaleString()}
                          <span className="text-[10px] font-normal mr-1">
                            تومان/روز
                          </span>
                        </span>
                        <span className="text-[10px] text-gray-500">
                          ودیعه: {book.deposit.toLocaleString()} تومان
                        </span>
                      </div>
                      <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-xs transition-colors">
                        اجاره کتاب
                      </button>
                    </CardFooter>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      {/* بخش فیلتر و نمایش کتاب‌ها */}
      <div className="md:w-[80%] w-[90%] mx-auto mt-10">
        {/* فیلتر موبایل */}
        <div className="md:hidden flex justify-end mb-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">فیلتر و جستجو</Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-3/4 sm:w-1/2 space-y-6">
              <Input
                placeholder="جستجوی عنوان یا نویسنده..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Select
                onValueChange={(value) => setSelectedCategory(value)}
                value={selectedCategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder="دسته بندی" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">همه دسته بندی ها</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </SheetContent>
          </Sheet>
        </div>

        {/* فیلتر دسکتاپ */}
        <div className="hidden md:flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="text-lg md:text-xl font-bold ml-auto">
            کتاب های موجود
          </h2>
          <div className="flex gap-3 w-full md:w-auto">
            <Select
              value={selectedCategory}
              onValueChange={(value) => setSelectedCategory(value)}
            >
              <SelectTrigger className="min-w-[180px]">
                <SelectValue placeholder="همه دسته بندی ها" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">همه دسته بندی ها</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              placeholder="جستجوی عنوان یا نویسنده..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="min-w-[200px] text-left"
              type="search"
            />
          </div>
        </div>

        {/* لیست کتاب‌ها */}
        <div className="grid md:grid-cols-5 grid-cols-2 gap-4">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <BookCard key={`grid-${book.id}`} book={book} />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">
              کتابی یافت نشد.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
