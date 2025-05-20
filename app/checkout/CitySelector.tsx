"use client"
import React from 'react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { FaLocationArrow } from 'react-icons/fa';

interface CitySelectorProps {
    selectedCity: string
    setSelectedCity: (value: string) => void
}

const cities = [
    { id: 'karaj', name: 'کرج' },
    { id: 'tehran', name: 'تهران' },
    { id: 'qazvin', name: 'قزوین' },
    { id: 'shiraz', name: 'شیراز' }
];

function CitySelector({ selectedCity, setSelectedCity }: CitySelectorProps) {
    return (
        <div className='space-y-4'>
            <div className='flex items-center gap-2 text-gray-700'>
                <FaLocationArrow className='text-primary' />
                <h2 className='text-lg'>شهر هایی که میتونی کتاب رو تحویل بگیری</h2>
            </div>
            <Select 
                dir='rtl' 
                value={selectedCity} 
                onValueChange={setSelectedCity}
            >
                <SelectTrigger className="w-full" aria-label="انتخاب شهر">
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
    );
}

export default CitySelector;