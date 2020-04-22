
const mongoose = require('mongoose');

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


mongoose.model('dish', dishSchema);
const User = mongoose.model('user', userSchema);


//hard coding this bc this will not change and will remain static
let dbconf = 'mongodb://localhost/pallofFinal';
mongoose.connect(dbconf, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log("MONGO DB CONNECTION");
});

module.exports = User;