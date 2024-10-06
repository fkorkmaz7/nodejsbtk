const mongoose = require('mongoose');

const OdemeSchema = new mongoose.Schema({
    odemeyontemi:String,
    miktar:Number,
    taksit_sayisi:Number
});

module.exports = mongoose.model('Odeme',OdemeSchema);