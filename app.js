// app.js
const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
require("./db");


const authRoutes = require('./routes/auth-routes'); //here is where we will pull our routes
const passportSetup = require('./config/passport-setup');

const port = 3000;

app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public'))); //change, make sure this is correct
app.use(express.urlencoded({ extended: false }));

//implement passport function here

/*
const sessionOptions = { 
	secret: 'secret for signing session id', 
	saveUninitialized: false, 
	resave: false 
};
*/
const Dish = mongoose.model("dish")
const User = mongoose.model("user");




app.use('/auth', authRoutes);


app.get('/', function(req, res) { //this is going to be our homepage localhost:3000/
    //implement filtering here
    
    res.render('home'); //, {variable: content}
});

app.get('/add', function(req, res) {
    res.render('add'); //, {variable: content}
});

app.get('/login', function(req, res) {
    
    res.render('login'); //, {variable: content}
});



app.post('/add', function(req, res) {
    //https://stackoverflow.com/questions/42006503/invalid-shorthand-property-initializer, love me some silly mistakes
    new dish({
        dishName : req.body.dishName,
        ingredients : req.body.ingredients,
        steps : req.body.steps,
        createdAt: Date(Date.now()),
        //createdBy: need to get google user ID 


    })

    res.redirect('/');
});
//basic boiler plate code

module.exports = app.listen(3000);
