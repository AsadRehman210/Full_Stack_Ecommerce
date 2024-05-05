const mongoose = require("mongoose");
const Permission = require("./PermissionModel");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,

    },
    phone: {
        type: String,
        required: true,

    },
    address: {
        type: String,
        required: true,

    },
    role: {
        type: String,
        default: 'user', // 0-> user, 1-> Admin, 2-> Sub-Admin, 3-> Editor
    },
    permission: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Permission'
    }]
}, { timestamps: true })




// create user Model
const User = mongoose.model("User", userSchema);

module.exports = User;