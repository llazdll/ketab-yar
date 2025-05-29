// src/components/RentBook.tsx
"use client"
import React, { useState } from 'react';
import { dateCalculator } from '@/utils/date';

function RentBook() {
  const [startDate, setStartDate] = useState('1404/02/31');
  const [endDate, setEndDate] = useState('1404/03/07');
  const [days, setDays] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculateDays = () => {
    console.log(startDate,endDate);
    
    try {
      setError(null);
      const calculatedDays = dateCalculator(startDate, endDate);
      setDays(calculatedDays);
    } catch (err) {
      setError(err.message);
      setDays(null);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">محاسبه مدت اجاره</h1>
      
      <div className="space-y-4">
        <div>
          <label className="block mb-1">تاریخ شروع:</label>
          <input
            type="text"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="YYYY/MM/DD"
          />
        </div>
        
        <div>
          <label className="block mb-1">تاریخ پایان:</label>
          <input
            type="text"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="YYYY/MM/DD"
          />
        </div>
        
        <button
          onClick={calculateDays}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          محاسبه تعداد روزها
        </button>
        
        {error && (
          <div className="text-red-500 p-2 bg-red-50 rounded">{error}</div>
        )}
        
        {days !== null && (
          <div className="p-4 bg-green-50 rounded">
            <p className="font-bold">تعداد روزهای اجاره: {days} روز</p>
            <p className="text-sm text-gray-600">
              از {startDate} تا {endDate}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default RentBook;