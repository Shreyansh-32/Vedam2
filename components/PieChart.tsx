"use client";

import { Pie, PieChart, ResponsiveContainer, Cell, Tooltip } from 'recharts';
import { useState } from 'react';

interface ChartData {
  name: string;
  value: number;
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
    payload: ChartData;
  }>;
}

export default function MyPieChart({
  status,
  ratings
}: {
  ratings: ChartData[];
  status: ChartData[];
}) {
  const [activeChart, setActiveChart] = useState<'status' | 'ratings'>('status');

  // Color palettes for different charts
  const statusColors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
  const ratingsColors = ['#06B6D4', '#84CC16', '#F97316', '#EC4899', '#6366F1'];

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }: TooltipProps) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg">
          <p className="text-gray-800 dark:text-gray-200 font-medium">{data.name}</p>
          <p className="text-blue-600 dark:text-blue-400">
            Value: {data.value}
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom label function for pie slices
  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent } : {cx : number , cy : number , midAngle : number , innerRadius : number , outerRadius : number , percent : number}) => {
    if (percent < 0.05) return null; // Don't show labels for slices less than 5%
    
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize={12}
        fontWeight="600"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="w-full">
      {/* Desktop Layout - Two Charts Side by Side */}
      <div className="hidden md:flex gap-5">
        {/* Status Chart */}
        <div className="w-1/2 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 bg-white dark:bg-gray-800">
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">Order Status</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Distribution of order statuses</p>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={status}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomLabel}
                  outerRadius={100}
                  innerRadius={50}
                  paddingAngle={2}
                  animationBegin={0}
                  animationDuration={800}
                >
                  {status.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={statusColors[index % statusColors.length]}
                      stroke="rgba(255,255,255,0.6)"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          {/* Custom Legend for Status */}
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            {status.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-2 text-sm">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: statusColors[index % statusColors.length] }}
                ></div>
                <span className="text-gray-600 dark:text-gray-300">{entry.name}</span>
                <span className="text-gray-800 dark:text-gray-100 font-medium">({entry.value})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Ratings Chart */}
        <div className="w-1/2 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 bg-white dark:bg-gray-800">
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">Product Ratings</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Distribution of product ratings</p>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ratings}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomLabel}
                  outerRadius={100}
                  innerRadius={50}
                  paddingAngle={2}
                  animationBegin={400}
                  animationDuration={800}
                >
                  {ratings.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={ratingsColors[index % ratingsColors.length]}
                      stroke="rgba(255,255,255,0.6)"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          {/* Custom Legend for Ratings */}
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            {ratings.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-2 text-sm">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: ratingsColors[index % ratingsColors.length] }}
                ></div>
                <span className="text-gray-600 dark:text-gray-300">{entry.name}</span>
                <span className="text-gray-800 dark:text-gray-100 font-medium">({entry.value})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Layout - Single Chart with Toggle */}
      <div className="md:hidden">
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 bg-white dark:bg-gray-800">
          {/* Toggle buttons */}
          <div className="mb-6 flex gap-2 justify-center">
            <button
              onClick={() => setActiveChart('status')}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                activeChart === 'status'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Order Status
            </button>
            <button
              onClick={() => setActiveChart('ratings')}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                activeChart === 'ratings'
                  ? 'bg-cyan-500 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Product Ratings
            </button>
          </div>

          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
              {activeChart === 'status' ? 'Order Status' : 'Product Ratings'}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {activeChart === 'status' 
                ? 'Distribution of order statuses' 
                : 'Distribution of product ratings'
              }
            </p>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={activeChart === 'status' ? status : ratings}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomLabel}
                  outerRadius={90}
                  innerRadius={45}
                  paddingAngle={2}
                  animationBegin={0}
                  animationDuration={600}
                >
                  {(activeChart === 'status' ? status : ratings).map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={activeChart === 'status' 
                        ? statusColors[index % statusColors.length]
                        : ratingsColors[index % ratingsColors.length]
                      }
                      stroke="rgba(255,255,255,0.6)"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          {/* Mobile Legend */}
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {(activeChart === 'status' ? status : ratings).map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-2 text-sm">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ 
                    backgroundColor: activeChart === 'status' 
                      ? statusColors[index % statusColors.length]
                      : ratingsColors[index % ratingsColors.length]
                  }}
                ></div>
                <span className="text-gray-600 dark:text-gray-300">{entry.name}</span>
                <span className="text-gray-800 dark:text-gray-100 font-medium">({entry.value})</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}