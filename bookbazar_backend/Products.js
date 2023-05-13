const mongoose=require('mongoose')
const {Schema}=mongoose;
const ProductSchema=new Schema({
    title:{
        type:String,
        required:true 
    },
    imageurl:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    rating:{
        type:Number,
        required:true
    }
})
module.exports=mongoose.model('products',ProductSchema)


