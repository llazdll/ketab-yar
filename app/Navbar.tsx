"use client"
import Link from 'next/link';
import { useState } from 'react';
import { MdMenuBook } from 'react-icons/md';


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="shadow-lg ">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              <Link href="/" className="flex items-center py-4 px-2">
                <h2 className="font-semibold text-gray-800 text-4xl">کتاب یار</h2>
                <MdMenuBook color='#ff4d30' size={50} />
              </Link>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="outline-none"
            >
              <svg
                className="w-6 h-6 text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1 ">
            <Link
              href="/"
              className="py-4 px-2 text-gray-800 font-semibold hover:text-[#ff4d30] transition duration-300"
            >
              خانه
            </Link>
            <Link
              href="/bookRequest"
              className="py-4 px-2 text-gray-800 font-semibold hover:text-[#ff4d30] transition duration-300"
            >
              درخواست کتاب
            </Link>
            <Link
              href="/aboutUs"
              className="py-4 px-2 text-gray-800 font-semibold hover:text-[#ff4d30] transition duration-300"
            >
              درباره ما
            </Link>
            <Link
              href="/contact"
              className="py-4 px-2 text-gray-800 font-semibold hover:text-[#ff4d30] transition duration-300"
            >
              تماس باما
            </Link>
          </div>
        </div>
      </div>
      
      {/* Mobile Nav */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <Link
          href="/"
          className="block py-2 px-4 text-sm hover:bg-gray-200"
          onClick={() => setIsOpen(false)}
        >
          خانه
        </Link>
        <Link
          href="/bookRequest"
          className="block py-2 px-4 text-sm hover:bg-gray-200"
          onClick={() => setIsOpen(false)}
        >
  درخواست کتاب
        </Link>
        <Link
          href="/aboutUs"
          className="block py-2 px-4 text-sm hover:bg-gray-200"
          onClick={() => setIsOpen(false)}
        >
          درباره ما
        </Link>
        <Link
          href="/contact"
          className="block py-2 px-4 text-sm hover:bg-gray-200"
          onClick={() => setIsOpen(false)}
        >
          تماس باما
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;