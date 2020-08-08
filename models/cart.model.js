const mongoose = require('mongoose') ;



let cartSchema = mongoose.Schema({
    userId : String ,
    name : String , 
    price : Number , 
    amount : Number , 
    imageUrl : String , 
    timeStamp : Number
})

const DB_URL = 'mongodb://localhost:27017/E-commerce' ; 

let Cart = mongoose.model('cart' , cartSchema) ; 


exports.getUserCart = (userId)=>{
    return new Promise ((resolve , reject) => {
        mongoose.connect(DB_URL , { useNewUrlParser: true , useUnifiedTopology: true}).then(()=>{
           return Cart.find({userId : userId},{},{sort:{timeStamp:1}}).then(productsReturned => {
               mongoose.disconnect() ; 
               resolve(productsReturned) ;
           }).catch(err => {
               mongoose.disconnect() ;
               reject(err) ; 
           })
        })
    })
}


exports.addProductToCart = (userId , dataOfProduct)=>{
    return new Promise((resolve , reject)=>{
        mongoose.connect(DB_URL , { useNewUrlParser: true , useUnifiedTopology: true}).then(()=>{
            let newCart = new Cart({
                userId : userId , 
                name : dataOfProduct.name , 
                price : dataOfProduct.price ,
                amount : dataOfProduct.amount , 
                imageUrl : dataOfProduct.imageUrl ,  
                timeStamp : dataOfProduct.timeStamp
            })
           return newCart.save() ; 
            
        }).then(()=>{
            mongoose.disconnect() ; 
            resolve();
        }).catch(err => {
            mongoose.disconnect() ; 
            reject(err) ;
        })
        
    })
}


exports.editOne = (cartId , newData)=>{
    return new Promise ((resolve , reject) => {
        mongoose.connect(DB_URL , { useNewUrlParser: true , useUnifiedTopology: true}).then(()=>{
           return Cart.updateOne({_id:cartId} , newData)
           .then(result=>{
               mongoose.disconnect();
               resolve()
           })
            .catch(err => {
                mongoose.disconnect();
                reject(err)
            })
        })
    })
}

exports.deleteOne = (cartId)=>{
    return new Promise ((resolve,reject) =>{
        mongoose.connect(DB_URL , { useNewUrlParser: true , useUnifiedTopology: true}).then(()=>{
            
            return Cart.deleteOne({_id:cartId}).then(()=>{
                mongoose.disconnect();
                resolve();
            }).catch(err =>{
                mongoose.disconnect(); 
            
                reject(err) ;
            })
        })
    })

}


exports.deleteAll = (userId)=>{
    return new Promise((resolve , reject) => {
        mongoose.connect(DB_URL , { useNewUrlParser: true , useUnifiedTopology: true}).then(()=>{
            return Cart.deleteMany({userId:userId}).then(()=>{
                mongoose.disconnect();
                resolve()
            }).catch(err =>{
                mongoose.disconnect();
                reject(err)
            })
        })
    })
}