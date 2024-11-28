const express=require('express');
const router=express.Router();

const CartAddControler=require('../Controler/CartAddControler')
const CartRemoveControler=require('../Controler/CartRemoveControler')
const CartUpdateControler=require('../Controler/CartUpdateControler.js')
const CartGetControler=require('../Controler/CartGetControler.js')

router.post('/Add',CartAddControler);
router.get('/',CartGetControler);
router.put('/removeitem',CartRemoveControler);
router.patch('/updateitem',CartUpdateControler);


module.exports=CartAddControler;
