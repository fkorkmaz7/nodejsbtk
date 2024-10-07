const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.get('/getir',async(req,res,next) => {
    const userlar = await User.find();
    res.send(userlar); 
});

router.post('/ekle',async(req,res,next) => {
    const yeni_user = await User.create(req.body);
    res.send(yeni_user);
});

router.delete('/sil',async(req,res,next) => {
    const body = req.body;
    try{
        const silinecek_user = await User.findOneAndDelete(
            {userID:body.userID},
            {new:true}
        )
        if(!silinecek_user){
            res.status(404).send('silinecek user bulunamadı');
        }
        res.send(silinecek_user);
    }
    catch(error){
        res.status(500).send(`user silinirken bir hata oluştu : ${error.message}`);
    }
});

router.put('/guncelle',async(req,res,next) => {
    const body = req.body;
    try{
        const user = await User.findOneAndUpdate(
            {userID:body.userID},
            {userPassword:body.userPassword},
            {new:true}
        );
        if(!user){
            res.status(404).send('guncellenen user bulunamadı.');
        }
        res.send(user);
    }
    catch(error){
        res.status(500).send(`user güncellenirken hata oluştu : ${error.message}`);
    }
});