// pages/about.tsx
import Link from "next/link";
import React from "react";
import { FiBook, FiUsers, FiHeart, FiShare2, FiPhone, FiMail } from "react-icons/fi";

export default function About() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12 text-gray-800 space-y-10">
      <h1 className="text-4xl font-bold text-center mb-4">درباره کتاب‌یار</h1>

      {/* معرفی کلی */}
      <section className="space-y-3">
        <h2 className="flex items-center text-2xl font-semibold">
          <FiBook className="ml-2 text-indigo-600" />
          کتاب‌ها باید دست‌به‌دست بچرخن
        </h2>
        <p className="text-lg leading-relaxed">
          کتاب‌یار جاییه برای اون‌هایی که عاشق کتابن. چه بخوای کتابی رو قرض بدی، یا دنبال عنوان خاصی بگردی، اینجا جای توئه.
          ما پلتفرمی ساختیم که خوندن کتاب رو آسون‌تر، ارزون‌تر و اجتماعی‌تر می‌کنه.
        </p>
      </section>

      {/* مخاطب هدف */}
      <section className="space-y-3">
        <h2 className="flex items-center text-2xl font-semibold">
          <FiUsers className="ml-2 text-green-600" />
          برای کیه؟
        </h2>
        <p className="text-lg leading-relaxed">
          برای دانشجوهایی که نمی‌خوان برای هر ترم کتاب بخرن، برای معلم‌هایی که می‌خوان منابعشون رو به اشتراک بذارن،
          برای کتاب‌بازهایی که کتاب زیاد دارن و دلشون می‌خواد بقیه هم ازشون استفاده کنن، یا حتی کسایی که فقط دنبال یه رمان آخر هفته‌ان.
        </p>
      </section>

      {/* ارزش‌ها */}
      <section className="space-y-3">
        <h2 className="flex items-center text-2xl font-semibold">
          <FiHeart className="ml-2 text-pink-600" />
          چی برامون مهمه؟
        </h2>
        <p className="text-lg leading-relaxed">
          ما به اشتراک‌گذاری، دسترسی عادلانه، و جامعه‌ای که کتاب رو دوست داره باور داریم.
          هر کتاب باید فرصت دوباره‌ای برای خونده شدن داشته باشه.
        </p>
      </section>

      {/* فراخوان به اقدام */}
      <section className="space-y-3">
        <h2 className="flex items-center text-2xl font-semibold">
          <FiShare2 className="ml-2 text-yellow-600" />
          تو هم همراه شو
        </h2>
        <p className="text-lg leading-relaxed">
          اگه کتابی داری که داره خاک می‌خوره، یا دنبال یه عنوان خاصی هستی، همین حالا به کتاب‌یار بپیوند.
          اینجا جامعه‌ایه که با هم رشد می‌کنه.
        </p>
      </section>
      <footer className="bg-white shadow-lg border-t border-gray-200 px-6 py-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">تماس با ما</h2>
            <Link  href="tel:09103217295" className="flex items-center text-lg mb-2 hover:underline">
              <FiPhone className="ml-2 text-blue-600" />
                            <span>
                                09103217295
              </span>
            </Link>
            <Link href="mailto:mo.ho3.azd@gmail.com"  className="flex items-center text-lg hover:underline">
              <FiMail className="ml-2 text-red-600" />
              <span>
                mo.ho3.azd@gmail.com
              </span>
            </Link>
          </footer>
    </main>
  );
}
