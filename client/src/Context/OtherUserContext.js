import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../Reducer/OtherUserReducer";
import { useAuth } from "./store";

const OtherUserContext = createContext();

let initialState = {
    filter_OtherUser: [],
    All_OtherUser: [],
    OtherUser_Search: ""

}

const OtherUserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const API = process.env.REACT_APP_API;
    const {authorizationToken, adminLoginTrue} = useAuth();


    const getOtherUserData = async () => {
        try {
            const res = await axios.get(`${API}/API/getOtherUsers`, {
                headers: {
                    Authorization: authorizationToken
                }
            })
            const resData = await res.data;
            dispatch({ type: "Get_Other_User", payload: resData.message })

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

    }, [state.OtherUser_Search])
    useEffect(() => {
        if(adminLoginTrue){
            getOtherUserData()
        }
    }, [adminLoginTrue])
    return (
        <OtherUserContext.Provider value={{ ...state, getOtherUserData, handleSearch }}>
            {children}
        </OtherUserContext.Provider>
    )

}

const useOtherUser = () => {
    return useContext(OtherUserContext)
}

export { OtherUserProvider, useOtherUser }