
const mongoose = require('mongoose');
const keys = require('./config/keys');

const dishSchema = new mongoose.Schema({
    dishName: { type: String, required: true },
    ingredients: { type: String, required: true },
    steps: { type: String, required: true },
    createdAt: { type: Date, default: Date(Date.now())},
    createdBy: {type: String }

});

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    googleID: { type: String, required: true}, //we can search by googleID through our local database

});


mongoose.model('dishes', dishSchema);
const User = mongoose.model('user', userSchema);


//hard coding this bc this will not change and will remain static
let dbconf = keys.mongodb.dbconf;
//mongoose.connect(process.env.dbconf);
mongoose.connect(process.env.MONGODB_URI);
//mongoose.connect(dbconf, {useNewUrlParser: true, useUnifiedTopology: true})

module.exports = User;