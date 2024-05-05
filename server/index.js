require("dotenv").config();
const express = require("express");
const cors = require("cors")
const connectDB = require("./utils/database.js")
const authRouter = require("./Routers/authRouter.js");
const SubscriberRouter = require("./Routers/SubscriberRouter.js");
const ProductRouter = require("./Routers/ProductRouter.js");
const PaymentGateway = require("./Routers/PaymentGetwayRouter.js");
const AdminRouter = require("./Routers/AdminRouter.js");
const PermissionRouter = require("./Routers/PermissionRoutes.js");
const MailRouter = require("./Routers/MailRouter.js");
const OrderRouter = require("./Routers/OrderRouter.js");

// rest obj
const app = express();


// middleware
const corsOption = {
    origin: "http://localhost:3000",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true
}
app.use(cors(corsOption));

// add middleware
app.use(express.json());

// routes
app.use("/API", authRouter);
app.use("/subscriber", SubscriberRouter);
app.use("/DBproducts",ProductRouter );
app.use("/api", PaymentGateway);
app.use("/API/admin", AdminRouter);
app.use("/API/Permission", PermissionRouter)
app.use("/API/Mailer", MailRouter);
app.use("/API/Order", OrderRouter);


// for upload image
app.use("/uploads", express.static('uploads'));

// Create Port
const PORT = process.env.PORT;
// port listen
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`server running on ${PORT}`)
    })
})
