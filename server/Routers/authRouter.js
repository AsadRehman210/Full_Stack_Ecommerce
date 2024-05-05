const express = require("express");
const router = express.Router();
const { register, login, getIndividualUserController, updateIndividualUserController, deleteIndividualUserController, getAdminUsers, deleteIndividualAdminUserController, getOtherUsers, updateIndividualOtherUserController, getIndividualOtherUserController } = require("../Controllers/authController.js");
const authMiddleware = require("../Middleware/authMiddleware.js");
const { PermissionMiddleware } = require("../Middleware/PermissionMiddleware.js");

// register Router

router.route("/auth/registeration").post(register);
router.route("/auth/login").post(login);

// Get the System / Admin Users Data
router.route("/getAdminUsers").get(authMiddleware, PermissionMiddleware, getAdminUsers);

// get individual System / Admin user data for update from database
router.route("/getIndividualAdminUserUpdate/:id").get(authMiddleware, PermissionMiddleware, getIndividualUserController);

// update individual System / Admin user data in database
router.route("/updateIndividualAdminUser/:id").put(authMiddleware, PermissionMiddleware, updateIndividualUserController);

// Delete the individual System / Admin Users Data from Database
router.route("/deleteIndividualAdminUser/:id").delete(authMiddleware, PermissionMiddleware, deleteIndividualAdminUserController);

// Get the Other Users Data
router.route("/getOtherUsers").get(authMiddleware,PermissionMiddleware, getOtherUsers);

// delete individual other user id from database
router.route("/deleteIndividualUser/:id").delete(authMiddleware,  PermissionMiddleware, deleteIndividualUserController);

// get individual Other user data for update from database
router.route("/getIndividualOtherUserUpdate/:id").get(authMiddleware, getIndividualOtherUserController);

// update individual Other user data in database
router.route("/updateIndividualOtherUser/:id").put(authMiddleware, PermissionMiddleware, updateIndividualOtherUserController);




module.exports = router;