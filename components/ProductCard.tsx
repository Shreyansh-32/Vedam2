import { Books } from "@/lib/utils";
import Link from "next/link";
import AddtoCart from "./AddtoCart";


export function ProductCard({ item }: { item: Books }) {

  return (
    <div className="w-full">
      <div className="hidden md:p-2 md:pt-4 p-4 bg-amber-50 dark:bg-gray-700 rounded-xl shadow-md md:flex md:flex-col items-center gap-3 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 h-[520px] w-full">
        <Link
          href={`/product/${item.id}`}
          className="flex items-center gap-5 md:flex-col md:items-center md:gap-2 w-full"
        >
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full max-w-[240px] h-[320px] object-cover rounded-md pt-2 sm:pt-0"
          />
          <div className="text-center flex flex-col gap-1">
            <h3 className="text-base font-semibold">{item.title}</h3>
            <h4 className="text-sm">{item.author}</h4>
            <p className="text-xs line-clamp-2">{item.description}</p>
          </div>
        </Link>
        <div className="md:flex md:justify-between md:items-center w-full mt-auto mb-1 lg:mb-2">
          <p className="sm:text-lg font-bold text-amber-600">
            ₹{item.price.toFixed(2)}
          </p>
          <AddtoCart id={item.id} />
        </div>
      </div>
      <div className="md:hidden w-full bg-amber-50 dark:bg-gray-700 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 hover:shadow-md transition duration-300">
        <div className="flex gap-3 px-2 py-3 p-3 sm:p-4">
          <Link
            href={`/product/${item.id}`}
            className="flex-shrink-0"
            tabIndex={-1}
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-[100px] h-[140px] object-cover rounded-md"
            />
          </Link>
          <div className="flex flex-col justify-between w-full">
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2">
                {item.title}
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-1">
                {item.author}
              </p>
              <p className="text-xs line-clamp-2">{item.description}</p>
            </div>
            <div className="mt-2 flex flex-col gap-2">
              <p className="text-base font-bold text-amber-600 dark:text-amber-400">
                ₹{item.price.toFixed(2)}
              </p>
              <AddtoCart id={item.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
