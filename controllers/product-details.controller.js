const productModel = require('../models/products.model') ; 
const cartModel = require('../models/cart.model');
const { validationResult } = require('express-validator');


exports.getProductById = (req,res,next)=> {
    productModel.getProductByIdFromDB(req.params.id).then(result => {

            res.render('product-details' , {
                product : result , 
                isUser : req.session.userId ,
                isAdmin : req.session.isAdmin ,
                title : result['name'] + ' | ' + result['category']   ,
                amountErrs : req.flash('amountErrs')
                
            })      
    })

}


exports.postCart = (req,res,next)=>{
    let pId = req.body.pId ;  
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
        res.redirect(`/products/${pId}`)
    }

    
}
