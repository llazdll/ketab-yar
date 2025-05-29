'use client'
import React, { useState } from 'react'
import DatePicker, { DateObject } from 'react-multi-date-picker'
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'
import 'react-multi-date-picker/styles/colors/yellow.css'
import { dateCalculator } from '@/utils/date'

function RangePicker({ onDateChange }: { onDateChange: (dates: string[]) => void }) {
  const [values, setValues] = useState<[DateObject, DateObject]>([
    new DateObject({ calendar: persian, locale: persian_fa }),
    new DateObject({ calendar: persian, locale: persian_fa }).add(7, 'days'),
  ])
  const [days, setDays] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  const disablePastDates = (date: DateObject) => {
    const today = new DateObject({ calendar: persian }).setHour(0).setMinute(0).setSecond(0)
    return date < today
  }

  const handleChange = (newValues: [DateObject, DateObject]) => {
    setValues(newValues)

    const [start, end] = newValues
    if (!start || !end) return

    const formattedDates = newValues.map(date =>
      date?.format('YYYY/MM/DD', { useEnglishDigits: true }) || ''
    )

    try {
      const calculated = dateCalculator(formattedDates[0], formattedDates[1])
      setDays(calculated)
      setError(null)
    } catch (err: any) {
      setDays(null)
      setError(err.message)
    }

    onDateChange(formattedDates)
  }

  return (
    <div className="custom-datepicker">
      <DatePicker
        className="yellow"
        value={values}
        onChange={handleChange}
        range
        calendar={persian}
        locale={persian_fa}
        inputClass="w-full p-2 border rounded-md text-right"
        containerClassName="w-full"
        render={<input className="w-full p-2 border rounded-md text-right text-primary" />}
        mapDays={({ date }) => {
          const disabled = disablePastDates(date)
          return {
            disabled,
            style: disabled
              ? {
                  color: '#ccc',
                  textDecoration: 'line-through',
                }
              : {},
          }
        }}
      />
      {days && (
        <p className="mt-2 text-sm text-gray-700">مدت اجاره: <span className="font-bold">{days}</span> روز</p>
      )}
      {error && (
        <p className="mt-2 text-sm text-red-600">⚠️ {error}</p>
      )}
    </div>
  )
}

export default RangePicker
