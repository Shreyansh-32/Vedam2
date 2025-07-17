"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";
import toast from "react-hot-toast";

export const AddToCartLg = ({id} : {id : number}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <Button disabled={isLoading} onClick={async (e) => {
          e.stopPropagation();
          setIsLoading(true);
          try {
            const response = await axios.post("/api/user/cart", {
              productId: id,
              quantity: 1,
            });
            if (response.status === 200) {
              toast.success(response.data.message);
            }
          } catch (err) {
            console.error(err);
            if (axios.isAxiosError(err)) {
              if (err.response?.status === 401) {
                toast.error("You need to log in to add items to your cart.");
              } else {
                toast.error(
                  err.response?.data?.message || "Something went wrong."
                );
              }
            } else {
              toast.error("An unexpected error occurred.");
            }
          } finally {
            setIsLoading(false);
          }
        }} className="bg-gradient-to-r from-amber-300 to-orange-300 hover:from-amber-400 hover:to-orange-400 text-white font-semibold px-8 py-3 rounded-xl shadow-lg transform hover:scale-105 transition duration-200">
        Add to cart
    </Button>
  )
}
