const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

// Create a new Pool instance with connection details from .env
const pool = new Pool({
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  port: process.env.PG_PORT,
});

// Export a query function that can be used in other files
module.exports = {
  /**
   * Execute SQL query
   * @param {string} text - SQL query text
   * @param {Array} params - Query parameters
   * @returns {Promise} - Query result
   */
  query: (text, params) => pool.query(text, params),
  
  /**
   * Get a client from the pool
   * @returns {Promise} - Client from the pool
   */
  getClient: () => pool.connect(),
  
  /**
   * Pool for use in transactions
   */
  pool
};