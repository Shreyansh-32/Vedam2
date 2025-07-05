"use client";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function AddtoCart({id} : {id:number}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <div>
      <button
        onClick={async (e) => {
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
        }}
        className={`w-fit md:hidden bg-white dark:bg-gray-800 border border-amber-600 text-amber-600 dark:text-amber-400 px-3 py-1 text-xs rounded-full hover:bg-amber-600 dark:hover:bg-amber-600 cursor-pointer hover:text-white dark:hover:text-white transition-all duration-300 ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isLoading}
      >
        {isLoading ? "Adding..." : "Add to cart"}
      </button>
       <button
            className={`bg-background hidden md:block p-1 sm:px-2 py-1 rounded-full text-sm font-medium border border-amber-600 hover:bg-amber-600 hover:text-white transition duration-300 cursor-pointer ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
            onClick={async () => {
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
                    toast.error(
                      "You need to log in to add items to your cart."
                    );
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
            }}
          >
            {isLoading ? "Adding..." : "Add to cart"}
          </button>
    </div>
  );
}
