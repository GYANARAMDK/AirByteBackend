const express=require('express');
const router=express.Router();

const CartAddControler=require('../Controler/CartAddControler')
const CartRemoveControler=require('../Controler/CartRemoveControler')
const CartUpdateControler=require('../Controler/CartUpdateControler.js')
const CartGetControler=require('../Controler/CartGetControler.js')

router.post('/add',CartAddControler);
router.get('/get',CartGetControler);
router.put('/removeitem',CartRemoveControler);
router.patch('/updateitem',CartUpdateControler);


module.exports=router;
