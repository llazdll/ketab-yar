import Image from "next/image";
import { MdNavigateNext } from "react-icons/md";
import CustomButton from "./CustomeButton";
import { FaCheck } from "react-icons/fa";

export default function Home() {
  return (
    <section className="min-h-screen bg-white">
      <div className="container mx-auto flex flex-col-reverse items-center justify-between gap-8 px-4 py-12 sm:flex-row sm:gap-12 sm:px-6 lg:px-8">
        <div className="w-full sm:w-1/2">
          <div className="relative aspect-[680/870] w-full">
            <Image
              src="/hero-bg.png"
              alt="Person reading a book from our library"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </div>
        </div>
        <div className="flex w-full flex-col justify-center sm:w-1/2">
          <div className="space-y-6 text-right">
            <h3 className="text-2xl font-medium text-gray-700 md:text-3xl">
              کتابت رو همین الان قرض بگیر
            </h3>
            
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">
              <span className="text-primary">کتاب  یار</span>  همیشگی
            </h1>
            
            <p className="text-xl text-gray-600 md:text-2xl">
              با کتاب یار هر کتابی که میخای رو قرض بگیر، بخون و بهمون برگردون
            </p>

            <div className="flex flex-col gap-4 pt-4 sm:flex-row sm:items-center">
              <CustomButton
                linkText="کتابت رو قرض بده"
                href="/lendBook"
                className="bg-black text-white hover:bg-gray-800"
                icon={<FaCheck className="mr-2" />}
                aria-label="Borrow your book"
              />
              
              <CustomButton
                linkText="ادامه مطالب"
                href="/bookRequest"
                className="border-gray-300 hover:bg-gray-50"
                icon={<MdNavigateNext className="mr-2" />}
                aria-label="Read more content"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}