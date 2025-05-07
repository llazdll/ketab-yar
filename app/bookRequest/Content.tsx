import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { fetchFeaturedBooks } from "@/utils/actions";
import Image from "next/image";

export default async function Content() {
  const books = await fetchFeaturedBooks();

  return (
    <>
      <div dir="ltr" className="mx-auto md:w-[70%] w-[65%] pt-10">
        <h2 className="text-center text-3xl py-10" id="special_book">کتاب های ویژه</h2>
        <Carousel className="w-full" opts={{ loop: true }}>
          <CarouselContent className="-ml-1">
            {books.map((book) => (
              <CarouselItem key={`carousel-${book.id}`} className="flex-shrink-0 w-48 md:basis-3/12">
                <div className="p-1 h-full">
                  <Card className="h-full flex flex-col border border-gray-200 shadow-sm">
                    <div className="relative aspect-[3/4] bg-gray-100 rounded-t-lg overflow-hidden">
                      <Image
                        src={book.images[0]}
                        alt={book.title}
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
                          <span className="text-[10px] font-normal mr-1">تومان/روز</span>
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
      
      <h2 className="text-center text-3xl py-10">کتاب های موجود</h2>
      <div className="grid md:grid-cols-5 md:w-[80%] w-[90%] mx-auto gap-4">
        {books.map((book) => (
          <Card key={`grid-${book.id}`} className="h-full flex flex-col border border-gray-200 shadow-sm hover:shadow-2xl ease-in">
            <div className="relative aspect-[3/4] bg-gray-100 rounded-t-lg overflow-hidden">
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
                <span className="text-[10px] text-gray-500">
                  ودیعه: {book.deposit.toLocaleString()} تومان
                </span>
              </div>
              <button className="w-full bg-primary hover:bg-primary/80 text-white py-2 rounded-lg text-xs transition-colors">
                اجاره کتاب
              </button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}