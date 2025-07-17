"use client";

import { useEffect } from "react";

export default function ClientSideCleanup() {
  useEffect(() => {
    localStorage.removeItem("bookId");
    localStorage.removeItem("quantity");
    localStorage.removeItem("addressId");
  }, []);

  return null;
}
