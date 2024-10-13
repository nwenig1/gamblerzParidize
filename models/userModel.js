const { Pool } = require('pg');


//connects to db 
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'password',
  port: 5432,
});

async function createUser(username, password, email) {
    try {
      const result = await pool.query('INSERT INTO users(username, password, email) VALUES($1, $2, $3) RETURNING *', [username, password, email]);
      console.log(result); 
      return result.rows[0];
    } catch (error) {
      console.error('Error executing database query', error);
      throw error;
    }
  }
  module.exports = {
    createUser
  }; 