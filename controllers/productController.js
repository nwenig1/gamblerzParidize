productModel = require("../models/productModel"); 


async function getAllItems(req, res){
    items = await productModel.getAllItemsFromDB(); 
    pictures = await productModel.getAllImagesFromDB(); 
    res.render("../views/pages/allItems.ejs", {products : items, images: pictures}); 
}

async function getOneItem(req, res, productId){
    item = await productModel.getOneItem(productId); 
    pictures = await productModel.getOneItemImages(productId); 
    console.log(item); 
    res.render("../views/pages/oneItem.ejs", {product: item, images: pictures}); 
}



module.exports ={
    getAllItems,
    getOneItem
}; 