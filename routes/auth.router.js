const router=require('express').Router() ;
const bodyParserMW=require('body-parser').urlencoded({extended:true});
const authController = require('../controllers/auth.controller') ;
const check = require('express-validator').check ;
const authGuard = require('../routes/auth.guard') ;



/* start sign-up routing */ 


router.get('/sign-up',authGuard.isNotUser , (req,res,next)=>{
    res.render('sign-up',{
        vErrors : req.flash('validationErrorsArray') ,
        isUser : req.session.userId ,
        isAdmin : req.session.isAdmin ,
        title : 'Sign-Up'
    })
})

router.post('/sign-up', authGuard.isNotUser , bodyParserMW,
check('name').not().isEmpty().withMessage("This Field Can't Be Empty") ,
check('email').not().isEmpty().withMessage("This Field Can't Be Empty").isEmail().withMessage('Invalid Email Format') , 
check('pass').isLength({min:6}).withMessage('Minimum Length For This Field Is 6') , 
check('confirmPass').custom((value ,{req})=> {
    if(value === req.body.pass) return true ; 
    else throw 'Password Are Not Equal' ;
})

,
authController.postSignUp) ;


/* end login routing */ 



/* start login routing */ 

router.get('/login' , authGuard.isNotUser , (req,res,next)=>{
    res.render('login', {
        loginErr : req.flash('authErrors')[0]  ,
        vErrors : req.flash('validationErrsArray')  ,
        isUser : req.session.userId ,
        isAdmin : req.session.isAdmin  , 
        title : 'Login'
    })
})

router.post('/login' , authGuard.isNotUser ,bodyParserMW,
check('email').not().isEmpty().withMessage("This Field Can't Be Empty") ,
check('pass').not().isEmpty().withMessage("This Field Can't Be Empty")  , 
authController.postLogin) ;

router.all('/logout', authGuard.isUser, (req,res,next)=>{
    req.session.destroy(); 
    res.redirect('/') ;
})

/* end login routing */ 



module.exports = router ;

