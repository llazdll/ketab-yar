import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export const BookSkeleton = () => (
  <div className="p-1 h-full">
            <div className="flex-shrink-0 md:basis-1">
            <div className="p-1 h-full">
                <Card className="h-full flex flex-col transition-all hover:shadow-lg hover:-translate-y-1">
                    <div className="relative aspect-[3/4] bg-gray-100 rounded-t-lg overflow-hidden">
                        <Skeleton className="rounded-t-lg object-cover h-full" />
                    </div>
                    <CardContent className="flex-grow p-3 space-y-2">
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                    </CardContent>
                    <CardFooter className="p-3 pt-0 flex flex-col">
                        <div className="flex justify-between w-full items-center mb-2">
                            <Skeleton className="h-5 w-1/2" />
                            <Skeleton className="h-4 w-1/3" />
                        </div>
                        <Skeleton className="h-8 w-full bg-red-600 rounded-lg" />
                    </CardFooter>
                </Card>
            </div>
        </div>
  </div>
);

const Loading = () => (
  <div dir="ltr" className="mx-auto md:w-[70%] w-[65%] pt-10">
    <div className="w-full">
      <div className="flex -ml-1 overflow-x-auto">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="pl-1 flex-shrink-0 w-48 md:basis-3/12">
            <BookSkeleton />
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Loading;