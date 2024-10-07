const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userID:Number,
    userSurname:String,
    userPassword:Number
});

module.exports = mongoose.model('User',userSchema);