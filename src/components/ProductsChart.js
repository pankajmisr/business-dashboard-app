import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ProductsChart = ({ topProducts, profitableProducts, formatCurrency }) => {
  const [activeTab, setActiveTab] = useState('revenue');
  
  // Custom tooltip for product charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-300 shadow-md">
          <p className="font-semibold">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.name.includes('Margin') ? `${entry.value}%` : formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700">Product Performance</h2>
        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 rounded text-sm ${
              activeTab === 'revenue' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setActiveTab('revenue')}
          >
            Top by Revenue
          </button>
          <button
            className={`px-3 py-1 rounded text-sm ${
              activeTab === 'profit' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setActiveTab('profit')}
          >
            Top by Profit
          </button>
        </div>
      </div>
      
      <div className="h-72">
        {activeTab === 'revenue' ? (
          // Top products by revenue chart
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={topProducts}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="product_name" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="total_revenue" name="Revenue" fill="#0088FE" />
              <Bar dataKey="total_profit" name="Profit" fill="#00C49F" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          // Most profitable products chart
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={profitableProducts} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="product_name" />
              <YAxis yAxisId="left" orientation="left" stroke="#00C49F" />
              <YAxis yAxisId="right" orientation="right" stroke="#FF8042" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar yAxisId="left" dataKey="total_profit" name="Profit" fill="#00C49F" />
              <Bar yAxisId="right" dataKey="profit_margin_percentage" name="Margin %" fill="#FF8042" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
      
      {/* Key observation about product performance */}
      <div className="mt-4 pt-3 border-t border-gray-200">
        <h3 className="text-sm font-semibold text-gray-600 mb-2">Key Observations</h3>
        <p className="text-sm text-gray-600">
          {activeTab === 'revenue' 
            ? "Highest revenue products don't always yield the highest profits. Review pricing strategy for high revenue but low profit products."
            : "Computer accessories have the highest profit margins. Consider expanding this product category and analyzing its success factors."}
        </p>
      </div>
    </div>
  );
};

export default ProductsChart;