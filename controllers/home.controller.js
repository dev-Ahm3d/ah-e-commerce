const productModel = require('../models/products.model') ; 

exports.getProducts = (req,res,next)=>{

    let myCategries = ['phones', 'labtops']
    
    if(req.query.category && req.query.category != 'all' && myCategries.includes( req.query.category) ) {
        productModel.getProductsByFilter(req.query.category).then(products=>{
            res.render('home' , {
                products : products , 
                isUser : req.session.userId ,
                amountErrs : req.flash('amountErrs') ,
                isAdmin : req.session.isAdmin ,
                title : 'Home'

            })
        }).catch(err => res.redirect('/error') )
        
    }else{
        
        productModel.getAllProductsFromDb().then(products =>{
            res.render('home' , {
                products : products , 
                isUser : req.session.userId ,
                amountErrs : req.flash('amountErrs') ,
                isAdmin : req.session.isAdmin ,
                title : 'Home'
            })
        }).catch(err => res.redirect('/error'))
        
    }
    
}

