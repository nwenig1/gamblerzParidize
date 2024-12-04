productModel = require("../models/productModel"); 


async function getAllItems(req, res){
    items = await productModel.getAllItemsFromDB(); 
    pictures = await productModel.getAllImagesFromDB(); 
   // console.log("All images " + pictures); 
    res.render("../views/allItems.ejs", {products : items, images: pictures}); 
}

async function getOneItem(req, res, productId){
    item = await productModel.getOneItem(productId); 
    pictures = await productModel.getOneItemImages(productId); 
    console.log(item); 
    res.render("../views/oneItem.ejs", {product: item, images: pictures}); 
}



module.exports ={
    getAllItems,
    getOneItem
}; 