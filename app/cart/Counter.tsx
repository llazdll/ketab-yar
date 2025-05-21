'use client';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { removeFromCart, updateCartItem } from '@/utils/actions';
import { toast } from 'sonner';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

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
            const result = await updateCartItem(bookId, userId, newCounter);
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
        const result = await updateCartItem(bookId, userId, newCounter);
        if (result?.success) {
            toast.success(`تعداد کتاب ${bookId} با موفقیت افزایش یافت`);

        } else {
            toast.error(`خطا در افزایش تعداد کتاب${bookId}`);
        }
        setLoading(false);
    };

    const handleDelete = async () => {
        setLoading(true);
        const result=await removeFromCart(bookId, userId);
        if (result?.success) {
            toast.success(`کتاب ${bookId} با موفقیت حذف شد`);

        } else {
            toast.error(`خطا در حذف کتاب ${bookId}`);
        }
        setLoading(false);
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
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        variant="outline"
                        className="bg-primary hover:bg-primary/80 text-white py-2 rounded-lg text-xs transition-colors"
                    >
                        حذف
                    </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>آیا مطمئن هستید که می‌خواهید این کتاب را حذف کنید؟</DialogTitle>
                        <DialogDescription className="text-right text-sm text-gray-600 mt-2 leading-relaxed">
                            با حذف این کتاب، اطلاعات آن از سیستم حذف خواهد شد و قابل بازیابی نخواهد بود.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex items-center justify-between gap-4 mt-6">
                        <Button
                            onClick={handleDelete}
                            disabled={loading}
                            className="bg-destructive hover:bg-destructive/80 text-white py-2 px-4 text-sm rounded-lg transition-colors"
                        >
                            {loading ? 'در حال حذف...' : 'تأیید حذف'}
                        </Button>

                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                                انصراف
                            </Button>
                        </DialogClose>
                    </div>
                </DialogContent>
            </Dialog>

        </div>
    );
}

export default Counter;
