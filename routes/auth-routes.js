

const passport =require('passport');
const router = require('express').Router(); //creating an instance of a router for us, we can attach routes
//to in this file.. --> Can explore these routes and use them in our app.js file

router.get('/login', (req, res) =>{
    res.render('login');
}); // forward slash auth



router.get('/logout', (req, res)=> {
    //res.send('logging out');
    req.logout();  //this is very confusing bc there is logout AND logOut??????
    
    res.redirect('/');
    //handle with passport as well
})


//auth using google-2.0

router.get('/google', passport.authenticate('google', {
    //scope property tells us what we want to retrieve from the user's profile
    scope: ['profile']
}));


router.get('/google/redirect', passport.authenticate('google'), (req,res) => {
    //res.send("YOU REACHED THE REDIRECT URI");
    //res.send(req.user);
    res.redirect('/profile/');//redirect them 
    
})
    //here is where we interact with google, using passport
    //res.send('Logging in with google'); we want to handle this with passport

 

module.exports = router;



