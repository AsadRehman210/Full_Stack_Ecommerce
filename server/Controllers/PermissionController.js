const mongoose = require("mongoose");
const User = require("../Models/userModel");
const Permission = require("../Models/PermissionModel");

const createPermissionController = async (req, res) => {
    try {
        const { role, permissions } = req.body;
        const isRoleExist = await Permission.findOne({ role });
        if (isRoleExist) {
            return res.status(400).json({ message: "Role is already Exist" })
        }

        const createdPermission = await Permission.create({ role, permissions });

        let objId = new mongoose.Types.ObjectId(createdPermission._id);
        await User.updateMany({
            role
        }, {
            $set: {
                permission: objId
            }
        })

        return res.status(200).json({ message: createdPermission });

    } catch (error) {
        console.log(error.message);
        return res.status(400).json({ message: error })


    }
}

const updatePermissionController = async (req, res) => {
    try {
        const id = req.params.id
        const { permissions } = req.body;
        const isRoleExist = await Permission.findOne({ _id: id });
        if (!isRoleExist) {
            return res.status(400).json({ message: "Role is not Exist" })
        }
        const updatedPermission = await Permission.updateOne({ _id: isRoleExist._id }, {
            $set: {
                permissions: permissions
            }
        })

        if (updatedPermission.nModified === 0) {
            return res.status(400).json({ message: "Failed to update permission" });
        }

        return res.status(200).json({ message: updatedPermission })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: error.message })

    }
}

const deletePermissionController = async (req, res) => {
    try {
        const id = req.params.id;
        const DeletePermissionId = await Permission.deleteOne({ _id: id });
        if (!DeletePermissionId) {
            return res.status(404).json({ message: "Role and Permission not found" });
        }
        return res.status(200).json({ message: "Deleted Successfully" })

    } catch (error) {
        return res.status(400).json({ message: "Error in deleting Role and Permission" })

    }
}

const getPermissionController = async (req, res) => {
    try {
        const PermissionData = await Permission.find();
        return res.status(200).json({ message: PermissionData })

    } catch (error) {
        return res.status(400).json({ message: error.message })

    }
}

const getIndividualPermissionController = async (req, res) => {
    try {
        const id = req.params.id;
        const getIdData = await Permission.findOne({ _id: id });
        if (!getIdData) {
            return res.status(404).json({ message: "Permission not found" });
        }
        return res.status(200).json({ message: getIdData })
    } catch (error) {
        return res.status(400).json({ message: error })
    }

}



module.exports = { createPermissionController, updatePermissionController, deletePermissionController, getPermissionController, getIndividualPermissionController }