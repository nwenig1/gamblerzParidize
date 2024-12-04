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

  async function getAllImagesFromDB() {
    try {
      const allImages = await pool.query('SELECT * FROM images'); 
      return allImages.rows; 

    } catch(error){
      console.error("error getting all images in model"); 
      throw error; 
    }
  }

  async function getOneItem(productId){
    try{
      console.log("one item called"); 
      const product = await pool.query("Select * FROM products WHERE productid = $1", [productId]); 
      return product.rows[0]; 
    } catch(error){
      console.error("error getting single item in model"); 
      throw error; 
    }
  }
  
  async function getOneItemImages(productId){
    try{
      console.log("one item's images called"); 
      const images = await pool.query("Select * FROM images WHERE productid = $1", [productId]); 
      return images.rows; 
    } catch(error){
      console.error("error getting single item in model"); 
      throw error; 
    }
  }
    

    module.exports = {
      getAllItemsFromDB,
      getAllImagesFromDB, 
      getOneItem, 
      getOneItemImages
    }; 
