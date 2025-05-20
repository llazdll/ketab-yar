'use client';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { removeFromCart, updateCartItem } from '@/utils/actions'; // Ensure this import is correct

interface CounterProps {
    initialCounterValue: number;
    bookId: string; // Define the prop type
    userId: string; // Assuming you need userId for the update
}

function Counter({ initialCounterValue, bookId, userId }: CounterProps) {
    const [counter, setCounter] = useState(initialCounterValue);
    const [loading, setLoading] = useState(false); // Loading state

    const handleDecrement = async () => {
        if (counter > 1) {
            const newCounter = counter - 1;
            setCounter(newCounter);
            setLoading(true); // Set loading to true before fetching
            await updateCartItem(bookId, userId, newCounter);
            setLoading(false); // Reset loading after fetching
        }
    };

    const handleIncrement = async () => {
        const newCounter = counter + 1;
        setCounter(newCounter);
        setLoading(true); // Set loading to true before fetching
        await updateCartItem(bookId, userId, newCounter);
        setLoading(false); // Reset loading after fetching
    };

    const handleDelete = async () => {
        setLoading(true); // Set loading to true before fetching
        await removeFromCart(bookId, userId);
        setLoading(false); // Reset loading after fetching
    };

    return (
        <div className="flex items-center mt-4 gap-4">
            <Button
                variant="outline"
                size="sm"
                disabled={loading || counter <= 1} // Disable if loading or counter is less than or equal to 1
                onClick={handleDecrement}
            >
                -
            </Button>
            <span className="font-medium">{counter}</span>
            <Button
                onClick={handleIncrement}
                variant="outline"
                size="sm"
                disabled={loading} // Disable if loading
            >
                +
            </Button>
            <Button 
                type="submit" 
                variant="ghost" 
                size="sm" 
                onClick={handleDelete}
                className='bg-primary hover:bg-primary/80 text-white py-2 rounded-lg text-xs transition-colors'
                disabled={loading} // Disable if loading
            >
                حذف
            </Button>
        </div>
    );
}

export default Counter;
