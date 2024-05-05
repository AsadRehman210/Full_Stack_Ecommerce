const mongoose = require("mongoose");

const PermissionSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true,
        unique: true
    },
    permissions:{
        type:[String],
        required:true,
        unique:true

    },

})

const Permission = new mongoose.model("Permission", PermissionSchema);

module.exports = Permission