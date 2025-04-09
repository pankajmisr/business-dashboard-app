import React from 'react';

const KeyInsights = ({ dashboardData }) => {
  // Find month with highest growth
  const findHighestGrowthMonth = () => {
    if (!dashboardData.monthlySales || dashboardData.monthlySales.length === 0) {
      return { month: 'N/A', growth: 0 };
    }
    
    let highestGrowth = { month: dashboardData.monthlySales[0].month, growth: dashboardData.monthlySales[0].month_over_month_growth || 0 };
    
    dashboardData.monthlySales.forEach(item => {
      if (item.month_over_month_growth && item.month_over_month_growth > highestGrowth.growth) {
        highestGrowth = { month: item.month, growth: item.month_over_month_growth };
      }
    });
    
    return highestGrowth;
  };
  
  // Find most profitable category
  const findMostProfitableCategory = () => {
    if (!dashboardData.categories || dashboardData.categories.length === 0) {
      return { category: 'N/A', margin: 0 };
    }
    
    let highestMargin = { category: dashboardData.categories[0].category, margin: parseFloat(dashboardData.categories[0].profit_margin) };
    
    dashboardData.categories.forEach(item => {
      if (parseFloat(item.profit_margin) > highestMargin.margin) {
        highestMargin = { category: item.category, margin: parseFloat(item.profit_margin) };
      }
    });
    
    return highestMargin;
  };
  
  // Find most concerning product
  const findMostConcerningProduct = () => {
    if (!dashboardData.topProducts || dashboardData.topProducts.length === 0) {
      return { product: 'N/A', profit: 0, revenue: 0 };
    }
    
    // Find the product with highest revenue but negative profit
    let concerningProduct = null;
    
    dashboardData.topProducts.forEach(item => {
      if (parseFloat(item.total_profit) < 0) {
        if (!concerningProduct || parseFloat(item.total_revenue) > parseFloat(concerningProduct.total_revenue)) {
          concerningProduct = item;
        }
      }
    });
    
    if (!concerningProduct) {
      // If no negative profit products, find the one with lowest margin
      let lowestMargin = { 
        product: dashboardData.topProducts[0].product_name, 
        profit_margin: parseFloat(dashboardData.topProducts[0].profit_margin_percentage) 
      };
      
      dashboardData.topProducts.forEach(item => {
        if (parseFloat(item.profit_margin_percentage) < lowestMargin.profit_margin) {
          lowestMargin = {
            product: item.product_name,
            profit_margin: parseFloat(item.profit_margin_percentage)
          };
        }
      });
      
      return {
        product: lowestMargin.product,
        profit_margin: lowestMargin.profit_margin,
        isNegative: false
      };
    }
    
    return {
      product: concerningProduct.product_name,
      profit: parseFloat(concerningProduct.total_profit),
      revenue: parseFloat(concerningProduct.total_revenue),
      isNegative: true
    };
  };

  // Get insights data
  const highestGrowth = findHighestGrowthMonth();
  const profitableCategory = findMostProfitableCategory();
  const concerningProduct = findMostConcerningProduct();

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Key Business Insights</h2>
      
      <div className="space-y-3">
        {/* Profit Warning */}
        <div className="border-l-4 border-yellow-500 pl-4 py-2">
          <h3 className="font-medium text-gray-800">Profit Warning</h3>
          <p className="text-gray-600">
            {concerningProduct.isNegative
              ? `${concerningProduct.product} is generating significant revenue but operating at a loss of ${concerningProduct.profit.toLocaleString('en-US', {style: 'currency', currency: 'USD', minimumFractionDigits: 0})}. Urgent pricing or cost structure review needed.`
              : `${concerningProduct.product} has the lowest profit margin at ${concerningProduct.profit_margin.toFixed(2)}%. Consider reviewing its pricing strategy.`
            }
          </p>
        </div>
        
        {/* Growth Opportunity */}
        <div className="border-l-4 border-green-500 pl-4 py-2">
          <h3 className="font-medium text-gray-800">Growth Opportunity</h3>
          <p className="text-gray-600">
            {profitableCategory.margin > 0
              ? `${profitableCategory.category} has the highest profit margin at ${profitableCategory.margin.toFixed(2)}%. Consider expanding this product line and increasing marketing efforts.`
              : `All categories are currently showing concerning profit margins. Focus on cost reduction and pricing strategies.`
            }
          </p>
        </div>
        
        {/* Revenue Pattern */}
        <div className="border-l-4 border-blue-500 pl-4 py-2">
          <h3 className="font-medium text-gray-800">Revenue Pattern</h3>
          <p className="text-gray-600">
            {highestGrowth.growth > 0
              ? `${highestGrowth.month} showed an extraordinary revenue spike (${highestGrowth.growth.toFixed(1)}% growth). Identifying and replicating these success factors could drive future growth.`
              : `No significant month-over-month growth detected. Analyze sales strategies and market conditions to develop growth initiatives.`
            }
          </p>
        </div>
        
        {/* Customer Acquisition */}
        <div className="border-l-4 border-purple-500 pl-4 py-2">
          <h3 className="font-medium text-gray-800">Customer Acquisition</h3>
          <p className="text-gray-600">
            {dashboardData.customerMetrics 
              ? `The average revenue per customer is ${parseFloat(dashboardData.customerMetrics.average_revenue_per_customer).toLocaleString('en-US', {style: 'currency', currency: 'USD', minimumFractionDigits: 0})}, suggesting potential for increased customer lifetime value strategies.`
              : `Develop more robust customer acquisition tracking to better understand your customer base and lifetime value.`
            }
          </p>
        </div>
      </div>
      
      {/* Action recommendations */}
      <div className="mt-4 pt-3 border-t border-gray-200">
        <h3 className="text-sm font-semibold text-gray-600 mb-2">Recommended Actions</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li className="flex items-start">
            <span className="text-blue-500 mr-2">1.</span>
            <span>Review pricing and cost structure for underperforming products, particularly {concerningProduct.product}.</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 mr-2">2.</span>
            <span>Invest in expanding the {profitableCategory.category} product category.</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 mr-2">3.</span>
            <span>Analyze factors behind {highestGrowth.month}'s performance to develop growth strategies.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default KeyInsights;