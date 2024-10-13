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
  async function loginUser(username, password){
    try{
      const result = await pool.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]); 
      console.log("login query returned : " + result.rows); 
      if(result.rows.length !=0){
        return true 
      }else{
        return false; 
      }
    } catch(error){
      console.error("error logging user in with db query " , error); 
    }
  }
  module.exports = {
    createUser,
    loginUser
  }; 