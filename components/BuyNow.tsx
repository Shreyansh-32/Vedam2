"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import {loadStripe} from '@stripe/stripe-js';
import {EmbeddedCheckoutProvider , EmbeddedCheckout} from "@stripe/react-stripe-js"
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";
import { useCallback } from "react";

export default function BuyNow({ bookId }: { bookId: number }) {
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  const fetchClientSecret = useCallback(async() => {
    try {
      const qty = parseInt(localStorage.getItem("quantity") || "1");
      const address = localStorage.getItem("addressId");
      console.log(address);
      if(address === null){
        toast.error("Please select an address");
        throw new Error("Address not selected");
      }
      const addressId = parseInt(address);
      const response = await axios.post("/api/payment" , {
        id:bookId,
        quantity : qty,
        addressId
      });
      if(response.status !== 200){
        toast.error("Something went wrong");
        throw new Error("Something went wrong");
      }
      return response.data.client_secret;
    } catch (error) {
      toast.error("Something went wrong");
      throw error;
    }
  } , [bookId]);
  const options = {fetchClientSecret};
  return (
    <Dialog>
      <DialogTrigger>
        <Button
          className="bg-gradient-to-r w-full from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold px-8 py-3 rounded-xl shadow-lg transform hover:scale-105 transition duration-200"
          onClick={() => {
            localStorage.setItem("bookId" , bookId.toString());
          }}
        >
          Buy Now
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-y-auto flex flex-col gap-4">
        <DialogHeader>
          <DialogTitle><Image
                  src={"/Logo.png"}
                  alt="Logo"
                  height={80}
                  width={80}
                  className="w-16 h-10"
                /></DialogTitle>
          
        </DialogHeader>
        <EmbeddedCheckoutProvider options={options} stripe={stripePromise}>
          <EmbeddedCheckout className="max-h-[80dvh]" />
        </EmbeddedCheckoutProvider>
      </DialogContent>
    </Dialog>
  );
}
