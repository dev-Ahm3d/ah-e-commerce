const router = require('express').Router() ;
const bodyParserMW = require('body-parser').urlencoded({extended:true}) ; 
const multer = require('multer') ; 
const authGuard = require('../routes/auth.guard') ;
const addProductController = require('../controllers/add-product-controller') ; 
const check = require('express-validator').check ; 




const upload = multer({
    storage : multer.diskStorage({
        destination : (req, file , callBF)=> {
            callBF(null , 'images')
            
        } , 
        filename : (req , file , callBF) =>{
            callBF(null , Date.now()+'-'+file.originalname) ; 
        } ,
    
    }) , fileFilter : (req,file,callBF)=>{
        if(file.mimetype.startsWith('image/')) callBF(null , true) ; 
        else{
            callBF(null,false) ;
            callBF(new Error('These Types Of Files Are Not Supported')) ; 
        } 
    } ,     
}).single('imageField') ;


router.get('/add-product' , authGuard.isAdmin , (req,res,next) => {
    res.render('add-product' , {
        isUser : req.session.userId , 
        isAdmin : req.session.isAdmin , 
        imageUploadErr : req.flash('imageUploadErrs')[0] , 
        addPErrs : req.flash('addPErrs') , 
        title : 'Admin | Add-Product'  ,
        upErr:req.flash('upErr')[0]       
    }) ;
})





router.post('/add-product' ,authGuard.isAdmin  ,bodyParserMW, 
(req,res,next)=>{
    upload(req,res,(err)=>{
        if(err){
            req.flash('upErr', err.message) ; 
            res.redirect('/add-product')
        } else next() ;
        
    }) 
} ,

check('imageField').custom((inputValue , {req}) =>{
    if(req.file != null && req.file != undefined ) return true ; 
    else throw 'You Must Upload Image !' ; 
}) , 
check('pName').notEmpty().withMessage("This Filed Can't Be Empty") , 
check('pPrice').notEmpty().withMessage("This Filed Can't Be Empty") , 
check('pDescription').notEmpty().withMessage("This Filed Can't Be Empty") , 




addProductController.addProductPost  )

module.exports = router ; 