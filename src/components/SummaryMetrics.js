import React from 'react';

const SummaryMetrics = ({ totalRevenue, totalProfit, profitMargin, formatCurrency }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Total Revenue</h2>
        <p className="text-3xl font-bold text-blue-600">{formatCurrency(totalRevenue)}</p>
      </div>
      
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Total Profit</h2>
        <p className={`text-3xl font-bold ${totalProfit < 0 ? 'text-red-600' : 'text-green-600'}`}>
          {formatCurrency(totalProfit)}
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Overall Profit Margin</h2>
        <p className={`text-3xl font-bold ${profitMargin < 0 ? 'text-red-600' : 'text-green-600'}`}>
          {profitMargin}%
        </p>
      </div>
    </div>
  );
};

export default SummaryMetrics;