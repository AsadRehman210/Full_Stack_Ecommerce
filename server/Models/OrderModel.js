const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    orderId: {type: String},
    userId: { type: String },
    customerId: { type: String },
    paymentIntentId: { type: String },
    products: [
        {
            id: { type: String, required: true },
            name: { type: String, required: true },
            quantity: { type: Number, required: true },
            image: { type: String, required: true },
            brand: { type: String, required: true },
            color: { type: String, required: true },
            price: { type: String, required: true },
            category: { type: String, required: true }
        }
    ],
    subTotal: { type: Number, required: true },
    total: { type: Number, required: true },
    shipping: { type: Object, required: true },
    delivery_status: { type: String, default: "pending" },
    payment_status: { type: String, required: true }





}, { timestamps: true })

const Order = new mongoose.model("Order", OrderSchema);

module.exports = Order;