const cartModel = require("../models/cartModel"); 
const productModel = require("../models/productModel"); 

async function handleAddToCart(req, res) {
    const userId = req.session.userId; // Retrieve userId from session
    const productId = parseInt(req.body.productId, 10); // Parse productId as integer

    console.log("Received productId:", productId); // Debugging

    if (!userId || !productId) {
        return res.status(400).send("Missing userId or productId");
    }

    try {
        await cartModel.addToCart(userId, productId);
        res.send("Product added to cart successfully!");
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).send("Failed to add product to cart.");
    }
}

async function checkout(req, res){
const userId = req.session.userId; 
cartModel.checkoutModel(userId); 
res.send("Checked out sucessfully! Your items will be arriving soon!"); 
}

async function displayCart(req, res){
   const userId = req.session.userId; // Retrieve userId from session 
    if(!userId){
        return res.status(400).send("You're not logged in! (Or devs are bad)");
    }
    cartItems = await cartModel.getCartItems(userId);
    console.log("cart items:" + cartItems); 
    res.render("../views/pages/cart.ejs", {items: cartItems});  
}


async function removeItemFromCart(req, res){
    const userId = req.session.userId; // Retrieve userId from session
    const productId = req.body.productId; 
    cartModel.removeItemFromCart(userId, productId); 
    displayCart(req, res); //hopefully should just display the cart page again 

}

module.exports ={
    handleAddToCart,
    checkout,
    displayCart,
    removeItemFromCart
};