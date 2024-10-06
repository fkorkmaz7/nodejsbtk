// okul bilgileri veri tabanı işlemleri
//put işlemleri daha sonra yapılacak
const express = require('express');
const app = express();
app.use(express.json());
const mongoose = require('mongoose');
const MONGO_URI = 'mongodb+srv://furkank1024:kartal712@cluster0.0wcf902.mongodb.net/okulveritabanı';


async function connectDB(){
    try{
        mongoose.connect(MONGO_URI);
        console.log('veritabanına bağlantı sağlandı.');
    }
    catch(error){
        console.log(`veri tabanına bağlanırken hata oluştu :`)
    }
}

connectDB();

const OgrenciSchema = new mongoose.Schema({
    ogrenciAd:String,
    ogrenciSoyad:String,
    ogrenciNo:Number
})

const Ogrenci = mongoose.model('Ogrenci',OgrenciSchema);

app.get('/',(req,res,next) => {
    res.send('merhaba canım hoşgeldin.');
})

app.post('/ogrenci-ekle', async(req,res,next) => {
    const yeni_ogrenci = await Ogrenci.create(req.body);
    res.send(yeni_ogrenci);
})

app.get('/ogrenci-getir',async(req,res,next) => {
    const ogrenciler = await Ogrenci.find();
    res.send(ogrenciler);
})

app.delete('/ogrenci-sil/:id',async(req,res,next) =>{
    const silinen_ogrenci = await Ogrenci.findByIdAndDelete(req.params.id);
    try{
    if(!silinen_ogrenci){
        res.status(404).send('ogrenci bulunamadı.');
    }
    res.send('öğrenci başarıyla silindi.');
    }
    catch(error){
        res.status(500).send(`öğrenci silinirken hatayla karşılaşıldı : ${error.message}`);
    }
})

app.put('/ogrenci-guncelle/:id',async(req,res,next) => {
    const ogrenci_id = await req.params.id;
    const body = req.body;

    // const ogrenci = await Ogrenci.findById(ogrenci_id);
    // ogrenci.ogrenciAd='fenasi';
    // await ogrenci.save();

    const ogrenci = await Ogrenci.findByIdAndUpdate({_id:ogrenci_id},{ogrenciAd:body.ogrenciAd,ogrenciSoyad:body.ogrenciSoyad},{new : true});
    res.send(ogrenci);
})

app.listen(6000, () => {
    console.log('6000 portuna bağlanıldı.');
})

 