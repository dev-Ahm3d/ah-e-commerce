const router = require('express').Router() ; 
const manageOrdersController = require('../controllers/manage-orders.controller') ;
const bodyParserMw = require('body-parser').urlencoded({extended : true}) ;
const authGuard = require('../routes/auth.guard')


router.get('/manage-orders' , authGuard.isAdmin ,manageOrdersController.getManageOrders ) ;


router.post('/manage-orders' ,  bodyParserMw, authGuard.isAdmin , manageOrdersController.editOrderSt ) ;






module.exports = router ; 