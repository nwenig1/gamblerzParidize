const { Pool } = require('pg');
const bcrypt = require("bcrypt");


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
      const hashedpw = await bcrypt.hash(password, 10); 
      const result = await pool.query('INSERT INTO users(username, password, email) VALUES($1, $2, $3) RETURNING *', [username, hashedpw, email]);
      console.log(result); 
      return result.rows[0];
    } catch (error) {
      console.error('Error executing database query', error);
      throw error;
    }
  }
  async function loginUser(username, password){
    try{
      const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]); 
      if(result.rows.length ==0){ //no username exists 
        return false; 
      }else{
        const userInfo = result.rows[0]; 
        console.log("userInfo: " + userInfo.password); 
        const match = await bcrypt.compare(password, userInfo.password);
        if(match){
          return true; 
        } else{  //invalid password 
          return false; 
        }
       
      }
    } catch(error){
      console.error("error logging user in with db query " , error); 
    }
  }
  module.exports = {
    createUser,
    loginUser
  }; 