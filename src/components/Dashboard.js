import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Import dashboard components
import SummaryMetrics from './SummaryMetrics';
import ProductsChart from './ProductsChart';
import MonthlySalesChart from './MonthlySalesChart';
import CategoryDistribution from './CategoryDistribution';
import CustomerMetrics from './CustomerMetrics';
import KeyInsights from './KeyInsights';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const Dashboard = () => {
  // State variables for all the dashboard data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState({
    metrics: null,
    profit: null,
    topProducts: [],
    profitableProducts: [],
    monthlySales: [],
    categories: [],
    customerAcquisition: [],
    customerMetrics: null
  });

  // Fetch all data for the dashboard
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // Fetch data in parallel using Promise.all
        const [
          revenueRes,
          profitRes,
          topProductsRes,
          profitableProductsRes,
          monthlySalesRes,
          categoriesRes,
          customerAcquisitionRes,
          customerMetricsRes
        ] = await Promise.all([
          axios.get(`${API_BASE_URL}/dashboard/revenue`),
          axios.get(`${API_BASE_URL}/dashboard/profit`),
          axios.get(`${API_BASE_URL}/dashboard/top-products`),
          axios.get(`${API_BASE_URL}/dashboard/profitable-products`),
          axios.get(`${API_BASE_URL}/dashboard/monthly-sales`),
          axios.get(`${API_BASE_URL}/dashboard/category-performance`),
          axios.get(`${API_BASE_URL}/dashboard/customer-acquisition`),
          axios.get(`${API_BASE_URL}/dashboard/customer-metrics`)
        ]);

        // Update dashboard data state
        setDashboardData({
          metrics: revenueRes.data,
          profit: profitRes.data,
          topProducts: topProductsRes.data,
          profitableProducts: profitableProductsRes.data,
          monthlySales: monthlySalesRes.data.map(item => ({
            ...item,
            month: getMonthName(parseInt(item.month))
          })),
          categories: categoriesRes.data,
          customerAcquisition: customerAcquisitionRes.data.map(item => ({
            ...item,
            month: new Date(item.month).toLocaleDateString('en-US', { month: 'short' })
          })),
          customerMetrics: customerMetricsRes.data
        });
        
        setError(null);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to fetch dashboard data. Please check your connection and try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Helper function to convert month number to name
  const getMonthName = (monthNumber) => {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    return months[monthNumber - 1] || '';
  };

  // Format currency for display
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(value);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <p className="mt-2 text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Business Performance Dashboard</h1>
      
      {/* Summary Metrics */}
      <SummaryMetrics 
        totalRevenue={dashboardData.metrics?.total_revenue} 
        totalProfit={dashboardData.profit?.total_profit} 
        profitMargin={dashboardData.profit?.profit_margin_percentage} 
        formatCurrency={formatCurrency}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Monthly Sales Chart */}
        <MonthlySalesChart 
          monthlySalesData={dashboardData.monthlySales} 
          formatCurrency={formatCurrency}
        />
        
        {/* Customer Metrics */}
        <CustomerMetrics 
          customerData={dashboardData.customerAcquisition}
          customerMetrics={dashboardData.customerMetrics}
          formatCurrency={formatCurrency}
        />
      </div>
      
      {/* Product Performance */}
      <ProductsChart 
        topProducts={dashboardData.topProducts}
        profitableProducts={dashboardData.profitableProducts}
        formatCurrency={formatCurrency}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Category Distribution */}
        <CategoryDistribution 
          categoryData={dashboardData.categories}
          formatCurrency={formatCurrency}
        />
        
        {/* Key Insights */}
        <KeyInsights 
          dashboardData={dashboardData}
        />
      </div>
    </div>
  );
};

export default Dashboard;