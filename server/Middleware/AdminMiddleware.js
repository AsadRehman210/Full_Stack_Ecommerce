const onlyAdminAccess = async (req, res, next) => {
    try {
        console.log(req.user)
        if(req.user.role !== "admin"){
            return res.status(400).json({message: "You don't have access Due to You are not Admin"})
        }

        next()
    } catch (error) {
        return res.status(400).json({message: error.message})
        
    }
}

module.exports = {onlyAdminAccess}