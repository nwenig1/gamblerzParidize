const userModel = require('../models/userModel');


async function handleUserCreate(req, res){
    try{
    //assumes valid create rn 
    console.log("handle create called"); 
    const username = req.body.username.trim(); 
    const password = req.body.password; 
    const email = req.body.email; 
    console.log("form data: " + username + " , " + password + " , " + email); 
    userModel.createUser(username, password, email); 
    res.send("MADE ACCUONT YAY (im lying")
    } catch{
        res.send("error creating user :( "); 
    }
} 

async function login(req, res){
    console.log("login called"); 
    const username = req.body.username.trim(); 
    const password = req.body.password; 
    const  validUser = await userModel.loginUser(username, password); 
    console.log("model returned: " + validUser); 
    if(validUser){
        res.send("Login worked yay"); 
    }else {
        res.send("login no work, not yaya"); 
    }
}

//functions need to be here if called in other files 
module.exports = {
    handleUserCreate,
    login
  };