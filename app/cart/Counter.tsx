'use client';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { removeFromCart, updateCartItem } from '@/utils/actions'; 
import { toast } from 'sonner';
interface CounterProps {
    initialCounterValue: number;
    bookId: string; 
    userId: string; 
}
function Counter({ initialCounterValue, bookId, userId }: CounterProps) {
    const [counter, setCounter] = useState(initialCounterValue);
    const [loading, setLoading] = useState(false)
    const handleDecrement = async () => {
        if (counter > 1) {
            const newCounter = counter - 1;
            setCounter(newCounter);
            setLoading(true);
            const result=await updateCartItem(bookId, userId, newCounter);
            if (result?.success) {
                toast.success(`تعداد کتاب ${bookId} با موفقیت کاهش یافت`);
                
            } else {
                 toast.error(`خطا در کاهش تعداد کتاب${bookId}`);
            }
            setLoading(false); 
        }
    };

    const handleIncrement = async () => {
        const newCounter = counter + 1;
        setCounter(newCounter);
        setLoading(true);
        const result=await updateCartItem(bookId, userId, newCounter);
        if (result?.success) {
                toast.success(`تعداد کتاب ${bookId} با موفقیت افزایش یافت`);
                
            } else {
                toast.error(`خطا در افزایش تعداد کتاب${bookId}`);
            }
        setLoading(false); 
    };

    const handleDelete = async () => {
        setLoading(true); 
        await removeFromCart(bookId, userId);
        setLoading(false); 
    };

    return (
        <div className="flex items-center mt-4 gap-4">
            <Button
                variant="outline"
                size="sm"
                disabled={loading || counter <= 1} 
                onClick={handleDecrement}
            >
                -
            </Button>
            <span className="font-medium">{counter}</span>
            <Button
                onClick={handleIncrement}
                variant="outline"
                size="sm"
                disabled={loading}
            >
                +
            </Button>
            <Button 
                type="submit" 
                variant="ghost" 
                size="sm" 
                onClick={handleDelete}
                className='bg-primary hover:bg-primary/80 text-white py-2 rounded-lg text-xs transition-colors'
                disabled={loading} 
            >
                حذف
            </Button>
        </div>
    );
}

export default Counter;
