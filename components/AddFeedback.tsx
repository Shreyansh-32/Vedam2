"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";


export default function AddFeedback({userId , productId} : {userId : number | undefined , productId : number}) {
  const [rating, setRating] = useState(0);
  const [feedback , setFeedback] = useState<string>("");
  const [loading , setLoading] = useState(false);
  const router = useRouter();

  return (
    <div>
      <Dialog>
        <DialogTrigger className="">
          <Button className="border-2 w-full border-amber-500 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 font-semibold px-3 py-2 md:px-6 md:py-3 rounded-xl transition duration-200">Write Review</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a feedback</DialogTitle>
            <DialogDescription>
              Write a customer review for this product.
            </DialogDescription>
          </DialogHeader>
          <Label>Ratings</Label>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="cursor-pointer">
                <div
                  onClick={() => {
                    setRating(i + 1);
                  }}
                  className={`flex text-2xl ${
                    rating >= i + 1 ? "text-amber-300" : "text-gray-600"
                  }`}
                >
                  ★
                </div>
              </div>
            ))}
          </div>
          <Label>Feedback</Label>
          <Textarea onChange={(e) => {
            setFeedback(e.target.value);
          }} placeholder="Write your feedback here" />
          <div className="w-full flex justify-center">
            <Button onClick={async() => {
              setLoading(true);
              try{
                if(userId === undefined){
                  toast.error("Please log in to write a review");
                  return;
                }
                const res = await axios.post("/api/user/feedback" , {
                  userId,
                  productId,
                  feedback,
                  rating
                });
                if(res.status === 200){
                  toast.success("Feedback added successfully");
                  router.push(`/product/${productId}`)
                }
              }
              catch(err){
                toast.error("There was some issue in adding the review");
                console.error(err);
              }
              finally{
                setLoading(false);
              }
            }} disabled={loading} className={`bg-gradient-to-r from-amber-500 to-orange-500 dark:text-white hover:from-amber-600 hover:to-orange-600 transition duration-200 cursor-pointer ${loading ? "opacity-50 cursor-not-allowed" : " "}`}>Submit</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
