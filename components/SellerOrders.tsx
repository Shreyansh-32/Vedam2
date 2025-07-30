"use client";

import axios from "axios";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";

export default function SellerOrders({ sellerId }: { sellerId: number }) {
  const [orders, setOrders] = useState<
    ({
      address: {
        area: string;
        id: number;
        userId: number;
        houseNo: string;
        street: string;
        city: string;
        state: string;
        pincode: number;
      };
      product: {
        sellerId: number;
        page: number;
        title: string;
        author: string;
        category: string;
        price: number;
        quantity: number;
        id: number;
        description: string;
        imageUrl: string;
      };
    } & {
      time: Date;
      price: number;
      quantity: number;
      id: number;
      status: string;
      productId: number;
      userId: number;
      addressId: number;
    })[]
  >([]);
  const [page, setPage] = useState(1);
  const [loading , setLoading] = useState(false);
  useEffect(() => {
    async function main() {
      const prod = await axios.get(`/api/seller/orders?sellerId=${sellerId}&page=${page}`);
      setOrders(prod.data.orders);
    }
    main();
  }, [page, sellerId , loading]);

  return (
    <div className="lg:w-[85%] w-full md:w-4/5 min-h-screen p-6 shadow-md rounded-lg mt-10 md:mt-0">
      <h2 className="text-2xl font-semibold mb-6">Your Orders</h2>
      <div className="overflow-x-auto">
        <Table className="min-w-full border border-gray-200 dark:border-gray-500 rounded-lg">
          <TableCaption className="text-gray-500 mb-2">
            Showing page {page}
          </TableCaption>
          <TableHeader className="dark:bg-gray-800">
            <TableRow>
              <TableHead className="">Id</TableHead>
              <TableHead className="">Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead className="">Address</TableHead>
              <TableHead className="">Price</TableHead>
              <TableHead className="">Quantity</TableHead>
              <TableHead className="">Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-4 text-gray-500"
                >
                  No products found.
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order, i) => (
                <TableRow
                  key={i}
                  className="hover:bg-gray-50 dark:hover:bg-gray-600 transition"
                >
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.product.title}</TableCell>
                  <TableCell>{order.product.author}</TableCell>
                  <TableCell>
                    {order.address.houseNo}, {order.address.street},{" "}
                    {order.address.area}
                  </TableCell>
                  <TableCell>₹{order.price}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell className="text-right hover:underline cursor-pointer mr-2">
                    <Select
                      disabled={loading}
                      value={order.status}
                      onValueChange={async(e) => {
                        setLoading(true);
                        try {
                          const res = await axios.put(`/api/seller/orders?status=${e}&id=${order.id}`);

                          if(res.status===200){
                            toast.success("Order status updated successfully");

                          }
                        } catch (error) {
                          toast.error("Something went worng");
                          console.error(error);
                        }finally{
                          setLoading(false);
                        }
                      }}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="placed">Placed</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
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

                {orders.length === 5 && (
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
