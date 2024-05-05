const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    brandName:{
        type:String,
        required:true
    },
    FeaturedImage:{
        type:String,
        required:true
    },
    galleryImages:{
        type:Array,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    currentPrice:{
        type:Number,
        required:true
    },
    previousPrice:{
        type:Number,
        required:true
    },
    stock:{
        type:Number,
        required:true

    },
    category:{
        type:String,
        required:true

    },
    customerReviews:{
        type:Number,
        required:true

    },
    starRating:{
        type:Number,
        required:true

    },
    colors:{
        type:Array,
        required:true

    },
    isFeatured:{
        type:String,
        default: false

    }

});

const Product = new mongoose.model("Product", ProductSchema);

module.exports = Product