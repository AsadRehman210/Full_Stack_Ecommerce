const express = require("express");
const { getOrder, getIndividualOrderData, getPendingOrder, getDeliveredOrder, deleteIndividualOrderData } = require("../Controllers/OrderController");
const authMiddleware = require("../Middleware/authMiddleware");
const { PermissionMiddleware } = require("../Middleware/PermissionMiddleware");
const router = express.Router();

// get All Order Data
router.route("/getAllOrderData").get(authMiddleware, PermissionMiddleware, getOrder);

// get individual id Data
router.route("/getIndividualOrderData/:id").get(authMiddleware, getIndividualOrderData);

// get Pending Order Data
router.route("/getAllPendingOrderData").get(authMiddleware, PermissionMiddleware, getPendingOrder);

// get Delivered Order Data
router.route("/getAllDeliveredOrderData").get(authMiddleware, PermissionMiddleware, getDeliveredOrder);

// Delete Individual Order ID Data
router.route("/deleteIndividualOrderData/:id").delete(authMiddleware, PermissionMiddleware, deleteIndividualOrderData);

module.exports = router;