const router = require('express').Router() ; 
const productDetailsController = require('../controllers/product-details.controller') ; 
const bodyParserMW = require('body-parser').urlencoded({extended:true}) ;
const check = require('express-validator').check ; 

router.get('/:id' , productDetailsController.getProductById) ;

router.post('/:id' ,  bodyParserMW , 
check('amount').notEmpty().withMessage("This Field Can't Be Empty") , 
check('amount').isInt({min:1}).withMessage("Amount Can't Be Smaller Than 1 ")  
, productDetailsController.postCart) ;


module.exports = router ; 
