import Link from "next/link";
import AddtoCart from "./AddtoCart";
import Image from "next/image";
import { getAvgFeedbacks } from "@/lib/getFeedbacks";

interface Item {
  id: number;
  title: string;
  description: string;
  author: string;
  page: number;
  price: number;
  category: string;
  sellerId: number;
  quantity: number;
  imageUrl: string;
}

async function Card({ item }: { item: Item }) {
  const ratings = await getAvgFeedbacks(item.id);
  
  return (
    <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:-translate-y-1 h-full">
      
      <div className="relative p-3 sm:p-4 flex flex-col gap-2 sm:gap-3 h-full">
        <Link
          href={`/product/${item.id}`}
          className="flex flex-col gap-2 w-full"
        >
          {/* Responsive image container */}
          <div className="relative w-full aspect-[3/4] overflow-hidden rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600">
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
          
          {/* Compact content section */}
          <div className="text-center flex flex-col gap-1 w-full">
            <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white line-clamp-2 leading-tight">
              {item.title}
            </h3>
            <h4 className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-1 font-medium">
              by {item.author}
            </h4>
            
            {/* Pages info */}
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {item.page} pages
            </p>
            
            {/* Description - now shows on all screen sizes with appropriate clamping */}
            <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1 sm:line-clamp-2 mt-1">
              {item.description}
            </p>
            
            {/* Compact rating display */}
            <div className="flex justify-center items-center gap-1 mt-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`${
                      (ratings._avg.rating ?? 0) >= i + 1
                        ? "text-amber-400"
                        : "text-gray-300 dark:text-gray-600"
                    } text-sm transition-colors duration-200`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                ({ratings._count.id})
              </span>
            </div>
          </div>
        </Link>
        
        {/* Compact bottom section */}
        <div className="flex justify-between items-center w-full mt-auto pt-2">
          <div className="flex flex-col">
            <p className="text-base sm:text-lg font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              ₹{item.price.toFixed(2)}
            </p>
          </div>
          {/* AddtoCart button will style itself based on screen size */}
          <AddtoCart id={item.id} />
        </div>
      </div>
    </div>
  );
}

export default Card;