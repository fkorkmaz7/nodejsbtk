// e-ticaret sepet : ödeme, adres, ürün

const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
app.use(express.json());

const MONGO_URI = "mongodb+srv://furkank1024:kartal712@cluster0.0wcf902.mongodb.net/eticaret";

async function connectDB(){
    try{
        await mongoose.connect(MONGO_URI);
        console.log('mongodb bağlantısı başarılı.');
    }
    catch(error){
        console.log("mongodb'e bağlanılamadı:",error);
    }
}

connectDB();

const OdemeScheme = new mongoose.Schema({
    odemeyontemi:String,
    miktar:Number,
    taksit_sayisi:Number
})

const AdresSchema = new mongoose.Schema({
    adres:String,
    postcode:Number,
    telnumber:Number,
})

const UrunSchema = new mongoose.Schema({
    urunadi:String,
    urunid:Number,
    urunadet:Number
})

const Odeme = mongoose.model('Odeme',OdemeScheme);
const Adres = mongoose.model('Adres',AdresSchema);
const Urun = mongoose.model('Urun',UrunSchema);

app.get('/',(req,res,next) =>{
    res.send('E-TİCARET SİTESİ MONGODB SEPET DEMO UYGULAMASINA HOŞGELDİNİZ!!!');
})

app.post('/odeme-ekle',async(req,res,next) =>{
    const yeni_odeme = await Odeme.create(req.body);
    res.send(yeni_odeme);
})

app.get('/odeme-getir',async(req,res,next) => {
    const odemeler = await Odeme.find();
    res.send(odemeler);
})

app.get('/odeme-getir',async(req,res,next) => {
    const sınır = req.body.sınır;
    const odemeler = await Odeme.find({miktar : {$gt :sınır}}); // büyükler içinde $gt kullanılacak 
    res.send(odemeler);
})

app.delete('/odeme-sil/:id',async(req,res,next) => {
    try{
        const silinen_odeme = await Odeme.findByIdAndDelete(req.params.id);
        if(!silinen_odeme){
            res.status(404).send('odeme bulunamadı.');
        }
        res.send('odeme silinmesi başarılı.');
    }
    catch(error){
        res.status(500).send(`silme sırasında bir hata oluştu: ${error.message}`);
    }
})

app.put('/odeme-guncelleme/:id',async(req,res,next) => {
    const odeme_id = await req.params.id;
    const body = req.body;
    const odeme = await Odeme.findByIdAndUpdate({_id:odeme_id},{miktar:body.miktar},{new:true});
    res.send(odeme);
})

app.put('/odeme-guncelleme',async(req,res,next) => {
    const body = req.body;
    try{
        const odeme = await Odeme.findOneAndUpdate(
            {miktar:body.miktar},
            {taksit_sayisi:body.taksit_sayisi},
            {new:true}
        );
        if(!odeme){
            res.status(500).send("odeme bilgileri bulanamadı.");
        }
        res.send(odeme);
    }
    catch(error){
        res.status(404).send(`odeme bilgileri güncellenirken hata oluştu : ${error.message}`);

    }
})

app.post('/adres-ekle',async(req,res,next) => {
    const yeni_adres = await Adres.create(req.body);
    res.send(yeni_adres);
})

app.get('/adres-getir',async(req,res,next) => {
    const adresler = await Adres.find();
    res.send(adresler);
})

app.delete('/adres-sil/:id',async(req,res,next) => {
    try{
        const silinen_adres = await Adres.findByIdAndDelete(req.params.id);
        if(!silinen_adres){
            res.status(404).send('adres bilgisi bulunamadı');
        }
        res.send('adres bilgisi başarıyla silindi')
    }
    catch(error){
        res.status(500).send(`Silme sırasında hata oluştu : ${error.message}`);
    }
})

app.put('/adres-guncelleme/:id',async(req,res,next) => {
    const adres_id = await req.params.id;
    const body = req.body;
    const adres = await Adres.findByIdAndUpdate({_id:adres_id},{postcode:body.postcode,telnumber:body.telnumber},{new:true});
    res.send(adres);
})

app.put('/adres-guncelleme', async(req,res,next) =>{
    const body = req.body;
    try{
        const adres = await Adres.findOneAndUpdate({postcode:body.postcode}, {telnumber:body.telnumber},{new:true});
        if(!adres){
            res.send('adres bulunamadı');
        }
        res.send(adres);
    }
    catch(error){
        res.status(404).send(`adres güncellenmesi yapilamadı : ${error.message}`);
    }
})

app.post('/urun-ekle',async(req,res,next) => {
    const yeni_urun = await Urun.create(req.body);
    res.send(yeni_urun);
})

app.get('/urun-getir',async(req,res,next) => {
    const urunler = await Urun.find();
    res.send(urunler);
})

app.get('/urun-getir', async(req,res,next) => {
    const urunadet = req.body.urunadet;
    const urunler = await Urun.findOne({urunadet : {$lt : 20}}); //gt büyük 
})

app.delete('/urun-sil/:id',async(req,res,next) => {
    try{
        const silinen_urun = await Urun.findByIdAndDelete(req.params.id);
        if(!silinen_urun){
            res.status(404).send('urun bilgisi bulunamadı');
        }
        res.send('urun bilgisi başarıyla silindi')
    }
    catch(error){
        res.status(500).send(`Silme sırasında hata oluştu : ${error.message}`);
    }
})

app.put('/urun-guncelleme/:id',async(req,res,next) => {
    const urun_id = await req.params.id;
    const body = req.body;
    const urun = await Urun.findByIdAndUpdate({_id:urun_id},{urunadet:body.urunadet},{new:true});
    res.send(urun);
})

app.put('/urun-guncelleme',async(req,res,next) => {
    const body = req.body;
    const urun = await Urun.findOneAndUpdate({urunid:body.urunid},{urunadet:body.urunadet},{new:true});
    res.send(urun);
})

app.get('/bonus', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/images/exp.jpg'));
});


app.listen(4000,()=>{
    console.log('4000 portuna bağlantı sağlandı');
})