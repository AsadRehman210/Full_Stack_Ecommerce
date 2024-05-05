const PermissionMiddleware = async (req, res, next) => {
    try {
        const permissions = req.user.permission[0].permissions;
        const path = req.path;
        let id = req.params.id

        if ((path === "/getAdminUsers" && !permissions.includes("admin user view")) || (path === `/getIndividualAdminUserUpdate/${id}` && !permissions.includes("admin user update")) || (path === `/updateIndividualAdminUser/${id}` && !permissions.includes("admin user update")) || (path === `/deleteIndividualAdminUser/${id}` && !permissions.includes("admin user delete")) || (path === "/getOtherUsers" && !permissions.includes("other user view")) || (path === `/deleteIndividualUser/${id}` && !permissions.includes("other user delete")) || (path === `/getIndividualOtherUserUpdate/${id}` && !permissions.includes("other user update")) || (path === `/updateIndividualOtherUser/${id}` && !permissions.includes("other user update")) ||
            //MailRouter
            (path === '/send_Mail' && !permissions.includes("email send to all subscriber")) ||
            // OrderRouter
            (path === '/getAllOrderData' && !permissions.includes("all order view")) || (path === `/getIndividualOrderData/${id}` && !permissions.includes("all order view")) || (path === '/getAllPendingOrderData' && !permissions.includes("pending order view")) || (path === '/getAllDeliveredOrderData' && !permissions.includes("delivered order view")) || (path === `/deleteIndividualOrderData/${id}` && !permissions.includes("order delete")) ||
            // PermissionRoutes
            (path === '/getPermission' && !permissions.includes("role view")) || (path === '/createPermission' && !permissions.includes("role create")) || (path === `/updatePermission/${id}` && !permissions.includes("role update")) || (path === `/deletePermission/${id}` && !permissions.includes("role delete")) || (path === `/getIndividualPermission/${id}` && !permissions.includes("role update")) ||
            // ProductRoutes
            (path === '/product_Data/post' && !permissions.includes("product create")) || (path === `/product_Data/get/${id}` && !permissions.includes("product update")) || (path === `/product_Data/Delete/${id}` && !permissions.includes("product delete")) || (path === `product_Data/Category/Delete/${id}` && !permissions.includes("category delete")) || (path === `/product_Data/post/${id}` && !permissions.includes("product update")) ||
            //Subscriber
            (path === '/getsubscriber' && !permissions.includes("subscriber view")) || (path === `/deletesubs/${id}` && !permissions.includes("subscriber delete"))          

        ) {
            return res.status(500).json({ message: "Permission does not Access" });
        }

        // 



        next()
    } catch (error) {
        console.log(error.message)
        return res.status(400).json({message: error.message})

    }
}

module.exports = { PermissionMiddleware }