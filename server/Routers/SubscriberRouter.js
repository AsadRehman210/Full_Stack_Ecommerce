const express = require("express");
const { postSubscriber, getSubscriber, deleteSubscriber } = require("../Controllers/SubscriberController");
const authMiddleware = require("../Middleware/authMiddleware");
const { PermissionMiddleware } = require("../Middleware/PermissionMiddleware");
const router = express.Router();

router.route("/list").post(postSubscriber)
router.route("/getsubscriber").get(authMiddleware, PermissionMiddleware, getSubscriber);
router.route("/deletesubs/:id").delete(authMiddleware,PermissionMiddleware, deleteSubscriber)

module.exports = router