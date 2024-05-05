const express = require("express");
const { mailController } = require("../Controllers/MailerController");
const authMiddleware = require("../Middleware/authMiddleware");
const { PermissionMiddleware } = require("../Middleware/PermissionMiddleware");
const router = express.Router();


router.route("/send_Mail").post(authMiddleware, PermissionMiddleware, mailController)


module.exports = router;