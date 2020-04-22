const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');
const User = require('../db')

passport.serializeUser((user, done) => {
    done(null, user.id);  
})

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user); //basically next() middlewares
    });
    
})


passport.use(new GoogleStrategy({

    //option for the strategy
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: "http://localhost:3000/auth/google/redirect"  //callbackURL IS CASE SENSITIVE
    // /auth/google/redirect  https://stackoverflow.com/questions/32924963/missing-required-parameter-redirect-uri-with-passport-google-oauth

    }, (accessToken, refreshToken, profile, done) => {  //passport callback function
        
        User.findOne({googleID: profile.id}).then( (currentUser) =>{
            if(currentUser){ //truthy value, boolean check
                //console.log(currentUser);
                //console.log("THIS IS THE CURRENT USER ABOVE");
                done(null, currentUser);
            }
            else{
                new User({
                    username: profile.displayName,
                    googleID: profile.id
                }).save().then((newUser) => { //this is saving my new user to MONGODB
                    console.log("The new user created it \t" + newUser); //testing what this prints out
                    done(null, newUser);
                });
            }
        })

    })
);