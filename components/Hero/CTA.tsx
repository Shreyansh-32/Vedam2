"use client";

import { MoveUpRight } from "lucide-react";
import { useRouter } from "next/navigation";

const CTA = () => {
  const router = useRouter();

  return (
    <button
      className="dark:bg-amber-600 dark:hover:bg-amber-500 bg-amber-200 hover:bg-amber-300 transition-colors duration-300 shadow-md text-black dark:text-white flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg md:text-xl rounded-full font-medium w-full max-w-xs md:max-w-sm"
      onClick={() => router.push("/products")}
    >
      Shop now <MoveUpRight className="size-5 sm:size-6" />
    </button>
  );
};

export default CTA;
