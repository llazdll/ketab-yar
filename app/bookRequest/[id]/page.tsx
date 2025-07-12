"use server"
import { FaInfoCircle, FaStar, FaBookOpen, FaCalendarAlt, FaShoppingCart, FaArrowLeft } from 'react-icons/fa'
import { fetchSingleBooks } from '@/utils/actions'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import AddToCartButton from '@/components/addToCartButton'
import Link from 'next/link'
import { TypeProduct } from '@/utils/types'
type PageProps={
  params:{
    id:string
  }
}
async function SingleProductPage({ params }: PageProps) {
  const product: TypeProduct = await fetchSingleBooks(params.id);

  return (
    <section className="max-w-6xl mx-auto px-4 py-8 md:py-12">
      <div className="mb-6">
        <Link 
          href="/books" 
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
        >
          <FaArrowLeft />
          <span>بازگشت به لیست کتاب‌ها</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <div className="relative w-full aspect-[3/4] rounded-xl shadow-lg overflow-hidden bg-gray-50">
          <Image
            src={product.images?.[0] || '/books/default.jpg'}
            alt={product.title}
            fill
            className="object-contain p-4"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute top-2 left-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              <FaStar className="text-yellow-500" size={12} />
              <span>{product.rating || 'N/A'}</span>
            </Badge>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{product.title}</h1>
            <p className="text-lg text-gray-600">{product.author}</p>
          </div>


          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 pb-4 border-b">
            <div className="space-y-1">
              <p className="text-sm text-gray-500">قیمت روزانه</p>
              <p className="text-xl font-bold text-primary">
                {product.dailyPrice?.toLocaleString()} تومان
              </p>
            </div>
            <AddToCartButton product_id={product.id}/>
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="flex items-center gap-1">
                <FaBookOpen className="text-primary" size={12} />
                {product.pages} صفحه
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <FaCalendarAlt className="text-primary" size={12} />
                {product.publishedYear}
              </Badge>
              <Badge variant="secondary">{product.category}</Badge>
              <Badge variant={product.status === 'AVAILABLE' ? 'success' : 'destructive'}>
                {product.status === 'AVAILABLE' ? 'موجود' : 'ناموجود'}
              </Badge>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <div className="flex items-center gap-2 text-primary">
                <FaInfoCircle />
                <h3 className="font-medium">درباره کتاب</h3>
              </div>
              <p className="text-gray-700 text-justify leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-1">
              <p className="font-medium text-gray-500">ناشر</p>
              <p>{product.publisher}</p>
            </div>
            <div className="space-y-1">
              <p className="font-medium text-gray-500">شابک</p>
              <p>{product.isbn || 'N/A'}</p>
            </div>
            <div className="space-y-1">
              <p className="font-medium text-gray-500">وضعیت فیزیکی</p>
              <p>
                {product.condition === 'NEW' && 'نو'}
                {product.condition === 'LIKE_NEW' && 'در حد نو'}
                {product.condition === 'VERY_GOOD' && 'خیلی خوب'}
              </p>
            </div>
            <div className="space-y-1">
              <p className="font-medium text-gray-500">زبان</p>
              <p>{product.language}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link 
              href="/cart" 
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              <FaShoppingCart />
              مشاهده سبد خرید
            </Link>
            <Link 
              href="/bookRequest" 
              className="inline-flex items-center gap-2 px-4 py-2 border border-primary text-primary rounded-md hover:bg-primary/10 transition-colors"
            >
              لیست درخواست کتاب‌ها
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SingleProductPage
