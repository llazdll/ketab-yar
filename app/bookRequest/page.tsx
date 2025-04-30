"use client"

import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { FaBookOpen, FaLocationArrow, FaInfoCircle } from 'react-icons/fa'
import RangePicker from './rangePicker'
import Image from 'next/image'
import CustomButton from '../CustomeButton'
import { MdNavigateNext } from 'react-icons/md'
import books from '@/prisma/books.json'

function RentBook() {
    const [selectedBook, setSelectedBook] = useState('crime-and-punishment')
    const cities = [
        { id: 'karaj', name: 'کرج' },
        { id: 'tehran', name: 'تهران' },
        { id: 'qazvin', name: 'قزوین' },
        { id: 'shiraz', name: 'شیراز' }
    ]

    const selectedBookData = books.find(book => book.id === selectedBook)

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 min-h-screen p-4'>
            <div className='space-y-8 border-2 border-primary/60 rounded-lg p-6 bg-white shadow-md'>
                <h1 className='text-3xl font-bold text-gray-700'>کتاب های موجود</h1>
                <div className='space-y-4'>
                    <div className='flex items-center gap-2 text-gray-700'>
                        <FaBookOpen className='text-primary' />
                        <h2 className='text-lg'>کتاب هایی که میتونی قرض بگیری</h2>
                    </div>
                    <Select dir='rtl' value={selectedBook} onValueChange={setSelectedBook}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="کتاب های موجود" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>کتاب:</SelectLabel>
                                {books.map(book => (
                                    <SelectItem key={book.id} value={book.id}>
                                        {book.title}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className='space-y-4'>
                    <div className='flex items-center gap-2 text-gray-700'>
                        <FaLocationArrow className='text-primary' />
                        <h2 className='text-lg'>شهر هایی که میتونی کتاب رو تحویل بگیری</h2>
                    </div>
                    <Select dir='rtl'>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="محل تحویل" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>شهر تحویل:</SelectLabel>
                                {cities.map(city => (
                                    <SelectItem key={city.id} value={city.id}>
                                        {city.name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className='space-y-4'>
                    <div className='flex items-center gap-2 text-gray-700'>
                        <FaLocationArrow className='text-primary' />
                        <h2 className='text-lg'>تاریخ تحویل کتاب</h2>
                    </div>
                    <RangePicker />
                </div>
                <CustomButton 
                    className='w-full md:w-auto shadow-lg hover:bg-primary/80 transition duration-300 ease-in-out flex flex-row-reverse'
                    title=''
                    linkText='بعدی'
                    href='/checkout'
                    icon={<MdNavigateNext />}
                />
            </div>
            <div className='flex flex-col items-center justify-center gap-6 rounded-lg p-2 bg-white shadow-md'>
                <div className='bg-gray-50 p-4 rounded-lg space-y-3'>
                    <div className='flex items-center gap-2 text-primary'>
                        <FaInfoCircle />
                        <h3 className='font-medium'>درباره کتاب</h3>
                    </div>
                    <div>
                        <span className='text-sm bg-primary/10 text-primary px-2 py-1 rounded'>
                            {selectedBookData?.category}
                        </span>
                    </div>
                    <p className='text-gray-700 text-justify leading-relaxed'>
                        {selectedBookData?.description}
                    </p>
                </div>
                <div className='relative w-full max-w-md aspect-[3/4] shadow-lg rounded-lg overflow-hidden'>
                    <Image
                        src={selectedBookData?.images?.[0] || '/books/default.jpg'}
                        alt={selectedBookData?.title || 'کتاب'}
                        fill
                        className='object-cover'
                        priority
                    />
                </div>
                <div className='text-center'>
                    <h3 className='text-2xl font-bold'>{selectedBookData?.title}</h3>
                    <p className='text-gray-500'>{selectedBookData?.category}</p>
                </div>
            </div>
        </div>
    )
}

export default RentBook
