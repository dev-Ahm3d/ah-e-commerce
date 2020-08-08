const router = require('express').Router(); 
const cartController = require('../controllers/cart.controller') ;
const bodyParserMW = require('body-parser').urlencoded({extended:true}) ;
const authGuard = require('./auth.guard') ;

const check = require('express-validator').check ;

router.get('/cart' , authGuard.isUser , cartController.getCart ) ; 


router.post('/cart' , bodyParserMW , 
check('amount')
.notEmpty().withMessage("This Field Can't Be Empty")
.isInt({min:1}).withMessage("Amount Can't Be Smaller Than 1")  , 
authGuard.isUser
 ,cartController.postCart ) ; 

router.post('/cart/editOne' , bodyParserMW , 
check('amountEdit')
.notEmpty().withMessage("This Field Can't Be Empty")
.isInt({min:1}).withMessage("Amount Can't Be Smaller Than 1")  
, authGuard.isUser ,cartController.editCart ) ; 

router.post('/cart/deleteOne' , bodyParserMW , authGuard.isUser,cartController.deleteCart ) ; 
router.post('/cart/deleteAll' , bodyParserMW , authGuard.isUser ,cartController.deleteAllUserCarts ) ; 









module.exports = router ; 