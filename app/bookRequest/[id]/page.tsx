"use server"
import { FaInfoCircle, FaStar } from 'react-icons/fa'
import { Book } from '@/utils/types'
import { Skeleton } from '@/components/ui/skeleton'
import { fetchSingleProduct } from '@/utils/actions';
import Image from 'next/image';
import { addToCartAction } from '@/utils/actions'
async function SingleProductPage({ params }: { params: { id: string } }) {
  const product = await fetchSingleProduct(params.id);

  return (
    <section className='flex flex-col items-center justify-center gap-6 rounded-lg p-2 bg-white shadow-md'>
             
                 <div className='bg-gray-50 p-4 rounded-lg space-y-3 w-full'>
                     <div className='flex items-center gap-2 text-primary'>
                         <FaInfoCircle />
                         <h3 className='font-medium'>درباره کتاب</h3>
                     </div>
                     <div className='flex flex-wrap gap-2'>
                         <span className='text-sm bg-primary/10 text-primary px-2 py-1 rounded'>
                             {product.category}
                         </span>
                         <span className='text-sm bg-green-100 text-green-800 px-2 py-1 rounded flex items-center gap-1'>
                             <FaStar className="text-yellow-500" />
                             {product.rating}
                         </span>
                         <span className='text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded'>
                             {product.pages} صفحه
                         </span>
                     </div>
                     <p className='text-gray-700 text-justify leading-relaxed'>
                         {product.description}
                     </p>
                     <div className='pt-2'>
                         <p className='text-sm text-gray-500'>
                             <span className='font-medium'>نویسنده:</span> {product.author}
                         </p>
                         <p className='text-sm text-gray-500'>
                             <span className='font-medium'>سال انتشار:</span> {product.publishedYear}
                         </p>
                     </div>
                 </div>
                 <div className='relative w-full max-w-md aspect-[3/4] shadow-lg rounded-lg overflow-hidden'>
                     <Image
                         src={product.images?.[0] || '/books/default.jpg'}
                         alt={product.title}
                         fill
                         className='object-cover'
                         priority
                         sizes="(max-width: 768px) 100vw, 50vw"
                     />
                 </div>
                 <div className='text-center'>
                     <h3 className='text-2xl font-bold'>{product.title}</h3>
                     <p className='text-gray-500'>{product.author}</p>
                 </div>
    </section>
  );
}
export default SingleProductPage;