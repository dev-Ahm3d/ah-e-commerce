const productsModel = require('../models/products.model') ; 
const validationResult = require('express-validator').validationResult ;

exports.addProductPost = (req,res,next)=>{
   
    
    if(validationResult(req).isEmpty()) {
    productsModel.addProduct({
        name : req.body.pName , 
        price : req.body.pPrice ,
        category : req.body.pCategory ,
        description : req.body.pDescription , 
        imageUrl : req.file.filename
    }).then(()=> res.redirect('/add-product'))
    .catch(err => {
        res.redirect('/error')
    }) 
   }else {
       req.flash('imageUploadErrs' , validationResult(req).array()) ;
       req.flash('addPErrs' , validationResult(req).array())
       res.redirect('/add-product') ; 
   }

   

}