import AddFeedback from "@/components/AddFeedback";
import CancelOrder from "@/components/CancelOrder";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import PleaseSignIn from "@/components/PleaseSignIn";
import { authOptions } from "@/lib/auth/options";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Image from "next/image";

export default async function Orders() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "user") {
    return <PleaseSignIn />;
  }
  const orders = await prisma.order.findMany({
    where: {
      userId: session.user.id,
    },
    include:{
        product : true,
        address : true
    },
    orderBy: {
      time: 'desc'
    }
  });

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar/>
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">Your Orders</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {orders.length} {orders.length === 1 ? 'order' : 'orders'} found
          </p>
        </div>

        {orders.length === 0 ? (
          /* Empty Orders State */
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 shadow-lg border border-amber-100 dark:border-gray-700 text-center">
            <div className="text-8xl mb-6">📦</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">No orders yet</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">Start shopping to see your orders here</p>
            <button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold px-8 py-3 rounded-xl shadow-lg transform hover:scale-105 transition duration-200">
              Browse Books
            </button>
          </div>
        ) : (
          /* Orders List */
          <div className="space-y-6">
            {orders.map((order, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-amber-100 dark:border-gray-700 hover:shadow-xl transition duration-300 overflow-hidden">
                {/* Order Header */}
                <div className="bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 px-6 py-4 border-b border-amber-200 dark:border-gray-600">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div className="flex items-center gap-3">
                      <div className="bg-amber-500 text-white p-2 rounded-full">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">Order #{order.id}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Placed on {order.time.toDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium">
                        {order.status.charAt(0).toUpperCase()+order.status.slice(1)}
                      </span>
                      <span className="text-lg font-bold text-amber-600 dark:text-amber-400">
                        ₹{order.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Order Content */}
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Product Info */}
                    <div className="lg:col-span-8">
                      <div className="flex flex-col sm:flex-row gap-4">
                        {/* Product Image */}
                        <div className="relative flex-shrink-0">
                          <div className="absolute -inset-2 bg-gradient-to-r from-amber-400 to-orange-400 rounded-2xl blur opacity-20"></div>
                          <Image 
                            src={order.product.imageUrl} 
                            alt={order.product.title} 
                            height={120} 
                            width={90} 
                            className="relative rounded-xl object-cover h-[120px] w-[90px] shadow-md"
                          />
                        </div>
                        
                        {/* Product Details */}
                        <div className="flex-1 space-y-3">
                          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                            {order.product.title}
                          </h2>
                          <p className="text-gray-600 dark:text-gray-400 font-medium">
                            by {order.product.author}
                          </p>
                          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed hidden md:block">
                            {order.product.description.length > 150 
                              ? order.product.description.substring(0, 150) + "..."
                              : order.product.description
                            }
                          </p>
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              Quantity: <span className="font-semibold text-amber-600 dark:text-amber-400">{order.quantity}</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Delivery Address */}
                      <div className="mt-6 bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                          <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                          </svg>
                          Delivery Address
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          {order.address.houseNo}, {order.address.street}, {order.address.area}, {order.address.city}, {order.address.pincode}, {order.address.state}
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="lg:col-span-4">
                      <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 space-y-3">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Order Actions</h4>
                        <div className="space-y-2">
                          <AddFeedback userId={session.user.id} productId={order.productId}/>
                          <CancelOrder productId={order.productId} quantity={order.quantity} id={order.id}/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <Footer/>
    </div>
  );
}