import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { authOptions } from "@/lib/auth/options";
import { getBookById } from "@/lib/getBooks";
import { getAvgFeedbacks, getFeedbacks } from "@/lib/getFeedbacks";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { AddToCartLg } from "@/components/AddToCartLg";
import BuyNow from "@/components/BuyNow";
import Quantity from "@/components/Quantity";
import AddFeedback from "@/components/AddFeedback";
import Address from "@/components/Address";
import Image from "next/image";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const awaitedParams = await params;
  const id = awaitedParams.id;
  const session = await getServerSession(authOptions);
  const bookId = parseInt(id);
  const book = await getBookById(bookId);
  const addresses = session
    ? await prisma.address.findMany({
        where: { userId: session.user.id },
      })
    : [];
  const feedbacks = await getFeedbacks(bookId);
  const ratings = await getAvgFeedbacks(bookId);

  if (!book) {
    return (
      <div className="w-full min-h-[100vh] flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            Book Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            The book you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
      </div>
    );
  }

  const inStock = book.quantity > 0;

  return (
    <div className="w-full min-h-[100vh] flex flex-col bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />

      <div className="flex-1 px-4 py-8">
        {/* Main Product Section */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 mb-16">
            {/* Book Image Section - Takes up more space on large screens */}
            <div className="xl:col-span-5 flex justify-center xl:justify-start">
              <div className="relative group max-w-md w-full">
                <div className="absolute -inset-4 bg-gradient-to-r from-amber-400 to-orange-400 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl">
                  <Image
                    src={book.imageUrl}
                    alt={book.title}
                    height={100}
                    width={100}
                    className="w-full h-auto max-h-[500px] object-contain rounded-xl transform group-hover:scale-105 transition duration-300"
                  />
                </div>
                {/* Additional Info Cards */}
                <div className={`absolute -right-4 top-4 ${inStock ? "bg-green-500" : "bg-red-500"} text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg`}>
                  {inStock ? "In stock" : "Out of stock"}
                </div>
              </div>
            </div>

            {/* Book Info Section - Takes up remaining space */}
            <div className="xl:col-span-7 flex flex-col justify-start space-y-6">
              <div className="space-y-4">
                <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                  {book.title}
                </h1>
                <p className="text-xl text-gray-700 dark:text-gray-300">
                  by{" "}
                  <span className="font-semibold text-amber-600 dark:text-amber-400">
                    {book.author}
                  </span>
                </p>
                <div className="flex items-center space-x-4">
                  <span className="text-3xl font-bold text-amber-600 dark:text-amber-400">
                    ₹{book.price.toFixed(2)}
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`${
                            (ratings._avg.rating ?? 0) >= i + 1
                              ? "text-amber-400"
                              : "text-gray-600"
                          } text-lg`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">
                      ({feedbacks.length} reviews)
                    </span>
                  </div>
                </div>
              </div>

              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                  {book.description}
                </p>
              </div>

              {/* Purchase Options */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-amber-100 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Purchase Options
                    </h3>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-4">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[70px]">
                        Quantity:
                      </label>
                      <Quantity min={1} max={book.quantity} />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-3">
                      {inStock && <BuyNow bookId={book.id}/>}
                      <AddToCartLg id={book.id} />
                      {/* <AddtoCart id={book.id} /> */}
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Delivery
                    </h3>

                    {/* Address Dropdown */}
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                        Address:
                      </label>
                      <Address addresses={addresses} userId={session?.user.id}/>
                    </div>

                    {/* Delivery Info */}
                    <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg">
                      <p className="text-sm text-amber-800 dark:text-amber-200 font-medium">
                        📦 Free delivery on orders over ₹500
                      </p>
                      <p className="text-xs text-amber-600 dark:text-amber-300">
                        Expected delivery: 2-3 business days
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Add Feedback Button */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-amber-100 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Share Your Experience
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Help other readers by sharing your thoughts
                    </p>
                  </div>
                  <AddFeedback userId={session?.user.id} productId={book.id} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Feedback Section - Full Width */}
        <div className="max-w-7xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-amber-100 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Customer Reviews
            </h3>
            {feedbacks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {feedbacks.map((fb) => (
                  <div
                    key={fb.id}
                    className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6 border-l-4 border-amber-400 transform hover:scale-105 transition duration-200"
                  >
                    <div className="flex items-center mb-3">
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`${
                              (ratings._avg.rating ?? 0) >= i+1
                                ? "text-amber-400"
                                : "text-gray-600"
                            } text-lg`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-800 dark:text-gray-200 leading-relaxed mb-4">
                      {fb.feedback}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                      {fb.time.toDateString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📚</div>
                <p className="text-gray-500 dark:text-gray-400 mb-2 text-lg">
                  No reviews yet
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-500">
                  Be the first to share your thoughts!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
