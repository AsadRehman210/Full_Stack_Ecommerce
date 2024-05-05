const express = require("express");
const { addPermission, getPermission, deletePermission, updatePermission } = require("../Controllers/AdminController/AdminPermission");
const authMiddleware = require("../Middleware/authMiddleware");
const { onlyAdminAccess } = require("../Middleware/AdminMiddleware");
const router = express.Router();


router.route("/add_permission").post(authMiddleware,onlyAdminAccess, addPermission);

router.route("/get_permission").get(authMiddleware,onlyAdminAccess, getPermission);

router.route("/delete_permission/:id").delete(authMiddleware,onlyAdminAccess,deletePermission);

router.route("/update_permission/:id").put(authMiddleware,onlyAdminAccess, updatePermission);

module.exports = router