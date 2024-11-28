const express=require('express')

const signupcontroler =require('../Controler/SignUpControler')
const logincontroler =require('../Controler/LoginControler')

const router=express.Router();

router.post('/signup',signupcontroler);
router.post('/login',logincontroler);

module.exports= router;
