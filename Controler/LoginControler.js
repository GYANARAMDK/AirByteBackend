const mongoose=require('mongoose');
const UserModel=require('../Model/UserModel');
const CryptoJs=require('crypto-js')
const jwt= require('jsonwebtoken')


const LoginControler = async(req,res) =>{
    const {password, phone}=req.body;
    try {
        const User= await UserModel.findOne({phone});
        if(!User){
            return res.status(404).json({ message: 'User not found!' });
        }
        const decryptedpassword = CryptoJs.AES.decrypt(User.password,process.env.SECRET_KEY_PASSWORD).toString(CryptoJS.enc.Utf8);
        if(password!==decryptedpassword){
            return res.status(401).json({ message: 'Invalid credentials!' });
        }
        const token=jwt.sign({id:User._id},process.env.JWT_SECRET_KEY,{expiresIn:'12h'});
        const {password,...rest}=User.toObject();
        res.status(200).json({message:"login successfully",user:rest,token});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong!', error });
    }
    
}

module.exports=LoginControler;