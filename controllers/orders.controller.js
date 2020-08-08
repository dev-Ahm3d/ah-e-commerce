const orderModel = require('../models/orders.model') ;
const validationResult = require('express-validator').validationResult ; 

exports.postOrder = (req,res,next)=>{

    if(validationResult(req).isEmpty()){
        orderModel.addOrder({
            orderUserName : req.session.userName ,
            orderUserEmail : req.session.userEmail , 
            userId : req.session.userId , 
            productName : req.body.name , 
            address : req.body.address ,
            cost : req.body.price , 
            amount : req.body.amount , 
            date : Date.now() , 
            timeStamp : Date.now()
        },req.body.cartId).then(()=>{
            res.redirect('/')
        }).catch(err => res.redirect('/error'))
    }else {
        req.flash('oOneErrs' , validationResult(req).array()) ; 
        res.redirect('/order/orderOne') ;
    }
}



exports.orderAll = (req,res,next) =>{
    if(validationResult(req).isEmpty()) {
        orderModel.orderAll({
            orderUserName : req.session.userName , 
            orderUserEmail : req.session.userEmail , 
            uid : req.session.userId ,
            address : req.body.address , 
            date : Date.now() , 
            timeStamp :  Date.now() ,
        }).then(()=>{
            res.redirect('/') ;
        }).catch(err=>res.redirect('/error')) ;
    }else{
        req.flash('oAllErrs' , validationResult(req).array()) ; 
        res.redirect('/order/orderAll') ;
    }
}