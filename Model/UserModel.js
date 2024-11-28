const mongoose=require('mongoose');


const UserSchema=mongoose.Schema({
    name:{type: String,required:true,unique:false},
    phone:{type: String,required:true,unique:true},
    password:{type: String,required:true,unique:false},
    CartArray:[{
        productId:{type:mongoose.Schema.Types.ObjectId,required:true, ref:'Product'},
        quantity:{type:Number,default:1,required:true},
        price:{type:Number,required:true},
    }],
},{timestamps:true})

const User=mongoose.model("User",UserSchema)
module.exports = User;