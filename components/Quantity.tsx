"use client";
import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function Quantity({ min, max }: { min: number; max: number }) {
  const [quantity, setQuantity] = useState<number>(min);

  useEffect(() => {
    localStorage.setItem("quantity", quantity.toString());
  }, [quantity]);

  const increment = () => {
    setQuantity((prev) => {
      const newVal = Math.min(prev + 1, max);
      return newVal;
    });
  };

  const decrement = () => {
    setQuantity((prev) => {
      const newVal = Math.max(prev - 1, min);
      return newVal;
    });
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        type="button"
        variant="outline"
        onClick={decrement}
        disabled={quantity <= min}
        className="border-amber-400 text-amber-600 px-3"
      >
        −
      </Button>

      <Input
        type="number"
        value={quantity}
        min={min}
        max={max}
        step={1}
        readOnly
        className="w-20 text-center border-amber-200 dark:border-gray-600 focus:border-amber-400 focus:ring-amber-400"
        onChange={(e) => {
          setQuantity(parseInt(e.target.value));
          localStorage.setItem("quantity" , e.target.value);
        }}
      />

      <Button
        type="button"
        variant="outline"
        onClick={increment}
        disabled={quantity >= max}
        className="border-amber-400 text-amber-600 px-3"
      >
        +
      </Button>
    </div>
  );
}
