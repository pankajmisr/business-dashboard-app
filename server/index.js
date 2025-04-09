const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Pool } = require('pg');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const pool = new Pool({
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  port: process.env.PG_PORT,
});

// Test database connection
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('Connected to PostgreSQL database');
  release();
});

// API Routes
app.get('/api/dashboard/revenue', async (req, res) => {
  try {
    const result = await pool.query('SELECT SUM(total_price) as total_revenue FROM sales');
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching total revenue:', error);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
});

app.get('/api/dashboard/profit', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        SUM(s.total_price) as total_revenue,
        SUM(s.quantity * p.cost_price) as total_cost,
        (SUM(s.total_price) - SUM(s.quantity * p.cost_price)) as total_profit,
        ROUND((SUM(s.total_price) - SUM(s.quantity * p.cost_price)) / SUM(s.total_price) * 100, 2) as profit_margin_percentage
      FROM sales s
      JOIN products p ON s.product_id = p.product_id
    `);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching profit data:', error);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
});

app.get('/api/dashboard/top-products', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        product_id,
        product_name,
        category,
        total_revenue,
        total_profit,
        ROUND((total_profit / total_revenue) * 100, 2) as profit_margin_percentage
      FROM product_performance
      ORDER BY total_revenue DESC
      LIMIT 5
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching top products:', error);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
});

app.get('/api/dashboard/profitable-products', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        product_id,
        product_name,
        category,
        total_revenue,
        total_profit,
        ROUND((total_profit / total_revenue) * 100, 2) as profit_margin_percentage
      FROM product_performance
      ORDER BY total_profit DESC
      LIMIT 5
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching profitable products:', error);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
});

app.get('/api/dashboard/monthly-sales', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        year,
        month,
        total_sales,
        LAG(total_sales) OVER (ORDER BY year, month) as previous_month_sales,
        CASE
          WHEN LAG(total_sales) OVER (ORDER BY year, month) IS NOT NULL
          THEN ROUND((total_sales - LAG(total_sales) OVER (ORDER BY year, month)) / LAG(total_sales) OVER (ORDER BY year, month) * 100, 2)
          ELSE NULL
        END as month_over_month_growth
      FROM monthly_sales
      ORDER BY year, month
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching monthly sales:', error);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
});

app.get('/api/dashboard/category-performance', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        category,
        SUM(total_revenue) as category_revenue,
        SUM(total_profit) as category_profit,
        ROUND(SUM(total_profit) / SUM(total_revenue) * 100, 2) as profit_margin
      FROM product_performance
      GROUP BY category
      ORDER BY category_revenue DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching category performance:', error);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
});

app.get('/api/dashboard/customer-acquisition', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        DATE_TRUNC('month', signup_date) as month,
        COUNT(*) as new_customers
      FROM customers
      GROUP BY month
      ORDER BY month
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching customer acquisition:', error);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
});

app.get('/api/dashboard/customer-metrics', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        COUNT(DISTINCT customer_id) as total_customers,
        SUM(total_price) as total_revenue,
        ROUND(SUM(total_price) / COUNT(DISTINCT customer_id), 2) as average_revenue_per_customer
      FROM sales
    `);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching customer metrics:', error);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});