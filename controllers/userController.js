function handleUserCreate(req, res){
    console.log("handle create called"); 
    const username = req.body.username.trim(); 
    const password = req.body.password; 
    const email = req.body.email; 
    console.log("form data: " + username + " , " + password + " , " + email); 

    //will call model to make db call to create user accoutn
    res.send("MADE ACCUONT YAY (im lying")
} 


//functions need to be here if called in other files 
module.exports = {
    handleUserCreate
  };