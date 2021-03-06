// app.js
const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
require("./db");
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
const passport = require('passport');

const profileRoutes = require('./routes/profile-routes');
const authRoutes = require('./routes/auth-routes'); //here is where we will pull our routes
const passportSetup = require('./config/passport-setup');

const port = 3000;


const authCheck =  (req, res, next) => {
    if(!req.user){ //checking if user is not logged in
        res.redirect('/auth/login');

    }
    else{
        next();
    }
}

app.get('/',function(req, res) { //this is going to be our homepage localhost:3000/
    //implement filtering here
    const filter = req.query;
    
    const nF = req.query.nameFilter;
    //console.log(nF + " THIS IS THE NAME FILTER QUERY");
    const igF = req.query.ingredientFilter;
    console.log(filter);
    //dishName: req.query.nameFilter, ingredients: req.query.ingredientFilter

    //Dish.find({}, function(err, varToStoreResult,){
        console.log("FILTER------");
        //console.log(varToStoreResult);
        if(nF === undefined && igF === undefined){
            Dish.find({}, function(err, varToStoreResult,){
            res.render('home', {variable: varToStoreResult, user: req.user});
            });
        }
        else if(nF !== '' && igF !== ''){
            Dish.find({dishName: new RegExp(nF, 'i'), ingredients: new RegExp(igF, 'i')}, function(err, varToStoreResult,){
            //const dishNameFiltered = varToStoreResult.filter(z => z.nameFilter === nF);
            //const ingredientFiltered_v2 = dishNameFiltered.filter(z => z.ingredientFilter === igF);
            res.render('home', {variable: varToStoreResult, user: req.user});

            });
        }
        else if(nF!==''){
            Dish.find({dishName: new RegExp(nF, 'i')}, function(err, varToStoreResult,){
            //const dishNameFiltered = varToStoreResult.filter(z => z.nameFilter === nF);
            res.render('home', {variable: varToStoreResult, user: req.user});
            //console.log(dishNameFiltered + "=============================");
            });
        }
        else if(igF!==''){
            console.log("HIT");
            Dish.find({ingredients:  new RegExp(igF, 'i')}, function(err, varToStoreResult,){
            //https://xuguoming.wordpress.com/2015/02/11/using-variable-regex-with-mongodb-query-in-node-js/
            //https://stackoverflow.com/questions/26699885/how-can-i-use-a-regex-variable-in-a-query-for-mongodb, lot of learning happening today
            //console.log(typeof(igF));
            res.render('home', {variable: varToStoreResult, user: req.user});
            
            });
        }
        else{
            Dish.find({}, function(err, varToStoreResult,){
                res.render('home', {variable: varToStoreResult, user: req.user});
                });
        }
         //, user: req.user
    //});

    //res.render('home'); //, {variable: content}
});


app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public'))); //change, make sure this is correct
app.use(express.urlencoded({ extended: false }));

const Dish = mongoose.model("dishes")
const User = mongoose.model("user");

//setting cookies
app.use(cookieSession({
    maxAge: 12*60*60*1000, //this is 12 hours (hours x minutes x seconds x milliseconds);
    keys: [keys.session.cookieKey]
}))
app.use(passport.initialize()); //initialing our passport
app.use(passport.session()); //initialing cookie sessions

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

app.get('/add',authCheck, function(req, res) {
    res.render('add', {user: req.user}); //, {variable: content}
});

/*
app.get('/login', function(req, res) {
    res.render('login'); //, {variable: content}
});
*/
app.post('/add', function(req, res) {
    //https://stackoverflow.com/questions/42006503/invalid-shorthand-property-initializer, love me some silly mistakes
    new Dish({
        dishName : req.body.recipeName,
        ingredients : req.body.ingredients,
        steps : req.body.instructions,
        createdAt: Date(Date.now()),
        createdBy: req.user.username,
        //need to get google user ID, refer to mongoschema??
    }).save(function(err, dish) {
        console.log("SAVE CALLBACK INSIDE POST REQUEST")
        res.redirect('/');
    })
    
});

app.listen(process.env.PORT || 3000);

//module.exports =
////"test": "echo \"Error: no test specified\" && exit 1" this was in package.json lets try removing it
//https://dev.to/lawrence_eagles/causes-of-heroku-h10-app-crashed-error-and-how-to-solve-them-3jnl
//^^ LINK ABOVE SOLVED MY DEPLOYMENT PROBLEMS GOD BLESS