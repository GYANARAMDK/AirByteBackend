const express=require('express');

const ordergetcontroler=require('../Controler/OrderGetControler');
const orderpostcontroler=require('../Controler/OrderPostControler');


const router=express.Router();



router.get('/',ordergetcontroler);
router.post('/',orderpostcontroler);

module.exports=router
