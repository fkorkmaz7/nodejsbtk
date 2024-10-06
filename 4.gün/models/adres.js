const mongoose = require('mongoose');

const AdresSchema = new mongoose.Schema({
    adres:String,
    postcode:Number,
    telnumber:String
});

module.exports = mongoose.model('Adres',AdresSchema);