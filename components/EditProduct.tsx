"use client";

import { UploadButton } from "@uploadthing/react";
import axios from "axios";
import Image from "next/image";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Book {
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

export default function EditProduct({ product }: { product: Book | null }) {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(
    product ? product.imageUrl : null
  );

  const title = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLTextAreaElement>(null);
  const price = useRef<HTMLInputElement>(null);
  const pages = useRef<HTMLInputElement>(null);
  const author = useRef<HTMLInputElement>(null);
  const quantity = useRef<HTMLInputElement>(null);
  const [selectedCategory, setSelectedCategory] = useState(product ? product.category : "");

  if (!product) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const productData = {
      title: title.current?.value,
      description: description.current?.value,
      price: parseFloat(price.current?.value || "0"),
      page: parseInt(pages.current?.value || "0", 10),
      author: author.current?.value,
      imageUrl: imageUrl || "",
      quantity: parseInt(quantity.current?.value || "0", 10),
      category: selectedCategory,
      id: product.id,
    };

    if (!productData.imageUrl) {
      toast.error("Please upload an image for the product.");
      return;
    }

    if (
      !productData.title ||
      !productData.description ||
      !productData.price ||
      !productData.page ||
      !productData.author
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (isNaN(productData.price) || isNaN(productData.page)) {
      toast.error("Price and Pages must be valid numbers.");
      return;
    }

    try {
      setLoading(true);
      console.log(productData);
      const res = await axios.put("/api/seller/product", productData);
      if (res.status === 200) {
        toast.success("Product updated successfully!");
        title.current!.value = "";
        description.current!.value = "";
        price.current!.value = "";
        pages.current!.value = "";
        author.current!.value = "";
        quantity.current!.value = "";
        setImageUrl(null);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to Update product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-y-auto w-full flex items-center justify-center px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl shadow-lg rounded-lg p-8 space-y-6"
      >
        <h1 className="text-3xl font-bold text-center">
          Edit Product
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Title"
            defaultValue={product.title}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ref={title}
          />
          <input
            type="text"
            placeholder="Author"
            defaultValue={product.author}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ref={author}
          />
          <input
            type="number"
            placeholder="Price"
            defaultValue={product.price}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ref={price}
          />
          <input
            type="number"
            placeholder="Pages"
            defaultValue={product.page}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ref={pages}
          />
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Hindi-literature">Hindi-literature</SelectItem>
              <SelectItem value="Biography">Biography</SelectItem>
              <SelectItem value="Finance">Finance</SelectItem>
              <SelectItem value="Business">Business</SelectItem>
              <SelectItem value="Fiction">Fiction</SelectItem>
              <SelectItem value="Religious">Religious</SelectItem>
              <SelectItem value="History">History</SelectItem>
              <SelectItem value="Classic">Classic</SelectItem>
            </SelectContent>
          </Select>
          
          <input
            type="number"
            placeholder="Quantity"
            defaultValue={product.quantity}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ref={quantity}
          />
        </div>

        <textarea
          placeholder="Description"
          className="w-full overflow-y-auto p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          ref={description}
          defaultValue={product.description}
        />

        <div className="w-full flex flex-col items-center gap-2">
          {!imageUrl && (
            <UploadButton<OurFileRouter , "imageUploader">
              endpoint="imageUploader"
              onClientUploadComplete={(res: { url: string }[] | undefined) => {
                if (res && res[0]?.url) {
                  setImageUrl(res[0].url);
                }
              }}
              disabled={!!imageUrl}
              className="ut-button bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
            </UploadButton>
          )}

          {imageUrl && (
            <div className="flex flex-col items-center relative">
              <Image
                src={imageUrl}
                alt="Uploaded"
                width={100}
                height={100}
                className="rounded-md"
              />
              <div
                className="absolute top-0.5 cursor-pointer right-2 text-2xl"
                onClick={() => {
                  setImageUrl(null);
                }}
              >
                x
              </div>
              <p className="text-green-600 mt-2">
                Image uploaded successfully!
              </p>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-green-600 text-white py-3 rounded-md text-lg hover:bg-green-700 transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
}
