const mongoose = require('mongoose')

let productSchema = mongoose.Schema({
    name : String , 
    imageUrl : String , 
    price : Number , 
    category : String , 
    description : String ,
})



let Product = mongoose.model('product' , productSchema ) ; 
let DB_URL = 'mongodb://localhost:27017/E-commerce' ;



exports.getProductsByFilter = (category)=>{
    return new Promise((resolve , reject) =>{
        mongoose.connect(DB_URL , { useNewUrlParser: true , useUnifiedTopology: true} ).then( ()=>{
            return Product.find({category:category}).then(products => {
                mongoose.disconnect() ; 
                resolve(products) ;
            }).catch(err => reject(err))
        })
    })

}


exports.getAllProductsFromDb = ()=>{
    return new Promise((resolve , reject) =>{
        mongoose.connect(DB_URL , { useNewUrlParser: true , useUnifiedTopology: true} ).then( ()=>{
            return Product.find().then(products => {
                mongoose.disconnect() ; 
                resolve(products) ;
            }).catch(err => reject(err))
        })
    })

}


exports.getProductByIdFromDB = (id)=> {
    return new Promise((resolve , reject) => {
        mongoose.connect(DB_URL , { useNewUrlParser: true , useUnifiedTopology: true} ).then(()=>{
            return Product.find().then(products => {
                mongoose.disconnect() ;
                let arr = products.filter(element => element._id == id) ; 
                if(arr.length ==0 ) resolve ('error') ; 
                else resolve(arr[0]) ;
           }).catch(err => reject(err))
        })

    })
}

/*
لو اليوزر لعب ف اللينك هيحصل ايرور و الموقع هيعلق .. عشان الداتا بيز بتتكهرب لو استخدمت ميثود 
و اديتها البارميتر غلط 
هو الايررور بيحصل هنا عشان هو مستنى فورمات معين 
صيغة 12 بت او 24 هكس 
فجأة بيلاقي نفسه قدام هبل اليوزر كتبه ف الدنيا بتبوظ ف لازم اخلى بالى
*/ 




exports.addProduct = (productData)=>{
    return new Promise((resolve , reject) => {
        mongoose.connect(DB_URL , { useNewUrlParser: true , useUnifiedTopology: true} ) .then(()=>{
            let newProduct = new Product({
                name : productData.name , 
                imageUrl : productData.imageUrl , 
                price : productData.price , 
                category : productData.category , 
                description : productData.description ,
            })
            
            return newProduct.save()

        }).then(()=>{
            mongoose.disconnect() ; 
            resolve() ; 
        }).catch(err => {
            mongoose.disconnect() ; 
            reject(err) ; 
        })
    })
}