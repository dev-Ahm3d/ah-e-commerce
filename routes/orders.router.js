const router = require('express').Router(); 
const bodyParserMW = require('body-parser').urlencoded({extended:true}) ;
const authGuard = require('./auth.guard') ;
const orderController = require('../controllers/orders.controller') ;
const check  = require('express-validator').check;


router.get('/order/orderOne' , authGuard.isUser ,(req,res,next)=>{
    res.render('orderOne',{
        isUser : req.session.userId ,
        name : req.query.name ,
        amount : req.query.amount ,
        price : req.query.price ,
        cartId : req.query.cartId ,
        oOneErrs : req.flash('oOneErrs') ,
        isAdmin : req.session.isAdmin ,
        title : 'Order'

    }) 
}) 

router.post('/order/orderOne' ,bodyParserMW,
check('address').notEmpty().withMessage("This Field Can't Be Empty" ) ,
  authGuard.isUser , orderController.postOrder )


router.get('/order/orderAll',authGuard.isUser,(req,res,next)=>{
     res.render('orderAll' , {
         isUser : req.session.userId  , 
         isAdmin : req.session.isAdmin ,
         oAllErrs : req.flash('oAllErrs') ,
         title : 'Order'
     }) ;
})

router.post('/order/orderAll',bodyParserMW , 
check('address').notEmpty().withMessage("This Field Can't Be Empty" ) ,
authGuard.isUser , orderController.orderAll)




module.exports = router ; 