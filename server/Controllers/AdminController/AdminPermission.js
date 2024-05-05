const Permission = require("../../Models/PermissionModel");



const addPermission = async (req, res) => {
    try {
        const { permission_name } = req.body;
        
        // Convert permission_name to lowercase
        permission_name = permission_name.toLowerCase();

        const isExist = await Permission.findOne({ permission_name });
        if (isExist) {
            return res.status(400).json({ message: "Permission Name is Already Exist" })
        }
        const newPermission = await Permission.create({ permission_name: permission_name })
        return res.status(200).json({ message: "Permission is added Successfully", user: newPermission })

    } catch (error) {
        return res.status(400).json({
            message: error.message
        })

    }

}


const getPermission = async (req, res) => {
    try {
        const getData = await Permission.find();
        return res.status(200).json({ message: getData })
    } catch (error) {
        return res.status(400).json({ message: error.message })

    }
}

const deletePermission = async (req, res) => {
    try {
        const id = req.params.id;
        const isExist = await Permission.deleteOne({ _id: id });
        if (!isExist) {
            return res.status(404).json({ message: "Permission not found" });
        }
        return res.status(200).json({ message: "Deleted Successfully" })

    } catch (error) {
        return res.status(400).json({ message: error.message })

    }

}

const updatePermission = async (req, res) => {
    try {
        const id = req.params.id;
        const { permission_name } = req.body;

        // Check if the permission name already exists
        const existingPermission = await Permission.findOne({ permission_name });
        if (existingPermission) {
            return res.status(400).json({ message: "Permission name already exists. Cannot update." });
        }
        const Data = {permission_name}

        const updation = await Permission.updateOne({ _id: id }, { $set: Data });

        return res.status(201).json({ message: "Permission updated Successfully" })

    } catch (error) {
        return res.status(500).json({ message: error.message });

    }
}

module.exports = { addPermission, getPermission, deletePermission, updatePermission }