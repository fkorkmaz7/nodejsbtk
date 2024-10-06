const mongoose = require('mongoose');

const musteriSchema = new mongoose.Schema({
    musteriAd : String,
    musteriTc : Number,
    musteriUID: Number
});

module.exports = mongoose.model('Musteri',musteriSchema);