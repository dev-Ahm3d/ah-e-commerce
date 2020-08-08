const router = require('express').Router(); 
const homeController = require('../controllers/home.controller')
const bodyParserMW = require('body-parser').urlencoded({extended:true})


router.get('/' ,  homeController.getProducts ) ; 


module.exports = router ; 