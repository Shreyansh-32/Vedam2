import Address from "@/components/Address";
import BuyNow from "@/components/BuyNow";
import CartQuantity from "@/components/CartQuantity";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import PleaseSignIn from "@/components/PleaseSignIn";
import RemoveCart from "@/components/RemoveCart";
import { authOptions } from "@/lib/auth/options";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";

export default async function Cart() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "user") {
    return <PleaseSignIn />;
  }

  const cartItems = await prisma.cart.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      product: true,
    },
  });
  const addresses = await prisma.address.findMany({
    where: {
      userId: session.user.id,
    },
  });
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
              Your Cart
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in
              your cart
            </p>
          </div>

          {/* Address Selection */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border border-amber-100 dark:border-gray-700 w-full lg:w-1/4">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              📍 Delivery Address
            </p>
            <div className="min-w-[250px]">
              <Address addresses={addresses} userId={session.user.id} />
            </div>
          </div>
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart State */
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 shadow-lg border border-amber-100 dark:border-gray-700 text-center">
            <div className="text-8xl mb-6">🛒</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Start shopping to add items to your cart
            </p>
            <Link href="/products">
              <button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold px-8 py-3 rounded-xl shadow-lg transform hover:scale-105 transition duration-200">
                Browse Books
              </button>
            </Link>
          </div>
        ) : (
          /* Cart Items */
          <div className="space-y-6">
            {cartItems.map((cart, i) => {
              const inStock = cart.product.quantity > 0;
              return (
                <div
                  key={i}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-amber-100 dark:border-gray-700 hover:shadow-xl transition duration-300"
                >
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Product Image & Info */}
                    <Link
                      href={`/product/${cart.product.id}`}
                      className="flex flex-col sm:flex-row gap-4 flex-1 group"
                    >
                      <div className="relative flex-shrink-0">
                        <div className="absolute -inset-2 bg-gradient-to-r from-amber-400 to-orange-400 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
                        <Image
                          src={cart.product.imageUrl}
                          alt={cart.product.title}
                          height={150}
                          width={120}
                          className="relative rounded-xl object-cover h-[150px] w-[120px] shadow-md group-hover:scale-105 transition duration-300"
                        />
                      </div>

                      <div className="flex-1 space-y-3">
                        <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white group-hover:text-amber-600 transition duration-200">
                          {cart.product.title}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 font-medium text-lg">
                          by {cart.product.author}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed hidden md:block">
                          {cart.product.description.length > 200
                            ? cart.product.description.substring(0, 200) + "..."
                            : cart.product.description}
                        </p>
                        <div className="flex items-center gap-3">
                          <span className="text-2xl lg:text-3xl font-bold text-amber-600 dark:text-amber-400">
                            ₹{cart.product.price.toFixed(2)}
                          </span>
                          <span
                            className={`text-sm ${
                              cart.product.quantity > 0
                                ? " text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900 "
                                : " text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900 "
                            } px-3 py-1 rounded-full font-medium`}
                          >
                            {cart.product.quantity > 0
                              ? "In stock"
                              : "Out of stock"}
                          </span>
                        </div>
                      </div>
                    </Link>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-3 lg:min-w-[160px] lg:items-end">
                      <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-xl">
                        <p className="text-sm text-amber-800 dark:text-amber-200 font-medium mb-2">
                          Quantity
                        </p>
                        <CartQuantity
                          min={1}
                          max={cart.product.quantity}
                          cartQuantity={cart.quantity}
                        />
                      </div>

                      <div className="flex flex-col gap-2 w-full">
                        {inStock && <BuyNow bookId={cart.product.id} />}
                        <RemoveCart id={cart.product.id} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
