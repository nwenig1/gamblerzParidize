productModel = require("../models/productModel"); 


async function getAllItems(req, res){
    items = await productModel.getAllItemsFromDB(); 
    console.log("All items:" + items); 
    res.render("../views/allItems.ejs", {products : items}); 
}

module.exports ={
    getAllItems
}; 