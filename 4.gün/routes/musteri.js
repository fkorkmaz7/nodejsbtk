const express = require('express');
const Musteri = require('../models/musteri');
const router = express.Router();

router.get('/getir',async(req,res,next) => {
    const musteriler = Musteri.find();
    res.send(musteriler);
});

module.exports = router;