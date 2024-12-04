const { Pool } = require('pg');
const bcrypt = require("bcrypt");
const crypto = require("crypto")


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

async function findUserByEmail(email) {
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        return result.rows[0] || null;
    } catch (error) {
        console.error('Error finding user by email:', error);
        throw error;
    }
}

function generateRandomToken() {
    return crypto.randomBytes(32).toString('hex');
}

async function createPasswordResetToken(userID) {
    try {
        const resetToken = generateRandomToken();
        const expires = new Date(Date.now() + 3600000); // Token valid for 1 hour (otherwise... fuck)
        await pool.query(
            'UPDATE users SET reset_token = $1, reset_token_expires = $2 WHERE userid = $3',
            [resetToken, expires, userID]
        );
        return resetToken;
    } catch (error) {
        console.error('Error creating password reset token:', error);
        throw error;
    }
}

async function findUserByResetToken(token) {
    try {
        const now = new Date();
        const result = await pool.query(
            'SELECT * FROM users WHERE reset_token = $1 AND reset_token_expires > $2',
            [token, now]
        );
        return result.rows[0] || null;
    } catch (error) {
        console.error('Error finding user by reset token:', error);
        throw error;
    }
}

async function updatePassword(userID, newPassword) {
    try {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await pool.query(
            'UPDATE users SET password = $1, reset_token = NULL, reset_token_expires = NULL WHERE userid = $2',
            [hashedPassword, userID]
        );
    } catch (error) {
        console.error('Error updating password:', error);
        throw error;
    }
}
  
  module.exports = {
    createUser,
    loginUser,
    findUserByEmail,
    createPasswordResetToken,
    findUserByResetToken,
    updatePassword,
};
