const Product = require("../Models/ProductModel")

const ProductPost = async (req, res) => {
    try {
        let { productName, brandName, description, currentPrice, previousPrice, stock, category, customerReviews, starRating, colors } = req.body;

        // Converting the data to lowercase
        productName = productName.toLowerCase();
        brandName = brandName.toLowerCase();
        description = description.toLowerCase();
        category = category.toLowerCase();
        colors = colors.toLowerCase();

        // Check if req.files exists and contains 'FeaturedImage' and 'galleryImages' properties
        const FeaturedImage = req.files && req.files['FeaturedImage'] ? req.files['FeaturedImage'][0].path : null;
        const galleryImages = req.files && req.files['galleryImages[]'] ? req.files['galleryImages[]'].map(file => file.path) : [];


        const newProduct = await Product.create({
            productName,
            brandName,
            FeaturedImage,
            galleryImages,
            description,
            currentPrice,
            previousPrice,
            stock,
            category,
            customerReviews,
            starRating,
            colors
        })

        return res.status(201).json({ message: "New Product Create Successfully" })
    } catch (error) {
        console.error("Product creation error:", error)
        return res.status(400).json({ message: "New Product Creation Failed" })

    }

}

const ProductGet = async (req, res) => {
    try {
        const ProductData = await Product.find();
        return res.status(200).json({ message: ProductData })
    } catch (error) {
        return res.status(400).json({ message: error })

    }
}

const SingleProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const getIdData = await Product.findOne({ _id: id });
        if (!getIdData) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json({ message: getIdData })

    } catch (error) {
        return res.status(400).json({ message: error })
    }
}

const ProductID = async (req, res) => {
    try {

        const id = req.params.id;
        const getIdData = await Product.findOne({ _id: id });
        if (!getIdData) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json({ message: getIdData })

    } catch (error) {
        return res.status(400).json({ message: error })
        console.log(error)
    }
}

const ProductUpdated = async (req, res) => {
    try {
        const id = req.params.id;
        let { productName, brandName, description, currentPrice, previousPrice, stock, category, customerReviews, starRating, colors } = req.body;

        // Converting the data to lowercase
        productName = productName.toLowerCase();
        brandName = brandName.toLowerCase();
        description = description.toLowerCase();
        category = category.toLowerCase();
        // colors = colors.toLowerCase();
        colors = colors.map(color => color.toLowerCase())

        // Check if req.files exists and contains 'FeaturedImage' and 'galleryImages' properties
        let FeaturedImage = req.files && req.files['FeaturedImage'] ? req.files['FeaturedImage'][0].path : null;

        let galleryImages = req.files && req.files['galleryImages[]'] ? req.files['galleryImages[]'].map(file => file.path) : [];
        // If 'FeaturedImage' is not provided in the request, keep its previous value
        if (!FeaturedImage && req.body.FeaturedImage) {
            FeaturedImage = req.body.FeaturedImage;
        }


        // If 'galleryImages' are not provided in the request, keep their previous value
        if (galleryImages && req.body.galleryImages) {
            galleryImages = [...req.body.galleryImages, ...galleryImages];
        }
        if(!galleryImages && req.body.galleryImages){
            galleryImages = [...req.body.galleryImages];
        }
        if(galleryImages && !req.body.galleryImages){
            galleryImages = [...galleryImages];
        }

        // Merge previous and new values of 'galleryImages'
        // let mergedGalleryImages = [...req.body.galleryImages, ...newGalleryImages];

        // console.log(galleryImages)



        const Data = { productName, brandName, FeaturedImage, galleryImages, description, currentPrice, previousPrice, stock, category, customerReviews, starRating, colors }


        const newProduct = await Product.updateOne({ _id: id }, { $set: Data })

        return res.status(201).json({ message: "Product updated Successfully" })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: "Internal server error" });

    }
}

const DeleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const DeleteProductId = await Product.deleteOne({ _id: id });
        if (!DeleteProductId) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json({ message: "Deleted Successfully" })

    } catch (error) {
        return res.status(400).json({ message: "Error in deleting product" })
        console.log(error)
    }
}

module.exports = { ProductPost, ProductGet, ProductID, ProductUpdated, SingleProduct, DeleteProduct }