const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');

passport.use(new GoogleStrategy({

    //option for the strategy
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: "http://localhost:3000/auth/google/redirect"  //callbackURL IS CASE SENSITIVE
    // /auth/google/redirect

    }, () => {
        //passport callback function
    })
);