const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'password',
    port: 5432,
  });

  async function addToCart(userId, productId) {
    try {
        if (!userId || !productId) {
            throw new Error("userId or productId is missing");
        }

        const result = await pool.query(
            'SELECT * FROM carts WHERE userId = $1 AND productId = $2',
            [userId, productId]
        );

        if (result.rows.length === 0) {
            await pool.query(
                'INSERT INTO carts (userId, productId, quantity) VALUES ($1, $2, 1)',
                [userId, productId]
            );
        } else {
            await pool.query(
                'UPDATE carts SET quantity = quantity + 1 WHERE userId = $1 AND productId = $2',
                [userId, productId]
            );
        }
    } catch (error) {
        console.error('Error adding to cart:', error);
        throw error; 
    }
}

  async function checkoutModel(userId){
    try{
    results = await pool.query("DELETE FROM cart WHERE userid = $1", [userId]); 
    return results.rows; 
    } catch(error){
        console.error("Error checking out in model: " + error); 
        throw error; 
    }
  }
  async function getCartItems(userId){
    try{
        items = await pool.query("SELECT * FROM cart WHERE userid = $1", [userId]); 
        return results.rows; 
    } catch(error){
        console.error("Error getting cart items in model: " + error); 
        throw error; 
    }
  }
  async function removeItemFromCart(userId, productId){
    try{
        results = await pool.query("SELECT quantity FROM cart WHERE userid = $1 AND productid = $2", [userId, productId]);
        currentQuantity = results.rows[0].quantity; 
        console.log("Current Quantity: " + currentQuantity);  
        if(currentQuantity === 0 ){
            await pool.query("DELETE FROM cart WHERE userid = $1 AND productid = $2"); 
        }else{
            newQuantity = currentQuantity - 1; 
            await pool.query("UPDATE cart SET quantity = $1 WHERE userId = $2 AND productId = $3", [newQuantity, userId, productId]); 
        }
    } catch(error){
        console.error("Error deleting item from cart in model: " + error); 
        throw error; 
    }
  }

  module.exports = {
    addToCart, 
    checkoutModel,
    getCartItems, 
    removeItemFromCart
  }; 