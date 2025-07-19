import { Books } from "@/lib/utils";
import Link from "next/link";
import AddtoCart from "./AddtoCart";
import Image from "next/image";
import { getAvgFeedbacks } from "@/lib/getFeedbacks";

export async function ProductCard({ item }: { item: Books }) {
  const ratings = await getAvgFeedbacks(item.id);
  
  return (
    <div className="w-full group">
      {/* Desktop Card */}
      <div className="hidden md:block bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 h-[580px] group-hover:border-amber-300 dark:group-hover:border-amber-600">
        <div className="p-6 flex flex-col h-full">
          <Link
            href={`/product/${item.id}`}
            className="flex flex-col items-center gap-4 flex-1"
          >
            {/* Image Container with Gradient Background */}
            <div className="relative w-full max-w-[180px] h-[250px] rounded-xl overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-700 dark:via-gray-600 dark:to-gray-500 shadow-md group-hover:shadow-lg transition-all duration-500">
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Subtle overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            
            {/* Content Section */}
            <div className="text-center flex flex-col gap-1.5 flex-1">
              <h3 className="text-base font-bold text-gray-900 dark:text-white line-clamp-2 leading-tight group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors duration-300">
                {item.title}
              </h3>
              <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 line-clamp-1">
                by {item.author}
              </h4>
              
              {/* Pages info */}
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                {item.page} pages
              </p>
              
              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                {item.description}
              </p>
              
              {/* Rating display */}
              <div className="flex justify-center items-center gap-2 mt-1">
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
                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  ({ratings._count.id})
                </span>
              </div>
            </div>
          </Link>
          
          {/* Bottom Section */}
          <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
            <div className="flex flex-col">
              <p className="text-xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
                ₹{item.price.toFixed(2)}
              </p>
            </div>
            <AddtoCart id={item.id} />
          </div>
        </div>
      </div>

      {/* Mobile Card */}
      <div className="md:hidden bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-lg hover:border-amber-300 dark:hover:border-amber-600 transition-all duration-300">
        <div className="p-4">
          <div className="flex gap-4">
            <Link
              href={`/product/${item.id}`}
              className="flex-shrink-0 group"
              tabIndex={-1}
            >
              <div className="relative w-[100px] h-[140px] rounded-xl overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-700 dark:via-gray-600 dark:to-gray-500 shadow-sm group-hover:shadow-md transition-all duration-300">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </Link>
            
            <div className="flex flex-col justify-between flex-1 min-h-[140px]">
              <Link href={`/product/${item.id}`} className="flex-1">
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-gray-900 dark:text-white line-clamp-2 leading-tight hover:text-amber-700 dark:hover:text-amber-300 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 line-clamp-1">
                    by {item.author}
                  </p>
                  
                  {/* Pages info */}
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    {item.page} pages
                  </p>
                  
                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 leading-relaxed">
                    {item.description}
                  </p>
                  
                  {/* Rating display */}
                  <div className="flex items-center gap-2 mt-1">
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
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      ({ratings._count.id})
                    </span>
                  </div>
                </div>
              </Link>
              
              <div className="mt-3 flex items-center justify-between">
                <p className="text-xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
                  ₹{item.price.toFixed(2)}
                </p>
                <div className="ml-2">
                  <AddtoCart id={item.id} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}