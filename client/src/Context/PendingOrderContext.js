import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import { useAuth } from "./store";
import reducer from "../Reducer/PendingOrderReducer";

const PendingOrderContext = createContext();

const initialState = {
    Filter_PendingOrder: [],
    All_PendingOrder: [],
    AllPendingOrder_Search: ""
}

const PendingOrderProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const { authorizationToken, adminLoginTrue } = useAuth();
    const API = process.env.REACT_APP_API;

    const getAllPendingOrder = async () => {
        try {
            const res = await axios.get(`${API}/API/Order/getAllPendingOrderData`, {
                headers: {
                    Authorization: authorizationToken
                }
            })
            const result = await res.data;
            dispatch({ type: "Get_All_PendingOrder", payload: result.message })

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

    }, [state.AllPendingOrder_Search])
    useEffect(() => {
        if (adminLoginTrue) {
        getAllPendingOrder();
        }
    }, [adminLoginTrue])

    return (
        <PendingOrderContext.Provider value={{ ...state, handleSearch, getAllPendingOrder }}>
            {children}
        </PendingOrderContext.Provider>
    )

}

const usePendingOrder = () => {
    return useContext(PendingOrderContext)
}

export { usePendingOrder, PendingOrderProvider }