const express = require('express');
const Adres = require('../models/adres');
const adres = require('../models/adres');
const router = express.Router();

router.get('/getir',async(req,res,next) => {
    const adresler = await Adres.find();
    res.send(adresler); 
});

router.post('/ekle',async(req,res,next) =>{
    const yeni_adres = await Adres.create(req.body);
    res.send(yeni_adres);
});

router.delete('/sil',async(req,res,next) => {
    const body = req.body;
    try{
    const silinecek_adres = await Adres.deleteOne({postcode:body.postcode});
    if(!silinecek_adres) {
        res.status(457).send('silinecek adres bulunamadı.');
    }
    res.send(silinecek_adres);
    }
    catch(error){
        res.status(500).send(`adres silinirken hata oluştu : ${error.message}`);
    }

});

router.put('/guncelle',async(req,res,next) => {
    const body = req.body;
    try{
        const adres = await Adres.findOneAndUpdate(
            {postcode:body.postcode},
            {telnumber:body.telnumber},
            {new:true}
        )
        if(!adres){
            res.status(404).send("adres bulunamadı.");
        }
        res.send(adres);
    }
    catch(error){
        res.status(500).send(`adres güncellenirken bir hata oluştu.`);
    }
});

module.exports = router;