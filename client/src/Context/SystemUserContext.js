import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../Reducer/SystemUserReducer";
import { useAuth } from "./store";

const SystemContext = createContext();
const initialState = {
    filter_SystemUser: [],
    All_SystemUser: [],
    SystemUser_Search: ""

}

const SystemProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const API = process.env.REACT_APP_API;
    const { authorizationToken, adminLoginTrue } = useAuth();

    const getAdminData = async () => {
        try {
            const res = await axios.get(`${API}/API/getAdminUsers`, {
                headers: {
                    Authorization: authorizationToken
                }

            })
            const resData = await res.data;
            dispatch({ type: "Get_Admin_User", payload: resData.message })

        } catch (error) {

        }
    }

    const handleSearch = (e) => {
        const value = e.target.value;
        dispatch({ type: "Get_Search_Value", payload: value })

    }


    useEffect(() => {
        dispatch({ type: "Get_Search_Data" })

    }, [state.SystemUser_Search])


    useEffect(() => {
        if (adminLoginTrue) {
            getAdminData()
        }

    }, [adminLoginTrue])
    return (
        <SystemContext.Provider value={{ ...state, getAdminData, handleSearch }}>
            {children}
        </SystemContext.Provider>
    )

}

const useSystem = () => {
    return useContext(SystemContext)
}

export { SystemProvider, useSystem }