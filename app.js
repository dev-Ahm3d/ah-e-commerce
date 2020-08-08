const express = require('express') ; 
const app = express() ;
const path = require('path') ;
const flash = require('connect-flash') ; // importing flash

//session
const session = require('express-session') ; ;   // creat session
const SessionStore = require('connect-mongodb-session')(session) ;    // returns constructor

const myStore = new SessionStore({
    uri : 'mongodb://localhost:27017/E-commerce' , 
    collection : 'sessions' ,
    
})


app.use( express.static(path.join(__dirname , 'assets')) ) ; 
app.use( express.static(path.join(__dirname , 'images')) ) ; 
/*
بسبب ال ستاتيكس دى لازم اى لينك ف اى حتة ليها علاقة ب ال 
assets 
او 
images 
تبدأ ب سلاش مش تبدأ فاضية 
لأن الاتنين دول مكتوبين ف الملف الرئيسي
*/





app.set('view engine' , 'ejs') ;
app.set('views' , 'views') ;


// using session
app.use(session({
    secret : 'here we write anything ' ,
    saveUninitialized : false ,
    store:myStore , 
    resave:true
}))


//using flash 
app.use(flash());



const homeRouter = require('./routes/home.router') ;
app.use('/' , homeRouter )

const productDetailsRouter = require('./routes/product-details.router') ;
app.use( '/products' , productDetailsRouter )

const authRouter = require('./routes/auth.router') ;
app.use(  authRouter )

const cartRouter = require('./routes/cart.router') ;
app.use(  cartRouter )


const orderRouter = require('./routes/orders.router') ;
app.use(  orderRouter )

const manageOrdersRouter = require('./routes/manage-orders.router') ;
app.use(  manageOrdersRouter )

const addProductRouter = require('./routes/add-product.router') ;
app.use(  addProductRouter )

app.get('/error' , (req,res,next)=>{
    res.status(500) ;
    res.render('error', {
        isUser : req.session.isUser , 
        isAdmin : req.session.isAdmin , 
    })
})


app.use((req,res,next)=>{
    res.status(404) ;
    res.send('404 not found')
})


app.listen(3000, ()=> console.log('server is running ...'))