"use client"
import { Book } from '@/types'
import React from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


interface BookSelectorProps {
    selectedBook: string
    setSelectedBook: (value: string) => void
    books: Book[]
    disabled?: boolean
}

function BookSelector({ selectedBook, setSelectedBook, books, disabled }: BookSelectorProps) {
    return (
        <Select 
            dir='rtl' 
            value={selectedBook} 
            onValueChange={setSelectedBook}
            disabled={disabled}
        >
            <SelectTrigger className="w-full" aria-label="انتخاب کتاب">
                <SelectValue placeholder={disabled ? "کتابی موجود نیست" : "کتاب های موجود"} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>کتاب:</SelectLabel>
                    {books.length > 0 ? (
                        books.map(book => (
                            <SelectItem key={book.id} value={book.id}>
                                <div className="flex items-center gap-2">
                                    <span>{book.title}</span>
                                    {book.availableCopies <= 0 && (
                                        <span className="text-xs text-red-500">(ناموجود)</span>
                                    )}
                                </div>
                            </SelectItem>
                        ))
                    ) : (
                        <SelectItem value="none" disabled>
                            کتابی یافت نشد
                        </SelectItem>
                    )}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export default BookSelector