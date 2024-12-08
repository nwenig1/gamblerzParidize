const cartModel = require("../models/cartModel"); 

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
    handleAddToCart,
    checkout,
    getItemsInCart
};