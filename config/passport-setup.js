const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');
const User = require('../db')

passport.use(new GoogleStrategy({

    //option for the strategy
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: "http://localhost:3000/auth/google/redirect"  //callbackURL IS CASE SENSITIVE
    // /auth/google/redirect  https://stackoverflow.com/questions/32924963/missing-required-parameter-redirect-uri-with-passport-google-oauth

    }, (accessToken, refreshToken, profile, done) => {
        //passport callback function
        console.log("Hit the callback function within passport.use");
        console.log(profile);
        new User({
            username: profile.displayName,
            googleID: profile.id

        }).save().then((newUser) => {
            console.log("The new user created it \t" + newUser); //testing what this prints outß
            
        });
        
    })
);