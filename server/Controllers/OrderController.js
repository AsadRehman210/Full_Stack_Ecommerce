const Order = require("../Models/OrderModel");

const getOrder = async (req, res) => {
    try {
        const OrderData = await Order.find();
        return res.status(200).json({ message: OrderData })
    } catch (error) {
        return res.status(400).json({ message: error })

    }
}

const getIndividualOrderData = async(req, res)=>{
    try {
        const id = req.params.id;
        const getOrderData = await Order.findOne({ _id: id });
        if (!getOrderData) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json({ message: getOrderData })

    } catch (error) {
        return res.status(400).json({ message: error })
    }
}

const getPendingOrder = async (req, res) =>{
    try {
        const OrderData = await Order.find({delivery_status: "pending"});
        return res.status(200).json({ message: OrderData })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: error })

    }
}

const getDeliveredOrder = async(req, res)=>{
    try {
        const OrderData = await Order.find({delivery_status: "delivered"});

        return res.status(200).json({ message: OrderData })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: error })

    }
}

const deleteIndividualOrderData = async(req, res)=>{
    try {
        const id = req.params.id;
        const DeleteOrderId = await Order.deleteOne({ _id: id });
        if (!DeleteOrderId) {
            return res.status(404).json({ message: "Order not found" });
        }
        return res.status(200).json({ message: "Deleted Successfully" })

    } catch (error) {
        return res.status(400).json({ message: "Error in deleting product" })
        
    }
}

module.exports = { getOrder, getIndividualOrderData, getPendingOrder, getDeliveredOrder, deleteIndividualOrderData }