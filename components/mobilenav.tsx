import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { CiMenuKebab, CiShoppingCart } from "react-icons/ci";
import { FiUser, FiLogOut, FiShoppingBag } from "react-icons/fi";
import SignOutButton from "./SignOutButton"
import SignInButtons from "./SignInButtons"
import Link from "next/link"
import NavigationLinks from "./NavigationLinks"

export function UserNav({ session, data }: { session: any, data: any }) {
  if (session === undefined) {
    return <div className="w-[100px] h-[30px] rounded-full bg-muted animate-pulse" />
  }

  const cartCount = data.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = data.reduce((sum, item) => sum + (item.book.dailyPrice * item.quantity), 0);

  return session?.user ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative flex items-center gap-3">
          <div className="relative">
            <CiShoppingCart className="text-2xl text-primary hover:text-amber-700 transition-colors" />
            {cartCount > 0 && (
              <div className="absolute -top-2 -right-2 flex items-center justify-center 
                            h-5 w-5 rounded-full bg-red-500 border-2 border-background 
                            shadow-sm shadow-red-500/30">
                <span className="text-xs font-bold text-white">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              </div>
            )}
          </div>
          
          <div className="relative group">
            <Avatar className="cursor-pointer h-9 w-9 border-2 border-primary shadow-md shadow-amber-500/20 transition-all duration-300 group-hover:scale-105">
              <AvatarImage src={session.user.image ?? "/default-avatar.png"} alt="User" />
              <AvatarFallback className="bg-amber-100 text-amber-800 font-medium">
                {session.user.name?.[0]?.toUpperCase() ?? "U"}
              </AvatarFallback>
            </Avatar>
            <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-amber-300 transition-all duration-300 pointer-events-none" />
          </div>
        </div>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-64 p-2 rounded-lg shadow-xl border border-gray-100">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="bg-primary/20 p-2 rounded-full">
            <FiUser className="text-amber-600 text-lg" />
          </div>
          <div>
            <p className="font-medium text-primary">{session.user.name}</p>
            <p className="text-xs text-muted-foreground truncate max-w-[180px]">
              {session.user.email}
            </p>
          </div>
        </div>
        
        <DropdownMenuSeparator className="my-1 bg-gray-100" />
        
        <div className="md:hidden px-3 py-2 flex flex-col items-end gap-2">
          <NavigationLinks />
        </div>
        

        <div className="px-3 py-2 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <FiShoppingBag className="text-primary" />
              <span>سبد خرید</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{cartCount} آیتم</span>
              <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-xs font-bold text-primary">{cartCount}</span>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center bg-primary/20 rounded-md px-3 py-2">
            <span className="text-sm text-amber-800">جمع کل:</span>
            <span className="font-medium text-amber-900">
              {cartTotal.toLocaleString()} تومان
            </span>
          </div>
        </div>
        
        <DropdownMenuSeparator className="my-1 bg-gray-100" />
        
        <DropdownMenuItem className="focus:bg-red-200 focus:text-red-600 rounded-md">
          <SignOutButton className="flex items-center gap-2 w-full text-left">
            <FiLogOut className="text-lg" />
            <span>خروج</span>
          </SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer h-9 w-9 border border-gray-200 hover:border-amber-300 transition-colors">
          <AvatarFallback className="bg-gray-100 text-gray-500">
            <CiMenuKebab className="text-xl" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 p-2 rounded-lg shadow-xl">
        <div className="md:hidden px-3 py-2">
          <NavigationLinks />
        </div>
        <DropdownMenuItem className="px-3 py-2">
          <SignInButtons className="w-full" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}