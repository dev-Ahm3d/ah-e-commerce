const authModel = require('../models/auth.model') ;
const validationResult = require('express-validator').validationResult ;


/* start sign-up controller*/
exports.postSignUp=(req,res,next)=>{
    if(validationResult(req).isEmpty()) {
        authModel.addNewUser(req.body.name , req.body.email , req.body.pass ).then(()=>{
            res.redirect('/login')
        }).catch(err => {
            res.redirect('/sign-up')
        })

    }
    else {
        req.flash('validationErrorsArray' , validationResult(req).array()) ;
        res.redirect('/sign-up') ;
    }
    
}

/* end sign-up controller*/




/* start login controller*/


exports.postLogin=(req,res,next)=>{
    
    if(validationResult(req).isEmpty()) {
        authModel.loginByEmail( req.body.email , req.body.pass ).then(user=>{
            req.session.userId = user._id;
            req.session.userEmail = user.email ;
            req.session.userName = user.name ;
            req.session.isAdmin = user.isAdmin ; 

            res.redirect('/')
        }).catch(err => {
            req.flash('authErrors' ,err) ; 
            res.redirect('/login')
        })
        
     }else {
        req.flash('validationErrsArray' , validationResult(req).array()) ;
        res.redirect('/login') ; 
     }
   
}

/* end login controller*/
