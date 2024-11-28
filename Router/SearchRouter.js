const express=require('express');

const SearchControler=require('../Controler/SearchControler');

const router=express.Router();

router.get('/',SearchControler);

module.exports=SearchControler;