const cartModel = require('../models/cart.model') ; 
const validationResult = require('express-validator').validationResult ;

exports.getCart = (req,res,next)=>{
    cartModel.getUserCart(req.session.userId).then( userCart =>{
        res.render('cart' , {
            userCart : userCart  , 
            isUser : req.session.userId , 
            editErrs : req.flash('editErrs') ,
            isAdmin : req.session.isAdmin , 
            title : 'Cart'
        })
    })
}


exports.postCart = (req,res,next)=>{
    if(validationResult(req).isEmpty()) {
        cartModel.addProductToCart(req.session.userId , {
            name : req.body.name , 
            price : req.body.price ,
            amount : req.body.amount , 
            imageUrl : req.body.imageUrl ,
            timeStamp : Date.now()
        }).then( () =>{
            res.redirect('/') ; 
        }).catch(err => res.redirect('/error')) ;
    }else {
        req.flash('amountErrs' , validationResult(req).array())
        res.redirect('/')
    }
    
}


exports.editCart = (req,res,next)=>{
    if(validationResult(req).isEmpty()) {
        cartModel.editOne(req.body.cartId,{ 
            amount : +req.body.amountEdit , 
            timeStamp : Date.now()
        }).then(() =>{
            res.redirect('/cart') ; 
        }).catch(err => res.redirect('/error')) ;
    }else {
        req.flash('editErrs' , validationResult(req).array()) ; 
        res.redirect('/cart') ;
    }
    
}




exports.deleteCart = (req,res,next)=>{
    
    cartModel.deleteOne(req.body.cartId).then(() =>{
        res.redirect('/cart') ; 
    }).catch(err => res.redirect('/error')) ;
    
}


exports.deleteAllUserCarts = (req,res,next)=>{
    
    cartModel.deleteAll(req.session.userId).then(() =>{
        res.redirect('/cart') ; 
    }).catch(err => res.redirect('/error')) ;
    
}



