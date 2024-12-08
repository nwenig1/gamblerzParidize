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
//grab userID from cookies here, hard coded for now 
const userId = 1; 
cartModel.checkout(userId); 
res.send("Checked out sucessfully! Your items will be arriving soon!"); 
}

async function displayCart(req, res){
   // const userId = req.session.userId; // Retrieve userId from session
    const userId = 2; //so i dont have to relog in everytime i restart server 
    if(!userId){
        return res.status(400).send("You're not logged in! (Or devs are bad)");
    }
    cartItems = await cartModel.getCartItems(userId);
    /*
    viewInfo = []; 
    //this could probably be done with a join actually 
    cartItems.forEach(function(item){
        itemInfo = await productModel.getOneItem(item.productid); 
        getOneItemImage = await productModel.getOneItemImages(item.productid); 
        console.log(getOneItemImage); 
        firstImage = getOneItemImage[0]; 
        
        itemObj = {
            "name": itemInfo.name, 
            "quantity" : item.quantity, //comes from cartItems call 
            "price" : itemInfo.price,
            "imageName" : firstImage.filename
        }
        console.log("item object: " + itemObj); 
        viewInfo.push(itemObj);
    }); 
    */
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
    displayCart,
    removeItemFromCart
};