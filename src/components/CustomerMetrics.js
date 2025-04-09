import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CustomerMetrics = ({ customerData, customerMetrics, formatCurrency }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Customer Acquisition & Metrics</h2>
      
      {/* Customer metrics summary */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-blue-50 p-3 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500">Total Customers</h3>
          <p className="text-2xl font-bold text-blue-600">{customerMetrics?.total_customers || 0}</p>
        </div>
        <div className="bg-green-50 p-3 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500">Avg. Revenue per Customer</h3>
          <p className="text-2xl font-bold text-green-600">
            {formatCurrency(customerMetrics?.average_revenue_per_customer || 0)}
          </p>
        </div>
      </div>
      
      {/* Customer acquisition chart */}
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={customerData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip 
              formatter={(value) => [`${value} customers`, 'New Customers']}
              labelFormatter={(label) => `Month: ${label}`}
            />
            <Legend />
            <Bar dataKey="new_customers" name="New Customers" fill="#00C49F" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {/* Additional insights */}
      <div className="mt-4 pt-3 border-t border-gray-200">
        <h3 className="text-sm font-semibold text-gray-600 mb-2">Customer Insights</h3>
        <ul className="text-sm text-gray-600">
          <li className="flex items-start mb-1">
            <span className="text-blue-500 mr-2">•</span>
            <span>Most customer acquisitions occurred in {findPeakMonth(customerData)}</span>
          </li>
          <li className="flex items-start mb-1">
            <span className="text-blue-500 mr-2">•</span>
            <span>Average acquisition rate: {calculateAverageAcquisition(customerData)} customers/month</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

// Helper function to find the month with highest customer acquisition
const findPeakMonth = (customerData) => {
  if (!customerData || customerData.length === 0) return 'N/A';
  
  let peakMonth = customerData[0];
  customerData.forEach(item => {
    if (item.new_customers > peakMonth.new_customers) {
      peakMonth = item;
    }
  });
  
  return peakMonth.month;
};

// Helper function to calculate average monthly acquisition
const calculateAverageAcquisition = (customerData) => {
  if (!customerData || customerData.length === 0) return 0;
  
  const totalCustomers = customerData.reduce((sum, item) => sum + item.new_customers, 0);
  return (totalCustomers / customerData.length).toFixed(1);
};

export default CustomerMetrics;