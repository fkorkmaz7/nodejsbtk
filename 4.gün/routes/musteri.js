const express = require('express');
const Musteri = require('../models/musteri');
const router = express.Router();

router.get('/getir',async(req,res,next) => {
    const musteriler = await Musteri.find();
    res.send(musteriler);
});

router.post('/ekle',async(req,res,next) => {
    const yeni_musteri = await Musteri.create(req.body);
    res.send(yeni_musteri);
})

router.delete('/sil',async(req,res,next) => {
    const body = req.body;
    try{
    const silinecek_musteri = await Musteri.findOneAndDelete({musteriTc:body.musteriTc},{new:true});
    if(!silinecek_musteri){
        res.status(404).send('musteri bulunamadı');
    }
    res.send(silinecek_musteri);
    }
    catch(error){
        res.status(500).send(`müşteri silinirken hata oluştu : ${error.message}`);
    }
})

module.exports = router;