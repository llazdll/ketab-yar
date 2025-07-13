import { getCartItems } from '@/utils/actions';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import Counter from './Counter';

async function Cart() {
    const cartItems = await getCartItems();
    console.log(cartItems,'User_1rT9LK2J7mQ4eWXK3vY8hGQ1eH');
    
    if (!cartItems || cartItems.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh]">
                <h2 className="text-2xl font-bold mb-4">سبد خرید شما خالی است</h2>
                <Link href="/bookRequest">
                    <Button variant="default">
                        بازگشت به فروشگاه
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">سبد خرید</h1>

            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                    {cartItems.map((item) => (
                        <div key={item.id} className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg">
                            <div className="relative aspect-[3/4] w-full md:w-48 flex-shrink-0">
                                <Image
                                    src={item?.book?.images?.[0] || '/books/default.jpg'}
                                    alt={item?.book?.title||'alt'}
                                    fill
                                    className="object-cover rounded-lg"
                                    sizes="(max-width: 640px) 100vw, 200px"
                                />
                            </div>

                            <div className="flex-grow">
                                <h2 className="text-xl font-bold">{item.book?.title}</h2>
                                <p className="text-gray-600">{item?.book?.author}</p>
                                <p className="text-primary font-bold mt-2">
                                    {item?.book?.dailyPrice.toLocaleString()} تومان/روز
                                </p>
                                <p className="text-sm text-gray-500 mt-1">
                                    ودیعه: {item?.book?.deposit.toLocaleString()} تومان
                                </p>

                                <div className="flex items-center mt-4 gap-4">
                                    <Counter initialCounterValue={item.quantity} bookId={item.bookId} userId={item.userId}  />

                                   
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="border rounded-lg p-6 h-fit sticky top-4">
                    <h2 className="text-xl font-bold mb-4">خلاصه سفارش</h2>

                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <span>تعداد کتاب‌ها:</span>
                            <span>{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
                        </div>

                        <div className="flex justify-between font-bold text-lg">
                            <span>مبلغ کل:</span>
                            <span>
                                {cartItems
                                    .reduce((sum, item) => sum + (item.book?.dailyPrice||10 * item.quantity), 0)
                                    .toLocaleString()} تومان
                            </span>
                        </div>

                        <div className="pt-4 border-t">
                            <Link href="/checkout">
                                <Button className="w-full" size="lg">
                                    ادامه جهت پرداخت
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;