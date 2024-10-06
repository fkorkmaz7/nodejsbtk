const express = require('express');
const app = express();
app.use(express.json());
//kütüphane
//kitap => ad,isbn
//raf => adet,kat

const mongoose = require('mongoose');
const MONGO_URI = "mongodb+srv://furkank1024:kartal712@cluster0.0wcf902.mongodb.net/";

async function connectDB() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB\'ye başarıyla bağlanıldı.');
    } catch (error) {
        console.error('MongoDB\'ye bağlanılamadı:', error);
    }
}

connectDB();

const KitapSchema = new mongoose.Schema({
    adi:String,
    isbn:Number
})

const RafSchema = mongoose.Schema({
    adet:Number,
    kat:Number,
    adi:String
})

const Kitap = mongoose.model('Kitap', KitapSchema);
const Raf = mongoose.model('Raf',RafSchema);

app.get('/', (req,res,next) => {
    res.send('merahaba');
})

app.post('/kitap-ekle',async(req,res,next) => {
    const yeni_kitap = await Kitap.create(req.body);
    res.send(yeni_kitap);
});

app.get('/kitap-getir',async(req,res,next) => {
    const kitaplar = await Kitap.find();
    res.send(kitaplar);
})

app.post('/raf-ekle',async(req,res,next) => {
    const yeni_raf = await Raf.create(req.body);
    res.send(yeni_raf);
})

app.get('/raf-getir',async(req,res,next) => {
    const raflar = await Raf.find();
    res.send(raflar)
})

app.listen(3000, () => {
    console.log('sunucu 3000 portunda çalıştı.');
})
