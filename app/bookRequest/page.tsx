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
import Link from 'next/link'
import CustomButton from '../CustomeButton'
import { MdNavigateNext } from 'react-icons/md'

function RentBook() {
    const [selectedBook, setSelectedBook] = useState('crime-and-punishment')

    const books = [
        {
            id: 'crime-and-punishment',
            title: 'جنایات و مکافات',
            image: '/books/crime-and-punishment.jpg',
            category: 'رمان فلسفی | روانشناختی',
            description: 'رمانی عمیق از داستایفسکی درباره دانشجویی که مرتکب قتل می‌شود و سپس با عذاب وجدان دست و پنجه نرم می‌کند. این کتاب به بررسی مفاهیم اخلاقیات، پشیمانی و رستگاری می‌پردازد.'
        },
        {
            id: 'hundred-years',
            title: '100 سال تنهایی',
            image: '/books/hundred-years.jpg',
            category: 'رمان | رئالیسم جادویی',
            description: 'شاهکار گابریل گارسیا مارکز که داستان چند نسل از خانواده بوئندیا را در شهر خیالی ماکوندو روایت می‌کند. این کتاب ترکیبی زیبا از واقعیت و عناصر جادویی است.'
        },
        {
            id: 'elvis',
            title: 'الویس',
            image: '/books/elvis.jpg',
            category: 'زندگینامه | موسیقی',
            description: 'زندگینامه جامع الویس پریسلی، سلطان راک اند رول. این کتاب به بررسی زندگی شخصی، حرفه‌ای و میرود ماندگار او در صنعت موسیقی می‌پردازد.'
        },
        {
            id: 'lost-time',
            title: 'در جست‌وجوی زمان از دست رفته',
            image: '/books/lost-time.jpg',
            category: 'رمان | کلاسیک مدرن',
            description: 'اثر مارسل پروست، یکی از مهم‌ترین آثار ادبیات قرن بیستم که به بررسی خاطرات، زمان و تجربیات حسی می‌پردازد. این رمان در هفت جلد نوشته شده است.'
        }
    ]

    const cities = [
        { id: 'karaj', name: 'کرج' },
        { id: 'tehran', name: 'تهران' },
        { id: 'qazvin', name: 'قزوین' },
        { id: 'shiraz', name: 'شیراز' }
    ]

    const selectedBookData = books.find(book => book.id === selectedBook)

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 min-h-screen p-4'>
            {/* Left Column - Form */}
            <div className='space-y-8 border-2 border-primary/60 rounded-lg p-6 bg-white shadow-md'>
                <h1 className='text-3xl font-bold text-gray-700'>کتاب های موجود</h1>

                {/* Book Selection */}
                <div className='space-y-4'>
                    <div className='flex items-center gap-2 text-gray-700'>
                        <FaBookOpen className='text-primary' />
                        <h2 className='text-lg'>کتاب هایی که میتونی قرض بگیری</h2>
                    </div>
                    <Select
                        dir='rtl'
                        value={selectedBook}
                        onValueChange={setSelectedBook}
                    >
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

                {/* City Selection */}
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

                {/* Date Range Picker */}
                <div className='space-y-4'>
                    <div className='flex items-center gap-2 text-gray-700'>
                        <FaLocationArrow className='text-primary' />
                        <h2 className='text-lg'>تاریخ تحویل کتاب</h2>
                    </div>
                    <RangePicker />
                </div>
            </div>

            {/* Right Column - Book Image */}
            <div className='flex flex-col items-center justify-center gap-6 rounded-lg p-2 bg-white shadow-md'>
                {/* Book Details */}
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
                {/* Book Image */}
                <div className='relative w-full max-w-md aspect-[3/4] shadow-lg rounded-lg overflow-hidden'>
                    <Image
                        src={selectedBookData?.image || '/books/default.jpg'}
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
            {/* <Link href={'/rentBook'} >
                <FaLocationArrow className='text-2xl' />
            next
            </Link> */}
            <CustomButton 
            className='shadow-lg hover:bg-primary/80 transition duration-300 ease-in-out flex flex-row-reverse'
            title=''
            linkText='بعدی'
            href='/rentBook'
            icon={<MdNavigateNext/>}
            >  
            </CustomButton>
        </div>
    )
}

export default RentBook