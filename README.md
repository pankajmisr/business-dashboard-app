# Business Dashboard Application

A comprehensive dashboard application that connects to PostgreSQL for visualizing business performance metrics including revenue, profit margins, product performance, and customer acquisition data.

## Features

- Real-time connection to PostgreSQL database
- Interactive charts and visualizations using Recharts
- Key business metrics monitoring
- Responsive design with Tailwind CSS

## Setup and Installation

1. Clone the repository
   ```
   git clone https://github.com/pankajmisr/business-dashboard-app.git
   cd business-dashboard-app
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Set up environment variables
   ```
   cp .env.example .env
   ```
   Edit the `.env` file with your PostgreSQL database credentials

4. Start the development server
   ```
   npm run dev
   ```
   This will start both the Express backend server and React frontend application

## Database Requirements

The application expects the following tables in your PostgreSQL database:
- sales
- products
- customers
- suppliers
- monthly_sales (view)
- product_performance (view)
- customer_purchase_history (view)
- quarterly_sales (view)
- category_performance (view)

## Technology Stack

- Frontend: React, Recharts, Tailwind CSS
- Backend: Node.js, Express
- Database: PostgreSQL

## License

MIT