import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { CiMenuKebab } from "react-icons/ci";
import SignOutButton from "./SignOutButton"
import SignInButtons from "./SignInButtons"
import Link from "next/link"
import NavigationLinks from "./NavigationLinks"
import { MdMenu } from "react-icons/md"

export function UserNav({ session }: { session: any }) {
    if (session === undefined) {
        return <div className="w-[100px] h-[30px] rounded-full bg-muted animate-pulse" />
    }

    return session?.user ? (
         <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer h-8 w-8">
          <AvatarImage src={session.user.image ?? "/default-avatar.png"} alt="User" />
          <AvatarFallback>{session.user.name?.[0]?.toUpperCase() ?? "U"}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="px-2 py-1 text-sm text-primary">
          {session.user.name}
        </div>
      <div className="flex md:hidden gap-5 items-center flex-col justify-between px-2 py-1 text-sm text-primary">
        <NavigationLinks/>
        </div>
        <DropdownMenuItem asChild>
          <SignOutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer h-8 w-8">
          <AvatarFallback><CiMenuKebab /></AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex md:hidden gap-5 items-center flex-col justify-between px-2 py-1 text-sm text-primary">
        <NavigationLinks/>
        </div>
        <DropdownMenuItem asChild>
          <SignInButtons />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
