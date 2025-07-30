"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EditProduct from "./EditProduct";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import AddProduct from "./add-product/AddProduct";
import { Input } from "./ui/input";

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

function SellerProducts({ sellerId }: { sellerId: number }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(1);
  const [search , setSearch] = useState<string>("");

  useEffect(() => {
    async function main() {
      const prod = await axios.get(
        `/api/seller/product/bulk?sellerId=${sellerId}&page=${page}&search=${search}`
      );
      setBooks(prod.data.products);
    }
    main();
  }, [page, sellerId , search]);

  return (
    <div className="lg:w-[85%] w-full md:w-4/5 min-h-screen p-6 shadow-md rounded-lg mt-6 md:mt-0">
      <div className="w-full flex justify-between p-4">
        <h2 className="text-2xl font-semibold mb-6">Your Products</h2>
        <Dialog>
          <DialogTrigger className="cursor-pointer"><Button className="cursor-pointer">
          <Plus></Plus>Add product
        </Button></DialogTrigger>
          <DialogContent className="overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add product</DialogTitle>
              <div>
                <AddProduct sellerId={sellerId}/>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <div className="my-2">
        <Input placeholder="Search book by title or author" onChange={(e) => {
            setSearch(e.target.value);
        }}/>
      </div>
      <div className="overflow-x-auto">
        <Table className="min-w-full border border-gray-200 dark:border-gray-500 rounded-lg">
          <TableCaption className="text-gray-500 mb-2">
            Showing page {page}
          </TableCaption>
          <TableHeader className="dark:bg-gray-800">
            <TableRow>
              <TableHead className="">Image</TableHead>
              <TableHead className="">Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead className="">Category</TableHead>
              <TableHead className="">Price</TableHead>
              <TableHead className="">Quantity</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {books.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-4 text-gray-500"
                >
                  No products found.
                </TableCell>
              </TableRow>
            ) : (
              books.map((book, i) => (
                <TableRow
                  key={i}
                  className="hover:bg-gray-50 dark:hover:bg-gray-600 transition"
                >
                  <TableCell>
                    <Image
                      src={book.imageUrl}
                      alt={book.title}
                      height={80}
                      width={80}
                      className="rounded object-contain"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.category}</TableCell>
                  <TableCell>₹{book.price}</TableCell>
                  <TableCell>{book.quantity}</TableCell>
                  <TableCell className="text-right text-blue-600 hover:underline cursor-pointer mr-2">
                    <div className="flex p-2 justify-center">
                      <Dialog>
                        <DialogTrigger className="cursor-pointer">
                          Edit
                        </DialogTrigger>
                        <DialogContent className="overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Edit the product</DialogTitle>
                            <div>
                              <EditProduct product={book} />
                            </div>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}

            <TableRow>
              <TableCell className="flex w-full justify-between py-4">
                {page > 1 ? (
                  <button
                    onClick={() => setPage((prev) => prev - 1)}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition text-left"
                  >
                    ← Previous
                  </button>
                ) : (
                  <div />
                )}

                {books.length === 5 && (
                  <button
                    onClick={() => setPage((prev) => prev + 1)}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition text-right"
                  >
                    Next →
                  </button>
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default SellerProducts;
