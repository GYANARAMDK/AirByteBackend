const mongoose = require('mongoose')
const CryptoJS = require('crypto-js')
const dotenv=require('dotenv')
dotenv.config();
const UserModel = require('../Model/UserModel.js')


const SignUpControler = async (req, res) => {
    const { name, phone, password } = req.body;

    try {
        const NewUser = await UserModel.findOne({ phone })
        if (NewUser) {
            return res.status(400).json({ message: 'Phone number already registered' });
        }
        const encryptedpassword = CryptoJS.AES.encrypt(password,process.env.SECRET_KEY).toString();
        NewUser= new UserModel({
            name,
            password:encryptedpassword,
            phone
        })
        await NewUser.save();
        res.status(201).json({ message: "user registered successfully"})
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
    

}
module.exports = SignUpControler;