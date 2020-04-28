
const router = require('express').Router();

const authCheck =  (req, res, next) => {
    if(!req.user){ //checking if user is not logged in
        res.redirect('/auth/login');

    }
    else{
        next();
    }
}

router.get('/', authCheck, (req,res) => {
    //res.send("you are logged in, this is your profile: " + req.user.username);
    res.render('profile', {user: req.user});
})
/*
router.get('/profile', authCheck, (req, res) => {
    res.render('profile');
}); //we dont link this in res.render in app.js b/c we need to call authCheck middleware. 
*/
module.exports = router; 