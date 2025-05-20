"use client"
import React from 'react'
import { FaInfoCircle, FaStar } from 'react-icons/fa'
import Image from 'next/image'
import { Book } from '@/types'
import { Skeleton } from '@/components/ui/skeleton'

interface BookInfoProps {
    selectedBookData: Book | null
}

function BookInfo({ selectedBookData }: BookInfoProps) {
    if (!selectedBookData) {
        return (
            <div className='flex flex-col items-center justify-center gap-6 rounded-lg p-2 bg-white shadow-md'>
                <div className='bg-gray-50 p-4 rounded-lg space-y-3 w-full'>
                    <Skeleton className="h-6 w-1/4" />
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-20 w-full" />
                </div>
                <Skeleton className="w-full max-w-md aspect-[3/4]" />
                <div className='text-center space-y-2 w-full'>
                    <Skeleton className="h-8 w-3/4 mx-auto" />
                    <Skeleton className="h-6 w-1/2 mx-auto" />
                </div>
            </div>
        )
    }

    return (
        <div className='flex flex-col items-center justify-center gap-6 rounded-lg p-2 bg-white shadow-md'>
            <div className='bg-gray-50 p-4 rounded-lg space-y-3 w-full'>
                <div className='flex items-center gap-2 text-primary'>
                    <FaInfoCircle />
                    <h3 className='font-medium'>درباره کتاب</h3>
                </div>
                <div className='flex flex-wrap gap-2'>
                    <span className='text-sm bg-primary/10 text-primary px-2 py-1 rounded'>
                        {selectedBookData.category}
                    </span>
                    <span className='text-sm bg-green-100 text-green-800 px-2 py-1 rounded flex items-center gap-1'>
                        <FaStar className="text-yellow-500" />
                        {selectedBookData.rating}
                    </span>
                    <span className='text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded'>
                        {selectedBookData.pages} صفحه
                    </span>
                </div>
                <p className='text-gray-700 text-justify leading-relaxed'>
                    {selectedBookData.description}
                </p>
                <div className='pt-2'>
                    <p className='text-sm text-gray-500'>
                        <span className='font-medium'>نویسنده:</span> {selectedBookData.author}
                    </p>
                    <p className='text-sm text-gray-500'>
                        <span className='font-medium'>سال انتشار:</span> {selectedBookData.publishedYear}
                    </p>
                </div>
            </div>
            <div className='relative w-full max-w-md aspect-[3/4] shadow-lg rounded-lg overflow-hidden'>
                <Image
                    src={selectedBookData.images?.[0] || '/books/default.jpg'}
                    alt={selectedBookData.title}
                    fill
                    className='object-cover'
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
            </div>
            <div className='text-center'>
                <h3 className='text-2xl font-bold'>{selectedBookData.title}</h3>
                <p className='text-gray-500'>{selectedBookData.author}</p>
            </div>
        </div>
    )
}

export default BookInfo