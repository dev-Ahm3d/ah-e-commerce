const mongoose =require('mongoose') ; 
const bcrypt = require('bcrypt') ;
const userSchema = mongoose.Schema({
    name : String , 
    email : String , 
    password : String , 
    isAdmin : {
        type : Boolean , 
        default : false ,
    }
})


const User = mongoose.model('user' , userSchema) ; 

const DB_URL = 'mongodb://localhost:27017/E-commerce' ; 

exports.addNewUser = (name , email , password)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL , { useNewUrlParser: true , useUnifiedTopology: true} ).then(()=>{
            return User.findOne({email:email}).then(userFound=>{
                if(userFound) {
                    mongoose.disconnect() ; 
                    reject('this email is repeated')
                }else {
                   return bcrypt.hash(password,10)
                   .then(hashedPass => {
                       
                       
                      let newUser = new User ( {
                           name : name , 
                           email : email , 
                           password : hashedPass ,
                       })
                        return newUser.save() ; 
                   })
                   .then(()=> {
                    mongoose.disconnect() ;
                    resolve() ;
                   }).catch(err => {
                    mongoose.disconnect() ;
                    reject(err)
                   })
                }
            })
        })

    })
}



exports.loginByEmail = (email, pass)=>{
    return new Promise((resolve , reject)=>{
        mongoose.connect(DB_URL , { useNewUrlParser: true , useUnifiedTopology: true} ).then(()=>{
           return User.findOne({email:email}).then(userFound => {
               if(userFound) {
                  return bcrypt.compare(pass , userFound.password)
                  .then(passIsOk => {
                      if(passIsOk == true) {
                        mongoose.disconnect() ; 
                        resolve(userFound);
                      }else{
                        mongoose.disconnect() ;
                          reject ('pass is wrong')
                      }
                      
                  })
                  
               }else{
                   mongoose.disconnect(); 
                   reject('this user not found') ;
               }
           })

        })

    })
}