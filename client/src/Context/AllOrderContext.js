import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../Reducer/AllOrderReducer";
import axios from "axios";
import { useAuth } from "./store";

const OrderContext = createContext();

const initialState = {
    Filter_Order: [],
    All_Order: [],
    AllOrder_Search: ""
}

const OrderProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const { authorizationToken, adminLoginTrue } = useAuth();
    const API = process.env.REACT_APP_API;

    const getAllOrder = async () => {
        try {
            const res = await axios.get(`${API}/API/Order/getAllOrderData`, {
                headers: {
                    Authorization: authorizationToken
                }
            })
            const result = await res.data;
            dispatch({ type: "Get_All_Order", payload: result.message })

        } catch (error) {
            console.log(error)

        }

    }
    const handleSearch = (e) => {
        const value = e.target.value;
        dispatch({ type: "Get_Search_Value", payload: value })

    }

    useEffect(() => {
        dispatch({ type: "Get_Search_Data" })

    }, [state.AllOrder_Search])

    useEffect(() => {
        if (adminLoginTrue) {
            getAllOrder();
        }
    }, [adminLoginTrue])

    return (
        <OrderContext.Provider value={{ ...state, handleSearch, getAllOrder }}>
            {children}
        </OrderContext.Provider>
    )

}

const useOrder = () => {
    return useContext(OrderContext)
}

export { useOrder, OrderProvider }