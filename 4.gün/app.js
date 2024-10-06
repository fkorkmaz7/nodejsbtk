const express = require('express');
const mongoose = require('mongoose');
const odemeRoutes = require('./routes/odeme');
const adresRoutes = require('./routes/adres');
const urunRoutes = require('./routes/urun');

const app = express();
app.use(express.json());

const MONGO_URI = "mongodb+srv://furkank1024:kartal712@cluster0.0wcf902.mongodb.net/eticaret";

async function connectDB() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB bağlantısı başarılı.');
    } catch (error) {
        console.log("MongoDB bağlantısı başarısız:", error);
    }
}

connectDB();

app.use('/odeme',odemeRoutes);
app.use('/adres',adresRoutes);
app.use('/urun',urunRoutes);


app.get('/',(req,res,next) => {
    res.send('E TİCARET WEB SİTESİNE HOŞGELDİNİZ');
})

app.listen(3000, () => {
    console.log('3000 portuna bağlantı sağlandı.');
})