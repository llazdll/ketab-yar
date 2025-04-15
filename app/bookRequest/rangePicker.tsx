"use client"
import React, { useState } from 'react'
import DatePicker, { DateObject } from 'react-multi-date-picker'
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import "react-multi-date-picker/styles/colors/yellow.css"

function RangePicker() { // Capitalized component name
    const [values, setValues] = useState([
        new DateObject(), // Today
        new DateObject().add(7, "days") // 7 days from today
    ])

    // Function to disable past dates
    const disablePastDates = (date:DateObject) => {
        const today = new DateObject().setHour(0).setMinute(0).setSecond(0)
        return date < today
    }
    return (
        <div className="custom-datepicker">
        <DatePicker
         className='yellow'
         value={values}
         onChange={setValues}
         range
         calendar={persian}
         locale={persian_fa}
         inputClass="w-full p-2 border rounded-md text-right"
         containerClassName="w-full"
         render={<input className="w-full p-2 border rounded-md text-right text-primary" />}
         mapDays={({ date }) => {
             return {
                 disabled: disablePastDates(date),
                 style: disablePastDates(date) ? { 
                     color: '#ccc',
                     textDecoration: 'line-through'
                 } : {}
             }
         }}
     />
        </div>
    )
}

export default RangePicker