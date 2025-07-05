import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface Books {
    id : number;
    title : string;
    author : string;
    price : number;
    page : number;
    category : string;
    description : string;
    imageUrl : string;
    sellerId : number;
    quantity : number;
}
