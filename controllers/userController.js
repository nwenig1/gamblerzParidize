const userModel = require('../models/userModel');
const productController = require('../controllers/productController'); //for directing to oroducts on logins/create accounts


async function handleUserCreate(req, res){
    try{
    //assumes valid create rn 
    console.log("handle create called"); 
    const username = req.body.username.trim(); 
    const password = req.body.password; 
    const email = req.body.email; 
    console.log("form data: " + username + " , " + password + " , " + email); 
    await userModel.createUser(username, password, email); 
    const userId = await userModel.userIdFetch(username); // Fetch the userId from the database
    req.session.username = username; // Store username in session
    req.session.userId = userId; // Store userId in session
    productController.getAllItems(req, res); 
    res.redirect('/login?message=User%20created%20successfully')
    } catch{
        res.send("error creating user :( "); 
    }
} 
async function login(req, res) {
    console.log("login called");
    const username = req.body.username.trim();
    const password = req.body.password;

    try {
        const validUser = await userModel.loginUser(username, password);
        console.log("Model returned: " + validUser);

        if (validUser) {
            req.session.username = username; // Store username in session
            const userId = await userModel.userIdFetch(username); // Fetch the userId from the database
            req.session.userId = userId; // Store userId in session
            console.log("UserId stored in session:", userId);
            productController.getAllItems(req, res); 
            res.redirect('/products?message=Login%20Successful')
        } else {
            res.send("Invalid login credentials.");
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send("An error occurred during login.");
    }
}


async function handleForgotPassword(req, res) {
    const email = req.body.email.trim();
    try {
        const user = await userModel.findUserByEmail(email);
        if (!user) {
            res.send('Email address not found.');
        } else {
            const resetToken = await userModel.createPasswordResetToken(user.userid);
            const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;
            res.render('../views/pages/displayResetLink', { resetLink });
        }
    } catch (error) {
        console.error('Error handling forgot password:', error);
        res.send('An error occurred while processing your request.');
    }
}



async function showResetPasswordForm(req, res) {
    const token = req.query.token;
    try {
        const user = await userModel.findUserByResetToken(token);
        if (!user) {
            res.send('Invalid or expired password reset token.');
        } else {
            res.render('../views/pages/resetPassword.ejs', { token });
        }
    } catch (error) {
        console.error('Error displaying reset password form:', error);
        res.send('An error occurred.');
    }
}

async function handleResetPassword(req, res) {
    const token = req.body.token;
    const newPassword = req.body.password;
    try {
        const user = await userModel.findUserByResetToken(token);
        if (!user) {
            res.send('Invalid or expired password reset token.');
        } else {
            await userModel.updatePassword(user.userid, newPassword);
            res.send('Your password has been reset successfully.');
        }
    } catch (error) {
        console.error('Error resetting password:', error);
        res.send('An error occurred.');
    }
}



//functions need to be here if called in other files 
module.exports = {
    handleUserCreate,
    login,
    handleForgotPassword,
    showResetPasswordForm,
    handleResetPassword,
  };