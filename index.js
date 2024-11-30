const express=require('express');
const dotenv=require('dotenv')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose=require('mongoose')




const app=express();
dotenv.config();

app.use(cors()); 
app.use((req,res,next)=>{
    console.log(`${req.path} and ${req.method}`)
    next();
})
app.use(express.json());
app.use(cookieParser(''));


const CartRouter=require('./Router/CartRouter')
const AuthRouter=require('.//Router/AuthRouter')
const OrderRouter=require('.//Router/OrderRouter')
const SearchRouter=require('.//Router/SearchRouter')
const verifyAuthentication =require('./Controler/Middlewares/verifyauthentication');
const ProductRouter=require('.//Router/ProductRouter');



mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
    console.log("conneted to mongodbatlas")
}).catch((error)=>{
    console.log(error)
})


app.use('/user',AuthRouter);
app.use('/user/orders',verifyAuthentication,OrderRouter);
app.use('/user/cart',verifyAuthentication,CartRouter);
app.use('/products/search',SearchRouter);
app.use('/products',ProductRouter);

app.get('/',(req,res)=>{
    res.send("server is started")
})


app.listen(4000,()=>{
    console.log("server is running now ")
})