import { Menu, ShoppingBag, ShoppingCart, User } from "lucide-react";
import Logo from "./Logo";
import SearchInput from "./SearchInput";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { ModeToggle } from "../ui/darkMode";
import SignOut from "../SignOut";
import { authOptions } from "@/lib/auth/options";
import { getServerSession } from "next-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <div className="w-full h-12 md:h-16 bg-amber-100 shadow-xl flex justify-between items-center py-2 px-4 md:px-8 md:py-4">
      <Logo />
      <SearchInput />
      <div className="md:hidden p-5">
        <Sheet>
          <SheetTrigger>
            <Menu className="text-gray-600 cursor-pointer" />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader className="flex flex-col gap-4 p-5">
              <SheetTitle>
                <Link href={"/products"}>Explore books</Link>
              </SheetTitle>
              <SheetTitle>
                <Link href={"/seller"}>Sell a book</Link>
              </SheetTitle>
              <SheetTitle>
                <Link href={"/orders"}>Orders</Link>
              </SheetTitle>
              <SheetTitle>
                <Link href={"/cart"}>Cart</Link>
              </SheetTitle>
              <SheetTitle>
                Theme <ModeToggle />
              </SheetTitle>
              {session && (
                <SheetTitle>
                  <SignOut></SignOut>
                </SheetTitle>
              )}
              {!session && (
                <SheetTitle>
                  <Link href={"/signin"}>Sign in</Link>
                </SheetTitle>
              )}
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      <div className="hidden md:flex items-center gap-4 text-black">
        <Link
          href={"/products"}
          className="text-gray-600 font-semibold hover:text-gray-800"
        >
          Explore
        </Link>
        <ModeToggle/>
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-full bg-amber-50 p-1.5"><User className="cursor-pointer hover:text-gray-800 text-gray-600"></User></DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuSeparator />
            <DropdownMenuItem><Link href={"/cart"} className="flex items-center gap-1"><ShoppingCart></ShoppingCart> Cart</Link></DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem><Link href={"/orders"} className=" flex items-center gap-1"><ShoppingBag></ShoppingBag> Orders</Link></DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>{session && <SignOut/>}</DropdownMenuItem>
            <DropdownMenuItem>{!session && <Link href={"signin"}><Button className="w-full cursor-pointer">Sign in</Button></Link>}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
