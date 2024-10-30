const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'password',
  port: 5432,
});

async function getAllItemsFromDB() {
    try {
        const allProducts = await pool.query('SELECT * FROM products');
        return allProducts.rows;
      } catch (error) {
        console.error('Error executing db query for getting all products', error);
        throw error;
      }
    }

    module.exports = {
      getAllItemsFromDB
    }; 
