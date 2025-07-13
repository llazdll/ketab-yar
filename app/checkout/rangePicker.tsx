'use client'
import React, { useState } from 'react'
import DatePicker, { DateObject } from 'react-multi-date-picker'
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'
import 'react-multi-date-picker/styles/colors/yellow.css'

interface RangePickerProps {
  onDateChange: (dates: string[]) => void
  onDaysChange?: (days: number) => void
}

function RangePicker({ onDateChange, onDaysChange }: RangePickerProps) {
  const [days, setDays] = useState<number>(0)
const [values, setValues] = useState<[DateObject, DateObject] | undefined>(undefined)
const handleChange = (newDates: DateObject[]) => {
  if (newDates.length !== 2) {
    setValues(undefined)
    onDaysChange?.(0)
    onDateChange([])
    return
  }

  const [start, end] = newDates
  const daysDiff = end.toDate().getTime() - start.toDate().getTime()
  const calculatedDays = Math.ceil(daysDiff / (1000 * 60 * 60 * 24)) + 1

  setValues(newDates as [DateObject, DateObject])
  setDays(calculatedDays)
  onDateChange([start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD')])
  onDaysChange?.(calculatedDays)
}

console.log(days);

  return (
    <>
      <DatePicker
        className="yellow"
        value={values}
        onChange={handleChange}
        range
        calendar={persian}
        locale={persian_fa}
        inputClass="w-full p-2 border rounded-md text-right focus:ring-2 focus:ring-primary focus:border-transparent"
        containerClassName="w-full"
        render={
          <input
            className="w-full p-2 border rounded-md text-right text-primary placeholder-gray-400"
            placeholder="تاریخ شروع تا پایان را انتخاب کنید"
          />
        }
      />
    </>
  )
}

export default RangePicker