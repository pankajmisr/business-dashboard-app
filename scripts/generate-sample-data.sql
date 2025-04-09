-- Sample data generation script for business dashboard application
-- This script can be used to create test data in your PostgreSQL database

-- Create tables if they don't exist

-- Suppliers table
CREATE TABLE IF NOT EXISTS suppliers (
  supplier_id SERIAL PRIMARY KEY,
  supplier_name VARCHAR(100) NOT NULL,
  contact_person VARCHAR(100),
  email VARCHAR(100),
  phone VARCHAR(20)
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  product_id SERIAL PRIMARY KEY,
  product_name VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL,
  supplier_id INTEGER REFERENCES suppliers(supplier_id),
  cost_price NUMERIC(10, 2) NOT NULL
);

-- Customers table
CREATE TABLE IF NOT EXISTS customers (
  customer_id SERIAL PRIMARY KEY,
  customer_name VARCHAR(100) NOT NULL,
  email VARCHAR(100),
  phone VARCHAR(20),
  address TEXT,
  signup_date DATE NOT NULL
);

-- Sales table
CREATE TABLE IF NOT EXISTS sales (
  sale_id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(product_id),
  customer_id INTEGER REFERENCES customers(customer_id),
  sale_date DATE NOT NULL,
  quantity INTEGER NOT NULL,
  unit_price NUMERIC(10, 2) NOT NULL,
  total_price NUMERIC(10, 2) NOT NULL
);

-- Insert sample data for suppliers
INSERT INTO suppliers (supplier_name, contact_person, email, phone)
VALUES
  ('Tech Wholesale Corp', 'John Smith', 'john@techwholesale.com', '555-1234'),
  ('Office Supplies Inc', 'Sarah Johnson', 'sarah@officesupplies.com', '555-5678'),
  ('Electronics Direct', 'Mike Brown', 'mike@electronics.com', '555-9012'),
  ('Computer Parts Ltd', 'Emily Taylor', 'emily@computerparts.com', '555-3456')
ON CONFLICT (supplier_id) DO NOTHING;

-- Insert sample data for products
INSERT INTO products (product_name, category, supplier_id, cost_price)
VALUES
  ('Laptop Pro X', 'Electronics', 1, 800.00),
  ('Ergonomic Mouse', 'Computer Accessories', 1, 15.00),
  ('Wireless Keyboard', 'Computer Accessories', 1, 25.00),
  ('Office Chair', 'Furniture', 2, 120.00),
  ('Standing Desk', 'Furniture', 2, 350.00),
  ('Smart Watch', 'Electronics', 3, 150.00),
  ('Bluetooth Headphones', 'Audio', 3, 75.00),
  ('Webcam HD', 'Computer Accessories', 4, 45.00),
  ('Desk Lamp', 'Office Supplies', 2, 35.00),
  ('Wireless Charger', 'Electronics', 3, 25.00)
ON CONFLICT (product_id) DO NOTHING;

-- Insert sample data for customers
INSERT INTO customers (customer_name, email, phone, signup_date)
VALUES
  ('Acme Corp', 'info@acmecorp.com', '555-1111', '2024-01-15'),
  ('Global Services Ltd', 'contact@globalservices.com', '555-2222', '2024-02-20'),
  ('Tech Innovators', 'support@techinnovators.com', '555-3333', '2024-03-10'),
  ('Creative Solutions', 'help@creativesolutions.com', '555-4444', '2024-03-25'),
  ('Bright Solutions Inc', 'info@brightsolutions.com', '555-5555', '2024-01-05'),
  ('Quantum Enterprises', 'contact@quantumenterprise.com', '555-6666', '2024-02-12'),
  ('Digital Transformers', 'support@digitaltransformers.com', '555-7777', '2024-03-18'),
  ('Elite Services', 'info@eliteservices.com', '555-8888', '2024-01-22'),
  ('Visionary Studios', 'contact@visionarystudios.com', '555-9999', '2024-02-28'),
  ('Future Tech', 'support@futuretech.com', '555-0000', '2024-01-10')
ON CONFLICT (customer_id) DO NOTHING;

-- Insert 2024 Q1 sample sales data (January)
INSERT INTO sales (product_id, customer_id, sale_date, quantity, unit_price, total_price)
VALUES
  (2, 5, '2024-01-05', 20, 25.00, 500.00),
  (3, 5, '2024-01-05', 10, 40.00, 400.00),
  (1, 10, '2024-01-10', 2, 1200.00, 2400.00),
  (6, 10, '2024-01-10', 5, 200.00, 1000.00),
  (4, 8, '2024-01-22', 5, 150.00, 750.00),
  (5, 8, '2024-01-22', 2, 450.00, 900.00),
  (7, 1, '2024-01-15', 5, 100.00, 500.00),
  (8, 1, '2024-01-15', 5, 35.00, 175.00);

-- Insert 2024 Q1 sample sales data (February)
INSERT INTO sales (product_id, customer_id, sale_date, quantity, unit_price, total_price)
VALUES
  (3, 6, '2024-02-12', 5, 40.00, 200.00),
  (9, 6, '2024-02-12', 10, 35.00, 350.00),
  (10, 6, '2024-02-12', 5, 25.00, 125.00),
  (2, 9, '2024-02-28', 25, 25.00, 625.00),
  (7, 9, '2024-02-28', 10, 100.00, 1000.00),
  (4, 9, '2024-02-28', 4, 150.00, 600.00),
  (3, 2, '2024-02-20', 15, 40.00, 600.00),
  (4, 2, '2024-02-20', 10, 150.00, 1500.00),
  (5, 2, '2024-02-20', 2, 450.00, 900.00),
  (8, 2, '2024-02-21', 15, 35.00, 525.00);

-- Insert 2024 Q1 sample sales data (March)
INSERT INTO sales (product_id, customer_id, sale_date, quantity, unit_price, total_price)
VALUES
  (1, 1, '2024-03-01', 5, 1200.00, 6000.00),
  (2, 1, '2024-03-01', 10, 25.00, 250.00),
  (3, 1, '2024-03-01', 10, 40.00, 400.00),
  (4, 2, '2024-03-10', 8, 150.00, 1200.00),
  (5, 2, '2024-03-10', 4, 450.00, 1800.00),
  (6, 3, '2024-03-12', 15, 200.00, 3000.00),
  (7, 3, '2024-03-12', 15, 100.00, 1500.00),
  (1, 3, '2024-03-12', 3, 1200.00, 3600.00),
  (6, 4, '2024-03-25', 5, 200.00, 1000.00),
  (7, 4, '2024-03-25', 5, 100.00, 500.00),
  (8, 4, '2024-03-25', 10, 35.00, 350.00),
  (2, 7, '2024-03-18', 30, 25.00, 750.00),
  (3, 7, '2024-03-18', 20, 40.00, 800.00),
  (4, 7, '2024-03-18', 15, 150.00, 2250.00),
  (10, 7, '2024-03-19', 12, 25.00, 300.00),
  (9, 3, '2024-03-20', 10, 35.00, 350.00),
  (8, 3, '2024-03-20', 15, 35.00, 525.00),
  (1, 7, '2024-03-22', 2, 1200.00, 2400.00),
  (6, 2, '2024-03-24', 5, 200.00, 1000.00),
  (5, 9, '2024-03-30', 3, 450.00, 1350.00);

-- Insert 2024 Q2 sample sales data (April)
INSERT INTO sales (product_id, customer_id, sale_date, quantity, unit_price, total_price)
VALUES
  (1, 5, '2024-04-05', 2, 1200.00, 2400.00),
  (2, 5, '2024-04-05', 15, 25.00, 375.00),
  (8, 5, '2024-04-05', 8, 35.00, 280.00),
  (3, 10, '2024-04-10', 12, 40.00, 480.00),
  (7, 10, '2024-04-10', 3, 100.00, 300.00),
  (2, 8, '2024-04-15', 20, 25.00, 500.00),
  (4, 1, '2024-04-20', 10, 150.00, 1500.00),
  (6, 1, '2024-04-20', 6, 200.00, 1200.00),
  (9, 4, '2024-04-22', 10, 35.00, 350.00),
  (10, 4, '2024-04-22', 12, 25.00, 300.00),
  (3, 7, '2024-04-26', 10, 40.00, 400.00),
  (5, 3, '2024-04-28', 3, 450.00, 1350.00),
  (3, 2, '2024-04-30', 5, 40.00, 200.00),
  (2, 9, '2024-04-30', 15, 25.00, 375.00),
  (1, 6, '2024-04-30', 1, 1200.00, 1200.00);

-- Insert 2024 Q2 sample sales data (May)
INSERT INTO sales (product_id, customer_id, sale_date, quantity, unit_price, total_price)
VALUES
  (7, 2, '2024-05-02', 4, 100.00, 400.00),
  (8, 2, '2024-05-02', 10, 35.00, 350.00),
  (2, 3, '2024-05-05', 10, 25.00, 250.00),
  (3, 3, '2024-05-05', 15, 40.00, 600.00),
  (4, 5, '2024-05-10', 8, 150.00, 1200.00),
  (6, 8, '2024-05-15', 2, 200.00, 400.00),
  (10, 9, '2024-05-18', 30, 25.00, 750.00),
  (2, 1, '2024-05-20', 14, 25.00, 350.00),
  (9, 6, '2024-05-22', 20, 35.00, 700.00),
  (4, 7, '2024-05-25', 8, 150.00, 1200.00),
  (5, 10, '2024-05-30', 3, 450.00, 1350.00);

-- Insert 2024 Q2 sample sales data (June)
INSERT INTO sales (product_id, customer_id, sale_date, quantity, unit_price, total_price)
VALUES
  (1, 4, '2024-06-02', 1, 1200.00, 1200.00),
  (2, 4, '2024-06-02', 20, 25.00, 500.00),
  (3, 6, '2024-06-05', 15, 40.00, 600.00),
  (7, 6, '2024-06-05', 5, 100.00, 500.00),
  (4, 9, '2024-06-10', 12, 150.00, 1800.00),
  (8, 2, '2024-06-12', 10, 35.00, 350.00),
  (6, 3, '2024-06-15', 5, 200.00, 1000.00),
  (5, 5, '2024-06-18', 2, 450.00, 900.00),
  (10, 7, '2024-06-20', 15, 25.00, 375.00),
  (9, 8, '2024-06-22', 8, 35.00, 280.00),
  (3, 10, '2024-06-25', 15, 40.00, 600.00),
  (2, 1, '2024-06-28', 20, 25.00, 500.00),
  (4, 3, '2024-06-30', 6, 150.00, 900.00),
  (1, 7, '2024-06-30', 1, 1200.00, 1200.00);

-- Create monthly_sales view
CREATE OR REPLACE VIEW monthly_sales AS
SELECT
  EXTRACT(YEAR FROM sale_date) AS year,
  EXTRACT(MONTH FROM sale_date) AS month,
  SUM(total_price) AS total_sales,
  COUNT(*) AS number_of_transactions
FROM
  sales
GROUP BY
  EXTRACT(YEAR FROM sale_date),
  EXTRACT(MONTH FROM sale_date)
ORDER BY
  year, month;

-- Create quarterly_sales view
CREATE OR REPLACE VIEW quarterly_sales AS
SELECT
  EXTRACT(YEAR FROM sale_date) AS year,
  EXTRACT(QUARTER FROM sale_date) AS quarter,
  SUM(total_price) AS total_sales,
  COUNT(*) AS number_of_transactions,
  COUNT(DISTINCT customer_id) AS unique_customers
FROM
  sales
GROUP BY
  EXTRACT(YEAR FROM sale_date),
  EXTRACT(QUARTER FROM sale_date)
ORDER BY
  year, quarter;

-- Create product_performance view
CREATE OR REPLACE VIEW product_performance AS
SELECT
  p.product_id,
  p.product_name,
  p.category,
  SUM(s.quantity) AS total_quantity_sold,
  SUM(s.total_price) AS total_revenue,
  SUM(s.total_price - (s.quantity * p.cost_price)) AS total_profit
FROM
  products p
JOIN
  sales s ON p.product_id = s.product_id
GROUP BY
  p.product_id, p.product_name, p.category
ORDER BY
  total_revenue DESC;

-- Create customer_purchase_history view
CREATE OR REPLACE VIEW customer_purchase_history AS
SELECT
  c.customer_id,
  c.customer_name,
  COUNT(s.sale_id) AS number_of_purchases,
  SUM(s.total_price) AS total_spent,
  MIN(s.sale_date) AS first_purchase_date,
  MAX(s.sale_date) AS last_purchase_date
FROM
  customers c
JOIN
  sales s ON c.customer_id = s.customer_id
GROUP BY
  c.customer_id, c.customer_name
ORDER BY
  total_spent DESC;

-- Create category_performance view
CREATE OR REPLACE VIEW category_performance AS
SELECT
  p.category,
  SUM(s.quantity) AS total_items_sold,
  SUM(s.total_price) AS total_revenue,
  COUNT(DISTINCT s.customer_id) AS unique_customers,
  SUM(s.total_price - (s.quantity * p.cost_price)) AS total_profit
FROM
  products p
JOIN
  sales s ON p.product_id = s.product_id
GROUP BY
  p.category
ORDER BY
  total_revenue DESC;