import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import { useAuth } from "./store";
import reducer from "../Reducer/DeliveredOrderReducer";

const DeliveredOrderContext = createContext();

const initialState = {
    Filter_DeliveredOrder: [],
    All_DeliveredOrder: [],
    AllDeliveredOrder_Search: ""
}

const DeliveredOrderProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const { authorizationToken, adminLoginTrue } = useAuth();
    const API = process.env.REACT_APP_API;

    const getAllDeliveredOrder = async () => {
        try {
            const res = await axios.get(`${API}/API/Order/getAllDeliveredOrderData`, {
                headers: {
                    Authorization: authorizationToken
                }
            })
            const result = await res.data;
            dispatch({ type: "Get_All_DeliveredOrder", payload: result.message })

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

    }, [state.AllDeliveredOrder_Search])
    useEffect(() => {
        if (adminLoginTrue) {
            getAllDeliveredOrder();
        }


    }, [adminLoginTrue])

    return (
        <DeliveredOrderContext.Provider value={{ ...state, handleSearch, getAllDeliveredOrder }}>
            {children}
        </DeliveredOrderContext.Provider>
    )

}

const useDeliveredOrder = () => {
    return useContext(DeliveredOrderContext)
}

export { useDeliveredOrder, DeliveredOrderProvider }