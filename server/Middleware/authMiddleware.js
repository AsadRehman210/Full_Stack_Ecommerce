const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");

const authMiddleware = async (req, res, next) => {
    let token = req.header("Authorization");
    if (!token) {
        return res.status(401).json({ message: "token Unauthorized http request" })
    }
    const jwtoken = token.replace("Bearer", "").trim();

    try {
        const isVerified = jwt.verify(jwtoken, process.env.JWT_SECRET);

        const userData = await User.findOne({ _id: isVerified._id }).select({ password: 0 }).populate({ path: "permission", model: "Permission" });
        req.user = userData;
        req.token = jwtoken;
        // req.userId = userData._id;

        next();

    } catch (error) {
        return res.status(400).json({ message: error.message })
        console.log(error)
        

    }
}

module.exports =  authMiddleware;