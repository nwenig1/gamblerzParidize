const express = require('express'); //Import the express dependency
const app = express();           
const port = 3000;                  
const bodyParser = require('body-parser'); //dunno what anything from here 



app.set('view engine', 'ejs');

app.use(express.static('views'));

app.use(bodyParser.urlencoded({ extended: true }));
//to here does. Some middleware stuff? idk 

const userController = require('./controllers/userController');

app.get('/', (req, res) => {       
    res.render(__dirname + '/views/index.ejs', );     
                                                      
});


//how we add a route. app.get can be replced with app.post(), etc.
// the '/login' at the start is the route 
//__dirname puts us into the project directory, and then appends the name of the file to render
//ejs is just buffed html, can inject javascript logic straight into it
//while doing all the normal hrml things 
app.get('/login', (req, res) => {
    res.render(__dirname + '/views/login.ejs',); 
});

app.post('/createUser', userController.handleUserCreate);
app.post('/login', userController.login); 

app.get('/forgot-password', (req, res) => {
    res.render(__dirname + '/views/forgotPassword.ejs');
});

app.post('/forgot-password', userController.handleForgotPassword);

app.get('/reset-password', userController.showResetPasswordForm);
app.post('/reset-password', userController.handleResetPassword);

//sets server up on port variable specified at top
app.listen(port, () => {           
    console.log(`Now listening on port ${port}`); 
});

