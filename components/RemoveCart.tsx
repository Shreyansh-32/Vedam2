"use client";
import axios from "axios";
import { Button } from "./ui/button";
import { useState } from "react";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

export default function RemoveCart({id} : {id : number}) {
    const [loading  , setLoading] = useState(false);
  return (
    <Button disabled={loading} onClick={async (e) => {
          e.stopPropagation();
          setLoading(true);
          try {
            const response = await axios.delete("/api/user/cart", {
              data:{
                productId : id
              }
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
            setLoading(false);
            redirect("/cart");
          }
        }}
        className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-400 hover:to-red-300 text-white font-semibold px-8 py-3 rounded-xl shadow-lg transform hover:scale-105 transition duration-200">Remove from cart</Button>
  )
}
