'use client'
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';


interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

const HomePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems: MenuItem[] = [
    {
      id: 1,
      name: 'Classic Burger',
      description: 'Juicy beef patty with lettuce, tomato, and special sauce',
      price: 9.99,
      image: 'https://via.placeholder.com/400x300',
    },
    {
      id: 2,
      name: 'Margherita Pizza',
      description: 'Traditional pizza with tomato sauce, mozzarella, and basil',
      price: 12.99,
      image: 'https://via.placeholder.com/400x300',
    },
    {
      id: 3,
      name: 'Caesar Salad',
      description: 'Fresh romaine lettuce with Caesar dressing, croutons, and parmesan',
      price: 8.99,
      image: 'https://via.placeholder.com/400x300',
    },
    {
      id: 4,
      name: 'Chocolate Lava Cake',
      description: 'Warm chocolate cake with a molten center, served with vanilla ice cream',
      price: 6.99,
      image: 'https://via.placeholder.com/400x300',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Our Restaurant</h1>
          <p className="text-xl mb-8">Delicious food served with love</p>
          <Link
            href="/menu"
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
          >
            View Full Menu
          </Link>
        </div>
      </section>

      {/* Menu Preview Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Featured Items</h2>
          
          {/* Mobile Menu Button */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="flex items-center px-3 py-2 border rounded text-gray-700 border-gray-400 hover:text-gray-900 hover:border-gray-500"
            >
              <svg className="fill-current h-3 w-3 mr-2" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
              </svg>
              Categories
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Hidden on mobile by default */}
            <aside className={`${isSidebarOpen ? 'block' : 'hidden'} lg:block w-full lg:w-1/4 bg-white p-6 rounded-lg shadow`}>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Categories</h2>
              <ul className="space-y-2">
                <li>
                  <button className="w-full text-left px-4 py-2 rounded bg-blue-100 text-blue-700 font-medium">
                    All Items
                  </button>
                </li>
                <li>
                  <button className="w-full text-left px-4 py-2 rounded hover:bg-gray-100 text-gray-700">
                    Appetizers
                  </button>
                </li>
                <li>
                  <button className="w-full text-left px-4 py-2 rounded hover:bg-gray-100 text-gray-700">
                    Main Courses
                  </button>
                </li>
                <li>
                  <button className="w-full text-left px-4 py-2 rounded hover:bg-gray-100 text-gray-700">
                    Desserts
                  </button>
                </li>
                <li>
                  <button className="w-full text-left px-4 py-2 rounded hover:bg-gray-100 text-gray-700">
                    Drinks
                  </button>
                </li>
              </ul>
            </aside>

            {/* Menu Items */}
            <div className="w-full lg:w-3/4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {menuItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg shadow overflow-hidden">
                    <Image src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-gray-600 mt-2">{item.description}</p>
                      <div className="mt-4 flex justify-between items-center">
                        <span className="text-lg font-bold text-gray-900">${item.price.toFixed(2)}</span>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300">
                          Add to Order
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;