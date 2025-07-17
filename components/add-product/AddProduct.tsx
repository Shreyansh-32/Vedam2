"use client";

import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const AddProduct = ({sellerId} : {sellerId : number}) => {

    const [loading , setLoading] = useState(false);    

    const title = useRef(null);
    const description = useRef(null);
    const price = useRef(null);
    const pages = useRef(null);
    const author = useRef(null);
    const [imageUrl , setImageUrl] = useState<string | null>(null);
    const quantity = useRef(null);
    const category = useRef(null);
    

  return (
    <div className="flex h-[100vh] w-full items-center justify-center">
        <form onSubmit={async(e) => {
            e.preventDefault();

            const productData = {
                title: title.current?.value,
                description: description.current?.value,
                price: parseFloat(price.current?.value || "0"),
                page: parseInt(pages.current?.value || "0", 10),
                author: author.current?.value,
                imageUrl: imageUrl || "",
                quantity: parseInt(quantity.current?.value || "0", 10),
                category: category.current?.value,
                sellerId : sellerId || null
            };

            if(!productData.imageUrl){
                toast.error("Please upload an image for the product.");
                return;
            }
            if(!productData.title || !productData.description || !productData.price || !productData.page || !productData.author){
                toast.error("Please fill in all fields.");
                return;
            }
            if(isNaN(productData.price) || isNaN(productData.page)){
                toast.error("Price and Pages must be valid numbers.");
                return;
            }

            try {
                setLoading(true);
                const res = await axios.post("/api/seller/product", productData);

                if(res.status === 200) {
                    toast.success("Product added successfully!");
                    title.current.value = "";
                    description.current.value = "";
                    price.current.value = "";
                    pages.current.value = "";
                    author.current.value = "";
                    setImageUrl(null);
                    quantity.current.value = "";
                    category.current.value = "";
                }
            } catch (error) {
                console.error("Error adding product:", error);
                toast.error("Failed to add product. Please try again.");
                
            }
            finally{
                setLoading(false);
            }


        }} className="flex flex-col items-center gap-4">

            <h1 className="text-2xl font-bold">Add Product</h1>
            <input
                type="text"
                placeholder="Title"
                className="p-2 border rounded"
                ref={title}
            />
            <input
                type="text"
                placeholder="Description"
                className="p-2 border rounded"
                ref={description}
            />
            <input
                type="number"
                placeholder="Price"
                className="p-2 border rounded"
                ref={price}
            />
            <input
                type="number"
                placeholder="Pages"
                className="p-2 border rounded"
                ref={pages}
            />
            <input
                type="text"
                placeholder="Author"
                className="p-2 border rounded"
                ref={author}
            />
            <input
                type="text"
                placeholder="Category"
                className="p-2 border rounded"
                ref={category}
            />
            <input
                type="number"
                placeholder="Quantity"
                className="p-2 border rounded"
                ref={quantity}
            />
            {!imageUrl && <UploadButton<OurFileRouter>
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                  if (res && res[0]?.url) {
                      setImageUrl(res[0].url);
                      console.log(imageUrl);
                  }
              }}
              disabled={imageUrl}
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors duration-300"
            >
              Upload Image
            </UploadButton>}
            {imageUrl && (
                <div className="flex flex-col items-center">
                    <h3 className="text-green-500">Image uploaded successfully!</h3>
                    <img src={imageUrl} alt="Uploaded image" width={100} height={100} className="rounded-md w-24"/>
                </div>
            )}
            <button type="submit" className={`bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors duration-300 ${loading ? " opacity-50 cursor-not-allowed" : " cursor-pointer"}`} disabled={loading}>
              Add Product
            </button>

        </form>
    </div>
  );
};

export default AddProduct;
