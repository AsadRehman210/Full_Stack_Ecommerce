const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { ProductPost, ProductGet, ProductID, ProductUpdated, SingleProduct, DeleteProduct } = require("../Controllers/DBProductController");
// const { CheckDBProductPermission } = require("../Middleware/CheckDBProductPermission");
const authMiddleware = require("../Middleware/authMiddleware");
const { PermissionMiddleware } = require("../Middleware/PermissionMiddleware");

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    }
});

const upload = multer({ storage: storage });

// Post the Product Data in Database
router.route("/product_Data/post").post(upload.fields([
    { name: 'FeaturedImage', maxCount: 1 },
    { name: 'galleryImages[]', maxCount: 5 }
]), authMiddleware, PermissionMiddleware, ProductPost);

// Get the Product Data from DataBase
router.route("/product_Data/get").get(ProductGet)

//Get the Single Product ID for single page Detail for user
router.route("/product_Data/Single_Product/get/:id").get(SingleProduct)

// Get the individual Product ID for update from DataBase
router.route("/product_Data/get/:id").get(authMiddleware, PermissionMiddleware, ProductID);

// Delete the Single Product from DataBase
router.route("/product_Data/Delete/:id").delete(authMiddleware, PermissionMiddleware, DeleteProduct);

// Delete the Product through Category from DataBase
router.route("/product_Data/Category/Delete/:id").delete(authMiddleware, PermissionMiddleware, DeleteProduct);

// Update the individual Product in respective id
router.route("/product_Data/post/:id").put(upload.fields([
    { name: 'FeaturedImage', maxCount: 1 },
    { name: 'galleryImages[]', maxCount: 5 }
]), authMiddleware, PermissionMiddleware, ProductUpdated)
module.exports = router;
