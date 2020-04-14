const router = require('express').Router(); //creating an instance of a router for us, we can attach routes
//to in this file.. --> Can explore these routes and use them in our app.js file

router.get('/login', (req, res) =>{
    res.render('login');
}); // forward slash auth



router.get('/logout', (req, res)=> {
    res.send('logging out');
    //handle with passport as well
})


//auth using google-2.0

router.get('/google', (req, res) => {
    //here is where we interact with google, using passport
    res.send('Logging in with google');
});


module.exports = router;



