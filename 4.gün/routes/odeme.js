const express = require('express');
const Odeme = require('../models/odeme');
const logRequestDetails = require('../middleware/logMiddleware');
const router = express.Router();

router.post('/ekle',logRequestDetails, async(req,res,next) => {
    const yeni_odeme = await Odeme.create(req.body);
    res.send(yeni_odeme);
});

router.get('/getir',logRequestDetails,async(req,res,next) => {
    const odemeler = await Odeme.find();
    res.send(odemeler);
});

router.delete('/sil',async(req,res,next) => {
    const body = req.body;
    try{
        const silinecek_odeme = await Odeme.deleteOne({miktar:body.miktar},{new:true});
        if(!silinecek_odeme){
            res.status(404).send('ödeme bulunamadı.');
        }
        res.send(silinecek_odeme);
    }
    catch(error){
        res.status(500).send(`ödeme silinirken hata oluştu : ${error.message}`);
    }

});

router.put('/guncelle',async(req,res,next) => {
    const body = req.body;
    try{
        const odeme = await Odeme.findOneAndUpdate(
            {miktar:body.miktar},
            {taksit_sayisi:body.taksit_sayisi},
            {new:true}
        )
        if(!odeme){
            res.status(404).send("Ödeme bulunamadı.");
        }
        res.send(odeme);
    }
    catch(error){
        res.status(500).send(`odeme guncellemesi yapılırken hata oluştu : ${error.message}`);
    }
});
//merahba

module.exports = router;