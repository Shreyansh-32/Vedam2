"use client";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";

const Chart = ({
  orders,
}: {
  orders: {
    category: string;
    quantity: number;
    price: number;
  }[];
}) => {
  const [activeChart, setActiveChart] = useState<'price' | 'quantity'>('price');

  // Custom tooltip component with proper TypeScript types
  interface TooltipProps {
    active?: boolean;
    payload?: Array<{
      value: number;
      dataKey: string;
      color: string;
    }>;
    label?: string;
  }

  const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg">
          <p className="text-gray-800 dark:text-gray-200 font-medium">{`${label}`}</p>
          <p className="text-blue-600 dark:text-blue-400">
            {`${activeChart === 'price' ? 'Price' : 'Quantity'}: ${payload[0].value}`}
          </p>
        </div>
      );
    }
    return null;
  };

   

  // Custom tick formatter for mobile to handle long category names
  const formatTick = (value: string) => {
    if (value.length > 8) {
      return value.substring(0, 6) + '...';
    }
    return value;
  };

  return (
    <div className="w-full">
      {/* Desktop Layout - Two Charts Side by Side */}
      <div className="hidden md:flex gap-5">
        {/* Price Chart */}
        <div className="w-1/2 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 bg-white dark:bg-gray-800">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Price Analysis</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={orders}
                margin={{
                  top: 20,
                  right: 20,
                  left: 20,
                  bottom: 20,
                }}
              >
                <defs>
                  <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.9}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.6}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="category" 
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                  axisLine={{ stroke: '#D1D5DB' }}
                />
                <YAxis 
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                  axisLine={{ stroke: '#D1D5DB' }}
                />
                
                <Bar
                  dataKey="price"
                  fill="url(#priceGradient)"
                  radius={[4, 4, 0, 0]}
                  activeBar={<Rectangle fill="#1D4ED8" stroke="#1E40AF" strokeWidth={2} />}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quantity Chart */}
        <div className="w-1/2 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 bg-white dark:bg-gray-800">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Quantity Analysis</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={orders}
                margin={{
                  top: 20,
                  right: 20,
                  left: 20,
                  bottom: 20,
                }}
              >
                <defs>
                  <linearGradient id="quantityGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.9}/>
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.6}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="category" 
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                  axisLine={{ stroke: '#D1D5DB' }}
                />
                <YAxis 
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                  axisLine={{ stroke: '#D1D5DB' }}
                />
                <Bar
                  dataKey="quantity"
                  fill="url(#quantityGradient)"
                  radius={[4, 4, 0, 0]}
                  activeBar={<Rectangle fill="#7C3AED" stroke="#6D28D9" strokeWidth={2} />}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Mobile Layout - Single Chart with Toggle */}
      <div className="md:hidden">
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 bg-white dark:bg-gray-800">
          {/* Toggle buttons */}
          <div className="mb-4 flex gap-2">
            <button
              onClick={() => setActiveChart('price')}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                activeChart === 'price'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Price
            </button>
            <button
              onClick={() => setActiveChart('quantity')}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                activeChart === 'quantity'
                  ? 'bg-purple-500 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Quantity
            </button>
          </div>

          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
            {activeChart === 'price' ? 'Price Analysis' : 'Quantity Analysis'}
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={orders}
                margin={{
                  top: 20,
                  right: 15,
                  left: 15,
                  bottom: 60, // Increased to accommodate rotated labels
                }}
              >
                <defs>
                  <linearGradient id={`${activeChart}GradientMobile`} x1="0" y1="0" x2="0" y2="1">
                    <stop 
                      offset="5%" 
                      stopColor={activeChart === 'price' ? '#3B82F6' : '#8B5CF6'} 
                      stopOpacity={0.9}
                    />
                    <stop 
                      offset="95%" 
                      stopColor={activeChart === 'price' ? '#3B82F6' : '#8B5CF6'} 
                      stopOpacity={0.6}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="category" 
                  tick={{ fill: '#6B7280', fontSize: 10 }}
                  axisLine={{ stroke: '#D1D5DB' }}
                  tickFormatter={formatTick}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  interval={0}
                />
                <YAxis 
                  tick={{ fill: '#6B7280', fontSize: 10 }}
                  axisLine={{ stroke: '#D1D5DB' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey={activeChart}
                  fill={`url(#${activeChart}GradientMobile)`}
                  radius={[4, 4, 0, 0]}
                  activeBar={
                    <Rectangle 
                      fill={activeChart === 'price' ? '#1D4ED8' : '#7C3AED'} 
                      stroke={activeChart === 'price' ? '#1E40AF' : '#6D28D9'} 
                      strokeWidth={2} 
                    />
                  }
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chart;