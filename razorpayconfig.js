const razorpay=require('razorpay');

const razorpayIntance= new razorpay({
    key_id: process.env.key_id,
    key_secret:process.env.key_secret
});

module.exports=razorpayIntance;