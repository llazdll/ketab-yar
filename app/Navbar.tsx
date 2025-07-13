import Link from 'next/link';
import { MdMenuBook } from 'react-icons/md';
import { auth } from '@/auth';
import { UserNav } from '@/components/mobilenav';
import NavigationLinks from '@/components/NavigationLinks';
import { getCartItems } from '@/utils/actions';


export default async function Navbar() {
  const session = await auth();
  const data = await getCartItems()
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <MdMenuBook size={40} className="text-primary" />
          <span className="text-2xl font-bold text-gray-800">کتاب‌یار</span>
        </Link>
        <div className="hidden md:flex gap-6 items-center">
          <NavigationLinks />
        </div>
        <UserNav session={session} data={data} />
      </div>
    </nav>
  );
}
