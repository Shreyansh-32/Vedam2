import Link from "next/link";
import AddtoCart from "./AddtoCart";

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

function Card(item: Item) {
  return (
    <div className="md:p-2 md:pt-2 p-4 dark:bg-gray-600 bg-amber-100 rounded-xl shadow-md flex flex-col items-center gap-3 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 h-full">
      <Link href={`/product/${item.id}`} className="flex flex-col items-center gap-2">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full max-w-[160px] h-[220px] object-cover rounded-md pt-2 sm:pt-0 bg-contain"
        />
        <div className="text-center flex flex-col gap-1">
          <h3 className="text-base font-semibold line-clamp-1">{item.title}</h3>
          <h4 className="text-sm line-clamp-1">{item.author}</h4>
        </div>
      </Link>
      <div className="flex justify-between items-center w-full mt-auto">
        <p className="sm:text-lg font-bold text-amber-600">
          ₹{item.price.toFixed(2)}
        </p>
        <AddtoCart id={item.id}></AddtoCart>
      </div>
    </div>
  );
}

export default Card;
