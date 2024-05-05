import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../Reducer/PermissionReducer";
import { useAuth } from "./store";

const RoleContext = createContext();
const initialState = {
    Filter_Permission: [],
    All_Permission: [],
    Permission_input: []
}

const RoleProvider = ({ children }) => {
    const API = process.env.REACT_APP_API;
    const [state, dispatch] = useReducer(reducer, initialState);
    const { authorizationToken, adminLoginTrue } = useAuth();

    const getRole = async () => {
        try {
            const res = await axios.get(`${API}/API/Permission/getPermission`, {
                headers: {
                    Authorization: authorizationToken
                }
            });
            const ResData = await res.data;
            dispatch({ type: "Get_Role", payload: ResData.message })
        } catch (error) {
            console.log(error)

        }
    }
    const handleChange = (e) => {
        const value = e.target.value;
        dispatch({ type: "Handle_Search_Value", payload: value })
    }
    useEffect(() => {
        dispatch({ type: "Get_Search_Data" })

    }, [state.Permission_input])

    useEffect(() => {
        if (adminLoginTrue) {
            getRole()
        }
    }, [adminLoginTrue])
    return (
        <RoleContext.Provider value={{ ...state, getRole, handleChange }}>
            {children}
        </RoleContext.Provider>
    )
}

const useRole = () => {
    return useContext(RoleContext)
}

export { RoleProvider, useRole }