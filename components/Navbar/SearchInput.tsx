"use client";

import { Search } from "lucide-react"
import { useRouter } from "next/navigation";
import { useRef } from "react";

const SearchInput = () => {

    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

  return (
    <div className="relative w-1/2 md:w-1/3">
        <form onSubmit={(e) => {
          e.preventDefault();
            const searchValue = inputRef.current?.value;
            if (searchValue) {
                router.push(`/products?search=${searchValue}`);
            } else {
                router.push('/products');
            }
            if(inputRef.current)inputRef.current.value = '';
        }}>
          <input
          type="text"
          ref={inputRef}
          className="placeholder:text-gray-500 dark:text-black h-full w-full bg-amber-50 rounded-full border border-amber-400 md:placeholder:text-base lg:placeholder:text-lg placeholder:text-sm p-2 md:px-3 lg:px-4 pr-10 focus:ring-1 focus:ring-amber-600 focus:outline-none"
          placeholder="Search for books or author"
        />
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-400 w-5 h-5 cursor-pointer" />
        </form>
      </div>
  )
}

export default SearchInput