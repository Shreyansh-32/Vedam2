import { authCheck } from "@/lib/authCheck";
import { getOrdersByProduct, getRatings, getRevenue, getStatus } from "@/lib/getRevenue";
import { redirect } from "next/navigation";
import Chart from "./Chart";
import MyPieChart from "./PieChart";

export default async function Dashboard() {
  const session = await authCheck();
  if (!session || session.user.role !== "seller") {
    redirect("/seller/signin");
  }

  const sellerId = session.user.id;
  const revenue = await getRevenue(sellerId);
  const orders = await getOrdersByProduct(sellerId);
  const status = await getStatus(sellerId);
  const ratings = await getRatings(sellerId);

  return (
    <main className="w-full min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-6 md:px-10">
      <section className="max-w-7xl mx-auto space-y-8">
        {/* Dashboard Header */}
        <header>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
            Seller Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Overview of your performance, orders, and analytics.
          </p>
        </header>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card title="Total Revenue" value={`₹ ${revenue._sum.price ?? 0}`} />
          <Card title="Total Orders" value={revenue._count.id ?? 0} />
          <Card title="Products Sold" value={revenue._sum.quantity ?? 0} />
        </div>

        {/* Chart Section */}
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Sales by Product
          </h2>
          <Chart orders={orders} />
        </section>

        {/* Analytics Section */}
        <section className="grid grid-cols-1 md:grid-cols-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Order Status Distribution
            </h2>
            <MyPieChart status={status} ratings={ratings} />
          </div>
        </section>
      </section>
    </main>
  );
}

// Small reusable card component
function Card({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">{title}</h3>
      <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
    </div>
  );
}
