const express = require("express");
const { createPermissionController, updatePermissionController, deletePermissionController, getPermissionController, getIndividualPermissionController, getAdminUsers, getOtherUsers, deleteIndividualAdminUserController } = require("../Controllers/PermissionController");
const authMiddleware = require("../Middleware/authMiddleware");
const { PermissionMiddleware } = require("../Middleware/PermissionMiddleware");
const router = express.Router();

router.route("/getPermission").get(authMiddleware, PermissionMiddleware, getPermissionController);
router.route("/createPermission").post(authMiddleware, PermissionMiddleware,createPermissionController);
router.route("/updatePermission/:id").put(authMiddleware, PermissionMiddleware, updatePermissionController);
router.route("/deletePermission/:id").delete(authMiddleware, PermissionMiddleware, deletePermissionController);


// Get the individual Product ID for update from DataBase
router.route("/getIndividualPermission/:id").get(authMiddleware, getIndividualPermissionController);






module.exports = router