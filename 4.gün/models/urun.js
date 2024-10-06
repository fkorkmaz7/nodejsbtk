const mongoose = require('mongoose');

const UrunSchema = new mongoose.Schema({
    urunadi:String,
    urunid:Number,
    urunadet:Number
});

module.exports = mongoose.model('Urun',UrunSchema);