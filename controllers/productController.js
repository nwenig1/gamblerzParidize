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

async function getMostSimilarItems(req, res){
    //function can change a bit for control flow. will probably not have req, res, just prod id as input
    //will send items to some other controller for pop up in add to cart control flow?
    productId = 1; 
    items = await productModel.getMostSimilarItems(productId); 
    console.log(items.rows); 
    res.send(items.rows); 
}



module.exports ={
    getAllItems,
    getOneItem,
    getMostSimilarItems
}; 