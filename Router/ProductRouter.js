const express=require('express')

const ProductGetControler =require('../Controler/ProductGetControler')

const router =express.Router();

router.get('/',ProductGetControler);

module.exports=router;