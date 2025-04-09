import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const CategoryDistribution = ({ categoryData, formatCurrency }) => {
  const [activeTab, setActiveTab] = useState('revenue');
  
  // Colors for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  // Format the data for the chart based on active tab
  const getChartData = () => {
    if (activeTab === 'revenue') {
      return categoryData.map(item => ({
        name: item.category,
        value: parseFloat(item.category_revenue)
      }));
    } else {
      return categoryData.map(item => ({
        name: item.category,
        value: parseFloat(item.profit_margin)
      }));
    }
  };

  // Custom label for the pie chart
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius * 0.8;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {name}: {(percent * 100).toFixed(0)}%
      </text>
    );
  };

  // Custom tooltip for the pie chart
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-300 shadow-md">
          <p className="font-semibold">{payload[0].name}</p>
          <p style={{ color: payload[0].color }}>
            {activeTab === 'revenue' 
              ? `Revenue: ${formatCurrency(payload[0].value)}`
              : `Profit Margin: ${payload[0].value}%`
            }
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700">Category Performance</h2>
        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 rounded text-sm ${
              activeTab === 'revenue' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setActiveTab('revenue')}
          >
            Revenue
          </button>
          <button
            className={`px-3 py-1 rounded text-sm ${
              activeTab === 'margin' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setActiveTab('margin')}
          >
            Profit Margin
          </button>
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={getChartData()}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {getChartData().map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      {/* Table with category details */}
      <div className="mt-4 border-t border-gray-200 pt-3">
        <h3 className="text-sm font-semibold text-gray-600 mb-2">Category Details</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left font-medium text-gray-500">Category</th>
                <th className="px-3 py-2 text-right font-medium text-gray-500">Revenue</th>
                <th className="px-3 py-2 text-right font-medium text-gray-500">Margin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {categoryData.map((category, index) => (
                <tr key={index}>
                  <td className="px-3 py-2 whitespace-nowrap">{category.category}</td>
                  <td className="px-3 py-2 text-right">{formatCurrency(category.category_revenue)}</td>
                  <td className={`px-3 py-2 text-right ${parseFloat(category.profit_margin) < 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {category.profit_margin}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CategoryDistribution;