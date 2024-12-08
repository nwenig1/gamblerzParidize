const express = require('express'); //Import the express dependency
const app = express();           
const port = 3000;                  
const bodyParser = require('body-parser'); //dunno what anything from here 

const session = require('express-session');


app.use(
  session({
    secret: 'secret', // Just a simple key
    resave: false,          // Don't save session if unmodified
    saveUninitialized: true // Save uninitialized sessions
  })
);



app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/images', express.static(__dirname + 'public/images'))



app.use(bodyParser.urlencoded({ extended: true }));
//to here does. Some middleware stuff? idk 

const userController = require('./controllers/userController');
const productController = require('./controllers/productController'); 
const cartController = require('./controllers/cartController'); 

//Navigation
app.get('/', (req, res) => {       
    res.render(__dirname + '/views/pages/login.ejs', );     
                                                      
});


app.get('/products', (req, res) => {
    const productId = (typeof req.query.productId === 'undefined') ? "notSpecified" : req.query.productId
    if(productId === "notSpecified"){
        productController.getAllItems(req, res); 
    }else{
        productController.getOneItem(req, res, productId); 
    }
})


//how we add a route. app.get can be replced with app.post(), etc.
// the '/login' at the start is the route 
//__dirname puts us into the project directory, and then appends the name of the file to render
//ejs is just buffed html, can inject javascript logic straight into it
//while doing all the normal hrml things 
app.get('/login', (req, res) => {
    res.render(__dirname + '/views/pages/login.ejs',); 
});

app.post('/createUser', userController.handleUserCreate);

app.post('/login', userController.login); 

//forgot password ifnromation

app.get('/createUser', (req, res) => {
    res.render(__dirname + '/views/pages/index.ejs')
})

app.get('/forgot-password', (req, res) => {
    res.render(__dirname + '/views/pages/forgotPassword.ejs');
});

app.post('/forgot-password', userController.handleForgotPassword);

app.get('/reset-password', userController.showResetPasswordForm);

app.post('/reset-password', userController.handleResetPassword);

app.get('/product/:id', (req, res) => {
    res.render(__dirname + '/views/product.ejs');
});


app.get('/cart', cartController.displayCart); 
app.post('/add-to-cart', cartController.handleAddToCart);

//sets server up on port variable specified at top
app.listen(port, () => {           
    console.log(`Now listening on port ${port}`); 
});

