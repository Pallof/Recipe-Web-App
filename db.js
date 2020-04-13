
const mongoose = require('mongoose');

const dish = new mongoose.Schema({
    dishName: { type: String, required: true },
    ingredients: { type: String, required: true },
    steps: { type: String, required: true },
    createdAt: { type: Date, required: true },
    createdBy: {type: String }

});

const user = new mongoose.Schema({
    userName: {type: String, required: true},
    hash: { type: String, required: true}
});