"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function PleaseSignIn() {
  useEffect(() => {
    toast.error("Please sign in to use this feature");
    redirect("/")
  })
    return (
    <div>

    </div>
  )
}
