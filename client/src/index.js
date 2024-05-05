import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { AppProvider } from './Context/store';
import { FilterContextProvider } from './Context/FilterContext';
import { CartProvider } from './Context/CartContext';
import { DBProvider } from './Context/DashBoardContext';
import { CategoryProvider } from './Context/DBCategory';
import { StockOutProvider } from './Context/StockOutContext';
import { SubscriberProvider } from './Context/SubscriberContext';
import { RoleProvider } from './Context/RolesContext';
import { SystemProvider } from './Context/SystemUserContext';
import { OtherUserProvider } from './Context/OtherUserContext';
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { OrderProvider } from './Context/AllOrderContext';
import { PendingOrderProvider } from './Context/PendingOrderContext';
import { DeliveredOrderProvider } from './Context/DeliveredOrderContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppProvider >
      <FilterContextProvider >
        <CartProvider >
          <DBProvider>
            <CategoryProvider>
              <StockOutProvider>
                <OrderProvider>
                  <PendingOrderProvider>
                    <DeliveredOrderProvider>
                      <SubscriberProvider>
                        <RoleProvider>
                          <SystemProvider>
                            <OtherUserProvider>
                              <BrowserRouter>
                                <App />
                                <ToastContainer
                                  position="bottom-right"
                                  autoClose={5000}
                                  hideProgressBar={false}
                                  newestOnTop={false}
                                  closeOnClick
                                  rtl={false}
                                  pauseOnFocusLoss
                                  draggable
                                  pauseOnHover
                                  theme="colored"
                                  transition={Bounce}
                                  style={{ zIndex: 9000000000000 }}
                                  className="toastBody"
                                  bodyClassName="toastBody"
                                  toastContainerClassName="customToastContainer"
                                  preventDuplicates={true}

                                />
                              </BrowserRouter>
                            </OtherUserProvider>
                          </SystemProvider>
                        </RoleProvider>
                      </SubscriberProvider>
                    </DeliveredOrderProvider>
                  </PendingOrderProvider>
                </OrderProvider>
              </StockOutProvider>
            </CategoryProvider>
          </DBProvider>
        </CartProvider>
      </FilterContextProvider>
    </AppProvider>


  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
// "homepage": "https://AsadRehman210.github.io/Ecommerce_Asad_Store",
