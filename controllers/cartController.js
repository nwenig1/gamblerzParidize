const cartModel = require("../models/cartModel"); 


async function checkout(req, res){
//grab userID from cookies here, hard coded for now 
const userId = 1; 
cartModel.checkout(userId); 
res.send("Checked out sucessfully! Your items will be arriving soon!"); 
}

async function getItemsInCart(req, res){
    //grab userId from cookies here
    const userId = 1; 
    cartItems = cartModel.getCartItems; 
    res.render("../views/pages/cart.ejs", {items: cartItems});  
}


async function removeItemFromCart(req, res){
    //userId cookies 
    const userId = 1; 
    const productId = req.body.productId; 
    result = cartModel.removeItemFromCart(userId, productId); 
    getItemsInCart(req, res); //hopefully should just display the cart page again 
}

module.exports ={
    checkout,
    getItemsInCart
};