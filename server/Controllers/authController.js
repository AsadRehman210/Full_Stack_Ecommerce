const User = require("../Models/userModel.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Permission = require("../Models/PermissionModel.js");

// Registration Controller
const register = async (req, res) => {
    try {
        let { name, email, password, phone, address } = req.body;

        // Converting the data to lowercase
        name = name.toLowerCase();
        email = email.toLowerCase();
        phone = phone.toLowerCase();
        address = address.toLowerCase();

        const existingUser = await User.findOne({ email: email })
        if (existingUser) {
            return res.status(400).json({ message: "Already Register Please Login" })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const isPermission = await Permission.findOne({ role: 'user' });

        let newUser = await User.create({ name, email, password: hashedPassword, phone, address, permission: isPermission })

        // await newUser.populate({ path: "permission", model: "Permission" })

        return res.status(200).json({
            message: "Register Successfully",
            user: newUser
        })
    } catch (error) {
        res.status(400).json({ message: error.message })

    }

}


// Login Controller
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        let existingUser = await User.findOne({ email: email });
        if (!existingUser) {
            return res.status(400).json({ message: "Invalid Credentials" })
        }
        const comparedpassword = await bcrypt.compare(password, existingUser.password);

        const token = await jwt.sign({ _id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

        if (!comparedpassword) {
            return res.status(400).json({ message: "Invalid Credentials" })
        }
        existingUser = await existingUser.populate({ path: "permission", model: "Permission" })
        return res.status(200).json(
            {
                message: "LogIn Successfully",
                userDetail: existingUser,
                token: token
            })



    } catch (error) {
        return res.status(400).json({ message: error })

    }

}

const getAdminUsers = async (req, res) => {
    try {
        const getAdminUsers = await User.find({ role: { $ne: "user" } });
        return res.status(200).json({ message: getAdminUsers })

    } catch (error) {
        return res.status(400).json({ message: error.message })

    }

}

const deleteIndividualAdminUserController = async (req, res) => {
    try {
        const id = req.params.id;
        const DeleteAdminId = await User.deleteOne({ _id: id });
        if (!DeleteAdminId) {
            return res.status(404).json({ message: "Admin ID is not found" });
        }
        return res.status(200).json({ message: "Deleted Successfully" })

    } catch (error) {
        return res.status(400).json({ message: "Error in deleting Admin ID" })

    }
}

const getIndividualUserController = async (req, res) => {
    try {
        const id = req.params.id;
        const getIdData = await User.findOne({ _id: id });
        if (!getIdData) {
            return res.status(404).json({ message: "User is not found" });
        }
        return res.status(200).json({ message: getIdData })


    } catch (error) {
        return res.status(400).json({ message: error })

    }
}

const updateIndividualUserController = async (req, res) => {
    try {
        const id = req.params.id;
        let { name, email, phone, address, role } = req.body;
        // Converting the data to lowercase
        name = name.toLowerCase();
        email = email.toLowerCase();
        phone = phone.toLowerCase();
        address = address.toLowerCase();
        role = role.toLowerCase();

        const isPermission = await Permission.findOne({ role });

        // Creating an object with the extracted data
        const Data = { name, email, phone, address, role, permission:isPermission };
        const updatedUser = await User.updateOne({ _id: id }, { $set: Data })
        return res.status(201).json({ message: "User updated Successfully" })
    } catch (error) {
        return res.status(400).json({ message: error.message })

    }
}

const deleteIndividualUserController = async (req, res) => {
    try {
        const id = req.params.id;
        const DeleteUserId = await User.deleteOne({ _id: id });
        if (!DeleteUserId) {
            return res.status(404).json({ message: "User is not found" });
        }
        return res.status(200).json({ message: "Deleted Successfully" })
    } catch (error) {
        return res.status(400).json({ message: "Error in deleting User" })

    }
}

const getOtherUsers = async (req, res) => {
    try {
        const getAdminUsers = await User.find({ role: "user" });
        return res.status(200).json({ message: getAdminUsers })

    } catch (error) {
        return res.status(400).json({ message: error.message })

    }

}

const getIndividualOtherUserController = async (req, res) => {
    try {
        const id = req.params.id;
        const getIdData = await User.findOne({ _id: id });
        if (!getIdData) {
            return res.status(404).json({ message: "User is not found" });
        }
        return res.status(200).json({ message: getIdData })


    } catch (error) {
        return res.status(400).json({ message: error })

    }

}

const updateIndividualOtherUserController = async (req, res) => {
    try {
        const id = req.params.id;
        let { name, email, phone, address, role } = req.body;

        // Converting the data to lowercase
        name = name.toLowerCase();
        email = email.toLowerCase();
        phone = phone.toLowerCase();
        address = address.toLowerCase();
        role = role.toLowerCase();

        const isPermission = await Permission.findOne({ role });
        
        // Creating an object with the extracted data
        const Data = { name, email, phone, address, role, permission:isPermission };
        const updatedUser = await User.updateOne({ _id: id }, { $set: Data })
        return res.status(201).json({ message: "User updated Successfully" })
    } catch (error) {
        return res.status(400).json({ message: error.message })

    }
}

module.exports = { register, login, getAdminUsers, getIndividualUserController, updateIndividualUserController, deleteIndividualUserController, deleteIndividualAdminUserController, getOtherUsers, updateIndividualOtherUserController, getIndividualOtherUserController }