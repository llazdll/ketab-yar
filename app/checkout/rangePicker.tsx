'use client'
import React, { useState } from 'react'
import DatePicker, { DateObject } from 'react-multi-date-picker'
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'
import 'react-multi-date-picker/styles/colors/yellow.css'
import { handleRangePickerDateChange } from '@/utils/dateUtils'

interface RangePickerProps {
  onDateChange: (dates: string[]) => void
  onDaysChange?: (days: number) => void
}

function RangePicker({ onDateChange, onDaysChange }: RangePickerProps) {
  const [values, setValues] = useState<[DateObject, DateObject] | null>(null)
  const [days, setDays] = useState<number>(0)

  const handleChange = (newDates: [DateObject, DateObject] | null) => {
    const { values: newValues, days: newDays } = handleRangePickerDateChange(newDates, onDateChange)
    setValues(newValues)
    setDays(newDays)
    onDaysChange(newDays)
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