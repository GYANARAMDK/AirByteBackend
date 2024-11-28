const express=require('express');
const dotenv=require('dotenv')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose=require('mongoose')




const app=express();
dotenv.config();

app.use(cors()); 
app.use(express.json());
app.use(cookieParser(''));


const CartRouter=require('./Router/CartRouter')
const AuthRouter=require('.//Router/AuthRouter')
const OrderRouter=require('.//Router/OrderRouter')
const SearchRouter=require('.//Router/SearchRouter')
const verifyAuthentication =require('./Controler/Middlewares/verifyauthentication');




mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
    console.log("conneted to mongodbatlas")
}).catch((error)=>{
    console.log(error)
})


app.use('api/user',AuthRouter);
app.use('api/user/order',verifyAuthentication,OrderRouter);
app.use('api/user/cart',verifyAuthentication,CartRouter);
app.use('api/search',SearchRouter);

app.get('/',(req,res)=>{
    res.send("server is started")
})


app.listen(4000,()=>{
    console.log("server is running now ")
})