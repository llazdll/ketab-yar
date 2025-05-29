"use client"
import React, { useState, useEffect } from 'react'
import { FaBookOpen, FaLocationArrow } from 'react-icons/fa'
import RangePicker from './rangePicker'
import CustomButton from '../CustomeButton'
import { MdNavigateNext } from 'react-icons/md'
import BookSelector from './BookSelector'
import CitySelector from './CitySelector'
import { getCartItems } from '@/utils/actions'
import BookInfo from './BookInfo'
import { Book } from '@/utils/types'
import { Skeleton } from '@/components/ui/skeleton'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

function RentBook() {
    const router = useRouter()
    const [selectedBook, setSelectedBook] = useState<string>('')
    const [selectedCity, setSelectedCity] = useState<string>('')
    const [cartItems, setCartItems] = useState<Book[]>([])
    const [dateRange, setDateRange] = useState<{ from: Date; to: Date } | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchCartItems() {
            try {
                setLoading(true)
                const items = await getCartItems()
                
                if (!items || items.length === 0) {
                    setError('سبد خرید شما خالی است')
                    return
                }

                // Ensure we have book data in the cart items
                const validBooks = items
                    .filter(item => item.book)
                    .map(item => item.book)

                if (validBooks.length === 0) {
                    setError('کتاب‌های سبد خرید نامعتبر هستند')
                    return
                }

                setCartItems(validBooks)
                setSelectedBook(validBooks[0].id)
            } catch (error) {
                console.error('Error fetching cart items:', error)
                setError('خطا در دریافت اطلاعات سبد خرید')
                toast.error('خطا در دریافت اطلاعات سبد خرید')
            } finally {
                setLoading(false)
            }
        }
        
        fetchCartItems()
    }, [])

    const selectedBookData = cartItems.find(book => book.id === selectedBook)

    const handleNext = () => {
        if (!selectedBook) {
            toast.error('لطفاً یک کتاب انتخاب کنید')
            return
        }
        if (!selectedCity) {
            toast.error('لطفاً شهر تحویل را انتخاب کنید')
            return
        }
        // if (!dateRange) {
        //     toast.error('لطفاً تاریخ تحویل را مشخص کنید')
        //     return
        // }
        
        // Store selection in session storage for checkout
        sessionStorage.setItem('rentalSelection', JSON.stringify({
            bookId: selectedBook,
            city: selectedCity,
            date:dateRange,
        }))
        
        router.push('/')
    }

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 min-h-screen p-4">
                <div className="space-y-8">
                    <Skeleton className="h-12 w-1/2" />
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="space-y-4">
                            <Skeleton className="h-6 w-1/3" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                    ))}
                    <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-4">
                    <Skeleton className="h-96 w-full" />
                    <Skeleton className="h-8 w-3/4 mx-auto" />
                    <Skeleton className="h-6 w-1/2 mx-auto" />
                </div>
            </div>
        )
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 min-h-screen p-4'>
            <div className='space-y-8 border-2 border-primary/60 rounded-lg p-6 bg-white shadow-md'>
                <h1 className='text-3xl font-bold text-gray-700'>کتاب های موجود</h1>
                
                <div className='space-y-4'>
                    <div className='flex items-center gap-2 text-gray-700'>
                        <FaBookOpen className='text-primary' />
                        <h2 className='text-lg'>کتاب هایی که میتونی قرض بگیری</h2>
                    </div>
                    <BookSelector 
                        selectedBook={selectedBook}
                        setSelectedBook={setSelectedBook}
                        books={cartItems}
                    />
                </div>
                
                <CitySelector 
                    selectedCity={selectedCity}
                    setSelectedCity={setSelectedCity}
                />
                
                <div className='space-y-4'>
                    <div className='flex items-center gap-2 text-gray-700'>
                        <FaLocationArrow className='text-primary' />
                        <h2 className='text-lg'>تاریخ تحویل کتاب</h2>
                    </div>
                    <RangePicker 
                        onDateChange={setDateRange}
                        minDate={new Date()} // Prevent selecting past dates
                    />
                </div>
                
                {/* <CustomButton 
                    className='w-full md:w-auto shadow-lg hover:bg-primary/80 transition duration-300 ease-in-out flex flex-row-reverse'
                    title=''
                    linkText='بعدی'
                    onClick={handleNext}
                    icon={<MdNavigateNext />}
                    disabled={!selectedBook || !selectedCity || !dateRange}
                /> */}
                <button onClick={handleNext}>next</button>
            </div>
            <BookInfo selectedBookData={selectedBookData || null} />
        </div>
    )
}

export default RentBook