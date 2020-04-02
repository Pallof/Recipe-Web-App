// app.js
const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
require("./db");

const port = 3000;

app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public'))); //change, make sure this is correct
app.use(express.urlencoded({ extended: false }));

const sessionOptions = { 
	secret: 'secret for signing session id', 
	saveUninitialized: false, 
	resave: false 
};


app.get('route', function(req, res) {
    res.render('hbsTemplate', {variable: content});
});

app.get('route', function(req, res) {
    res.render('hbsTemplate', {variable: content});
});

app.post('route', function(req, res) {
    res.render('hbsTemplate', {variable: content});
});
//basic boiler plate code

module.exports = app.listen(3000);