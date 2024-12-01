const express=require('express');

const ordergetcontroler=require('../Controler/OrderGetControler');
const orderpostcontroler=require('../Controler/OrderPostControler');
const orderverifycontroler=require('../Controler/OrderVerifyControler');


const router=express.Router();


router.post('/verify',orderverifycontroler);
router.get('/',ordergetcontroler);
router.post('/',orderpostcontroler);

module.exports=router
