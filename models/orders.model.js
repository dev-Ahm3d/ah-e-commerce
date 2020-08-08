const mongoose = require('mongoose') ; 

const orderSchema = mongoose.Schema({
    orderUserName : String ,
    orderUserEmail : String , 
    userId : String ,
    productName : String , 
    address : String , 
    cost : Number , 
    amount : Number , 
    date : Date , 
    timeStamp : Number  , 
    status:{
        type:String,
        default:'pending',
    },
})

const Order = mongoose.model('order' , orderSchema) ; 
DB_URL = 'mongodb://localhost:27017/E-commerce'


exports.addOrder = (data,cartId)=>{
    return new Promise((resolve , reject) => {
        mongoose.connect(DB_URL , { useNewUrlParser: true , useUnifiedTopology: true} )
        .then(()=>{
            
            let newOrder = new Order({
                    orderUserName : data.orderUserName ,
                    orderUserEmail : data.orderUserEmail , 
                    userId : data.userId ,
                    productName : data.productName , 
                    cost : data.cost , 
                    address : data.address , 
                    amount : data.amount , 
                    date : data.date , 
                    timeStamp : data.timeStamp 
            }) 
               return newOrder.save() ;

        }).then(dataSaved=>{
            let c=dataSaved.name ;
              mongoose.connection.db.collection('carts' , (err,result)=>{
                  result.deleteOne({name : dataSaved.productName ,userId : dataSaved.userId }).then(()=>{
                      mongoose.disconnect();
                      resolve();
                  }).catch(dErr => {
                    mongoose.disconnect();
                    reject(dErr);
                  })
                  
              })
        }).catch(err =>{
            mongoose.disconnect() ;
            reject(err);
        })
        
    })
}




/*
الفانكشن الجاية دى بتعمل حاجات كتير ورا بعض 
اولا بتجيب كل الدكيومنتس بتاعت اليوزر الحالى من كوليشكن كارت و بعدين تحط كل واحدة فيهم ك اوردر
ف كوليشكن اوردرس 
بعد م تعمل كدة بتروح تمسح اى كارت تبع اليوزر ده 
*/

exports.orderAll = (data)=>{
    let userId = data.uid.toString() ;   // عشان اللى بيرجعلى من ال سيشن بيكون اوبجكت
    return new Promise ((resolve , reject)=>{
        mongoose.connect(DB_URL , { useNewUrlParser: true , useUnifiedTopology: true} ).then(()=>{
            mongoose.connection.db.collection('carts',(err,collection)=>{
               return collection.find({userId : userId}).toArray().then(userCarts=>{
                let  arrOfOrders = [] ;
                
                    return new Promise((r,rj)=>{
                        for(let i=0;i<userCarts.length;i++){
                            arrOfOrders.push ({
                                    orderUserName : data.orderUserName ,
                                    orderUserEmail : data.orderUserEmail , 
                                    userId : userId ,
                                    productName : userCarts[i].name , 
                                    cost : userCarts[i].price , 
                                    address : data.address , 
                                    amount : userCarts[i].amount , 
                                    date : data.date , 
                                    timeStamp : data.timeStamp 
                            })                      
                          }
                          if(arrOfOrders.length !=0 ) r(arrOfOrders) ; 
                    }).then(arrOfOrders => {
                        return Order.create(arrOfOrders).then(()=>{
                            mongoose.connection.db.collection('carts',(err , collection)=>{
                                collection.deleteMany({userId:userId}) ;
                            })
                        })
                    })


                }).then(()=>{
                    mongoose.disconnect(); 
                    resolve() ;
                }).catch(err => {
                    mongoose.disconnect() ; 
                    reject(err) ;
                }) 
              })
            })
            
        })
}






exports.getAllOrders = ()=>{
    return new Promise((reolve,reject)=>{
        mongoose.connect(DB_URL , { useNewUrlParser: true , useUnifiedTopology: true}).then(()=>{
           return Order.find().then(allorders => {
               mongoose.disconnect();
                reolve(allorders)
            }).catch(err =>{
                mongoose.disconnect() ;
                reject(err) ;
            })
        })
    })
}


exports.editOrderSt = (orderId ,newSt)=>{
    return new Promise((reolve,reject)=>{
        mongoose.connect(DB_URL , { useNewUrlParser: true , useUnifiedTopology: true}).then(()=>{
           return Order.updateOne({_id:orderId},{status:newSt}).then(() => {
               mongoose.disconnect();
                reolve()
            }).catch(err =>{
                mongoose.disconnect() ;
                reject(err) ;
            })
        })
    })

}


