const express = require('express');
const Urun = require('../models/urun');
const router = express.Router();

router.get('/getir',async(req,res,next) => {
    const urunler = await Urun.find();
    res.send(urunler);
})

router.post('/ekle',async(req,res,next) => {
    const yeni_urun = await Urun.create(req.body);
    res.send(yeni_urun);
})

router.delete('/sil',async(req,res,next) => {
    const body = req.body;
    try{
    const silinecek_urun = await Urun.findOneAndDelete({urunid:body.urunid},{new:true});
    if(!silinecek_urun){
        res.status(404).send("silinecek urun bulunamadı.");
    }
    res.send(silinecek_urun);
    }
    catch(error){
        res.status(500).send(`ürün silinirken bir hata oldu ${error.message}`);
    }
})

router.put('/guncelle',async(req,res,next) => {
    const body = req.body;
    try{
        const urun = await Urun.findOneAndUpdate(
            {urunid:body.urunid},
            {urunadet:body.urunadet},
            {new:true}
        )
        if(!urun){
            res.status(404).send('urun bulunamadı');
        }
        res.send(urun);
    }
    catch(error){
        res.status(500).send(`urun güncellenirken hata oluştu : ${error.message}`);
    }
})

module.exports = router;