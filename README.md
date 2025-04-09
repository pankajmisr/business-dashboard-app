# Business Dashboard Application

A comprehensive dashboard application that connects to PostgreSQL for visualizing business performance metrics including revenue, profit margins, product performance, and customer acquisition data.

![Dashboard Screenshot](https://via.placeholder.com/1200x600?text=Business+Dashboard+Screenshot)

## Features

- Real-time connection to PostgreSQL database
- Interactive charts and visualizations using Recharts
- Key business metrics monitoring:
  - Revenue and profit analysis
  - Product performance tracking
  - Customer acquisition metrics
  - Category performance analysis
  - Monthly sales trends
- Responsive design with Tailwind CSS
- Insightful business recommendations

## Technology Stack

- **Frontend**: React, Recharts, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: PostgreSQL

## Setup and Installation

### Prerequisites

- Node.js (v14+)
- npm or yarn
- PostgreSQL (v12+)

### Installation Steps

1. Clone the repository
   ```bash
   git clone https://github.com/pankajmisr/business-dashboard-app.git
   cd business-dashboard-app
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   ```bash
   cp .env.example .env
   ```
   Edit the `.env` file with your PostgreSQL database credentials

4. Set up the database
   - Create a PostgreSQL database
   - Run the sample data generation script to populate the database
   ```bash
   psql -U your_postgres_user -d your_database_name -f scripts/generate-sample-data.sql
   ```

5. Start the development server
   ```bash
   npm run dev
   ```
   This will start both the Express backend server and React frontend application
   - Backend will run on: http://localhost:5000
   - Frontend will run on: http://localhost:3000

## Database Structure

The application relies on the following database structure:

### Base Tables
- **suppliers**: Information about product suppliers
- **products**: Details of products including cost price and category
- **customers**: Customer information including signup date
- **sales**: Sales transactions with product, customer, quantity, and price details

### Views
- **monthly_sales**: Aggregated sales data by month
- **quarterly_sales**: Aggregated sales data by quarter
- **product_performance**: Performance metrics for each product
- **customer_purchase_history**: Customer purchasing behavior analysis
- **category_performance**: Performance metrics by product category

## Application Structure

```
business-dashboard-app/
├── server/              # Backend Express server
│   ├── index.js         # Server entry point
│   └── db.js            # Database connection utility
├── src/                 # Frontend React application
│   ├── components/      # React components
│   │   ├── Dashboard.js               # Main dashboard component
│   │   ├── SummaryMetrics.js          # Revenue and profit summary
│   │   ├── MonthlySalesChart.js       # Monthly sales chart
│   │   ├── ProductsChart.js           # Product performance charts
│   │   ├── CategoryDistribution.js    # Category distribution chart
│   │   ├── CustomerMetrics.js         # Customer acquisition metrics
│   │   └── KeyInsights.js             # Business insights component
│   ├── App.js           # Main App component
│   └── index.js         # React entry point
├── scripts/             # Utility scripts
│   └── generate-sample-data.sql  # Sample data generation script
└── package.json         # Project dependencies and scripts
```

## Customization

### Adding New Metrics

1. Create a new SQL query in the backend `server/index.js` file
2. Create a corresponding frontend component in the `src/components` directory
3. Add the component to the Dashboard.js layout

### Styling

The application uses Tailwind CSS for styling. You can customize the look and feel by:

1. Modifying the Tailwind configuration in `tailwind.config.js`
2. Adding custom styles in the component files

## License

MIT