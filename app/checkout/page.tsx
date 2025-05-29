"use client"
import React, { useState, useEffect } from 'react'
import { FaBookOpen, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa'
import { MdNavigateNext } from 'react-icons/md'
import Image from 'next/image'
import { toast } from 'sonner'
import RangePicker from './RangePicker'
import CitySelector from './CitySelector'
import { getCartItems } from '@/utils/actions'
import { Book } from '@/utils/types'
import { Skeleton } from '@/components/ui/skeleton'

function RentBook() {
  const [selectedCity, setSelectedCity] = useState<string>('')
  const [cartItems, setCartItems] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [dateRange, setDateRange] = useState<string[]>([])
  const [days, setDays] = useState(0)

  useEffect(() => {
    async function fetchCartItems() {
      try {
        setLoading(true)
        const items = await getCartItems()
        
        if (!items || items.length === 0) {
          setError('سبد خرید شما خالی است')
          return
        }

        const validBooks = items
          .filter(item => item.book)
          .map(item => item.book)

        if (validBooks.length === 0) {
          setError('کتاب‌های سبد خرید نامعتبر هستند')
          return
        }

        setCartItems(validBooks)
      } catch (err) {
        console.error('Error fetching cart items:', err)
        toast.error('خطا در دریافت اطلاعات سبد خرید')
        setError('خطا در دریافت اطلاعات سبد خرید')
      } finally {
        setLoading(false)
      }
    }

    fetchCartItems()
  }, [])

  useEffect(() => {
    if (dateRange.length === 2) {
      try {
        const calculatedDays = calculateDays(dateRange[0], dateRange[1])
        setDays(calculatedDays)
        setError(null)
      } catch (err) {
        setDays(0)
        setError('تاریخ‌های وارد شده نامعتبر هستند')
      }
    }
  }, [dateRange])

  const calculateDays = (startDate: string, endDate: string): number => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffTime = end.getTime() - start.getTime()
    return Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1
  }

  const handleNext = () => {
    if (!selectedCity) {
      toast.error('لطفاً شهر تحویل را انتخاب کنید')
      return
    }
    if (days <= 0) {
      toast.error('لطفاً تاریخ تحویل را مشخص کنید')
      return
    }

    sessionStorage.setItem('rentalSelection', JSON.stringify({
      books: cartItems.map(book => book.id),
      city: selectedCity,
      startDate: dateRange[0],
      endDate: dateRange[1],
      days: days,
      totalCost: totalRentalCost + totalDeposit
    }))

    // Proceed to payment
    window.location.href = '/checkout/payment'
  }

  const totalDeposit = cartItems.reduce((sum, book) => sum + (book.deposit || 0), 0)
  const totalRentalCost = cartItems.reduce((sum, book) => 
    sum + ((book.dailyPrice || 0) * days), 0)

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

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 text-center">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold text-red-500 mb-4">خطا</h1>
          <p className="text-gray-700">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">تکمیل اطلاعات اجاره کتاب</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Book List and Forms */}
        <div className="lg:col-span-2 space-y-6">
          {/* Book List */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <FaBookOpen className="text-blue-500" />
              کتاب‌های انتخابی
            </h2>
            <div className="space-y-4">
              {cartItems.map((book) => (
                <div key={book.id} className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg">
                  <div className="relative aspect-[3/4] w-full md:w-32 flex-shrink-0">
                    {book.images?.[0] ? (
                      <Image
                        src={book.images[0]}
                        alt={book.title}
                        fill
                        className="object-cover rounded-lg"
                        sizes="(max-width: 640px) 100vw, 150px"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center rounded-lg">
                        <FaBookOpen className="text-gray-400 text-2xl" />
                      </div>
                    )}
                  </div>
                  <div className="flex-grow">
                    <h2 className="text-lg font-bold">{book.title}</h2>
                    <p className="text-gray-600">{book.author}</p>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-sm text-gray-500">قیمت روزانه:</p>
                        <p className="font-medium">{book.dailyPrice?.toLocaleString()} تومان</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">ودیعه:</p>
                        <p className="font-medium">{book.deposit?.toLocaleString()} تومان</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <FaMapMarkerAlt className="text-blue-500" />
              اطلاعات تحویل
            </h2>
            <CitySelector 
              selectedCity={selectedCity} 
              setSelectedCity={setSelectedCity} 
            />
          </div>

          {/* Delivery Time */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <FaCalendarAlt className="text-blue-500" />
              زمان تحویل
            </h2>
            <RangePicker onDateChange={setDateRange} />
            {dateRange.length === 2 && (
              <p className="text-sm text-gray-500 mt-2">
                مدت اجاره: {days} روز ({dateRange[0]} تا {dateRange[1]})
              </p>
            )}
            {error && (
              <p className="text-sm text-red-500 mt-2">{error}</p>
            )}
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">خلاصه سفارش</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">تعداد کتاب:</span>
                <span>{cartItems.length}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">مدت اجاره:</span>
                <span>{days || '--'} روز</span>
              </div>
              
              <div className="border-t border-gray-200 pt-3 mt-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">هزینه اجاره:</span>
                  <span>{totalRentalCost.toLocaleString()} تومان</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">ودیعه:</span>
                  <span>{totalDeposit.toLocaleString()} تومان</span>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-3 mt-2">
                <div className="flex justify-between font-bold text-lg">
                  <span>مبلغ قابل پرداخت:</span>
                  <span className="text-blue-600">
                    {(totalRentalCost + totalDeposit).toLocaleString()} تومان
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handleNext}
              disabled={!selectedCity || days <= 0}
              className={`w-full mt-6 py-3 px-4 rounded-lg font-medium text-white flex items-center justify-center gap-2
                ${(!selectedCity || days <= 0) 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 transition-colors'}
              `}
            >
              ادامه به پرداخت
              <MdNavigateNext className="text-xl" />
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-medium text-gray-700 mb-2">اطلاعات تکمیلی</h3>
            <p className="text-sm text-gray-500">
              کتاب‌ها پس از تایید نهایی سفارش، در تاریخ و محل مشخص شده تحویل داده خواهند شد.
              ودیعه پس از بازگشت کتاب در صورت سالم بودن، عودت داده می‌شود.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RentBook