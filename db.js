
const mongoose = require('mongoose');

const Dish = new mongoose.Schema({
    dishName: { type: String, required: true },
    Ingredients: { type: String, required: true },
    steps: { type: String, required: true },
    createdAt: { type: Date, required: true },
    createdBy: {type: String }

});

const user = new mongoose.Schema({
    userName: {type: String, required: true},
    hash: { type: String, required: true}
});