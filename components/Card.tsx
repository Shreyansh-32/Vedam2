"use client";

import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";

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
    <div className="p-1 sm:p-4 bg-amber-100 rounded-xl shadow-md flex flex-col items-center gap-3 text-black hover:shadow-xl hover:scale-[1.02] transition-all duration-300 h-full">
      <Link href={`/product/${item.id}`} className="flex flex-col items-center gap-2">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full max-w-[160px] h-[220px] object-cover rounded-md pt-2 sm:pt-0"
        />
        <div className="text-center flex flex-col gap-1">
          <h3 className="text-base font-semibold line-clamp-1">{item.title}</h3>
          <h4 className="text-sm text-zinc-700 line-clamp-1">{item.author}</h4>
        </div>
      </Link>
      <div className="flex justify-between items-center w-full mt-auto">
        <p className="sm:text-lg font-bold text-amber-600">
          ₹{item.price.toFixed(2)}
        </p>
        <button
          className="bg-white p-1 sm:px-3 py-1 rounded-full text-sm font-medium border border-amber-600 hover:bg-amber-600 hover:text-white transition duration-300 cursor-pointer"
          onClick={async () => {
            try {
              const response = await axios.post("/api/user/cart", {
                productId: item.id,
                quantity: 1,
              });
              if (response.status === 200) {
                toast.success(response.data.message);
              }
            } catch (err) {
              toast.error(err.message || "Failed to add to cart");
            }
          }}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default Card;
