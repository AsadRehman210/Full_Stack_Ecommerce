import React, { useEffect } from "react";
import "./CSS/index.css"
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "./Pages/Home"
import About from "./Pages/About"
import Products from "./Pages/Products"
import Contact from "./Pages/Contact"
import SingleProduct from "./Pages/SingleProduct"
import Cart from "./Pages/Cart";
import Error from "./Pages/Error";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import SignUp from "./Pages/SignUp";
import LogIn from "./Pages/LogIn";
import DashBoard from "./DashBoard/DashBoard";
import DBAllProducts from "./DashBoard/Pages/DBAllProducts";
import Subscriber from "./DashBoard/Components/Subscriber";
import AddProducts from "./DashBoard/Pages/AddProducts";
import StockOutProduct from "./DashBoard/Pages/StockOutProduct";
import AllOrder from "./DashBoard/Pages/AllOrder";
import PendingOrder from "./DashBoard/Pages/PendingOrder";
import DeliveredOrder from "./DashBoard/Pages/DeliveredOrder";
import DBProductCategory from "./DashBoard/Pages/DBProductCategory";
import UpdateDBProducts from "./DashBoard/Pages/UpdateDBProducts";
import PaymentSuccess from "./Pages/PaymentSuccess";
import PaymentCancel from "./Pages/PaymentCancel";
import { useAuth } from "./Context/store";
// import { AbilityProvider } from "./Permission/AbilityContext";
import Roles from "./DashBoard/Pages/Roles";
import RoleUpdate from "./DashBoard/Components/RoleUpdate";
import RoleCreate from "./DashBoard/Components/RoleCreate";
import SystemUser from "./DashBoard/Pages/SystemUser";
import SystemUserUpdate from "./DashBoard/Components/SystemUserUpdate";
import OtherUser from "./DashBoard/Pages/OtherUser";
import OtherUserUpdate from "./DashBoard/Components/OtherUserUpdate";
import LogOut from "./Pages/LogOut";
import SendEmail from "./DashBoard/Components/SendEmail";
import OrderInvoice from "./DashBoard/Components/OrderInvoice";


function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const { permissionArray } = useAuth();

  //when go to nested rout byDefault
  const nestedRoute = location.pathname.endsWith('/admin');
  useEffect(() => {
    // If the current path is '/admin', automatically navigate to '/admin/DBAllProducts'
    if (nestedRoute) {
      navigate("/admin/DBAllProducts");
    }
  }, [nestedRoute, navigate]);

  // Check if the current path includes '/admin'
  const isAdminRoute = location.pathname.includes('/admin');
  return (
    <div className="wrapper">
      {/* Conditionally render Header based on whether it's an admin route */}
      {!isAdminRoute && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/singleproduct/:id" element={<SingleProduct />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/logout" element={<LogOut />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/PaymentSuccess" element={<PaymentSuccess />} />
        <Route path="/PaymentCancel" element={<PaymentCancel />} />

        {permissionArray.includes("dashboard access") && (
          <Route path="/admin" element={<DashBoard />} >

            {permissionArray.includes("product view") && (
              <Route path="DBAllProducts" element={<DBAllProducts />} />
            )}
            {permissionArray.includes("product update") && (
              <Route path="UpdateDBProducts/:id" element={<UpdateDBProducts />} />
            )}
            {permissionArray.includes("product create") && (
              <Route path="addProducts" element={<AddProducts />} />
            )}

            {permissionArray.includes("category view") && (
              <Route path="DBProductCategory" element={<DBProductCategory />} />
            )}

            {permissionArray.includes("stock out products view") && (
              <Route path="stockOutProducts" element={<StockOutProduct />} />
            )}

            {permissionArray.includes("all order view") && (
              <Route path="allOrders" element={<AllOrder />} />
            )}

            {permissionArray.includes("order invoice view") && (
              <Route path="allOrders/orderInvoice/:id" element={<OrderInvoice />} />
            )}

            {permissionArray.includes("order invoice view") && (
              <Route path="pendingOrders/orderInvoice/:id" element={<OrderInvoice />} />
            )}

            {permissionArray.includes("order invoice view") && (
              <Route path="deliveredOrders/orderInvoice/:id" element={<OrderInvoice />} />
            )}


            {permissionArray.includes("pending order view") && (
              <Route path="pendingOrders" element={<PendingOrder />} />
            )}

            {permissionArray.includes("delivered order view") && (
              <Route path="deliveredOrders" element={<DeliveredOrder />} />
            )}

            {permissionArray.includes("role view") && (
              <Route path="roles" element={<Roles />} />
            )}

            {permissionArray.includes("role create") && (
              <Route path="roles/CreatePermissions" element={<RoleCreate />} />
            )}

            {permissionArray.includes("role update") && (
              <Route path="roles/UpdatePermissions/:id" element={<RoleUpdate />} />
            )}

            {permissionArray.includes("admin user view") && (
              <Route path="systemUser" element={<SystemUser />} />
            )}

            {permissionArray.includes("admin user update") && (
              <Route path="systemUserUpdate/:id" element={<SystemUserUpdate />} />
            )}

            {permissionArray.includes("other user view") && (
              <Route path="OtherUser" element={<OtherUser />} />
            )}

            {permissionArray.includes("other user update") && (
              <Route path="OtherUser/OtherUserUpdate/:id" element={<OtherUserUpdate />} />
            )}

            {permissionArray.includes("subscriber view") && (
              <Route path="subscriber" element={<Subscriber />} />
            )}

            {permissionArray.includes("email send to all subscriber") && (
              <Route path="subscriber/sendMail" element={<SendEmail />} />
            )}


          </Route>)}



        <Route path="*" element={<Error />} />

      </Routes>

      <Footer />
    </div>

  );
}

export default App;
