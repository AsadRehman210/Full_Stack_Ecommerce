import axios from "axios";
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import reducer from "../Reducer/ProductReducer";

const AppContext = createContext()

const initialState = {
    isLoading: false,
    isError: false,
    products: [],
    FeatureProducts: [],
    isSingleProductLoading: false,
    SingleProductData: {}
}

const API = process.env.REACT_APP_API;

let URL = `${API}/DBproducts/product_Data/get`

const AppProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [userPermission, setUserPermission] = useState(localStorage.getItem("per"));
    const [loginUserData, setLoginUserData] = useState(localStorage.getItem("LoginUserData"));
    const [loginUserEmail, setLoginUserEmail] = useState(localStorage.getItem("LoginUserEmail"));
    let [adminLoginTrue, setAdminLoginTrue] = useState(localStorage.getItem("AdminLogin"))
    

    // create due to remove the error of null and undefined
    let permissionArray = userPermission ? userPermission : [];

    const authorizationToken = `Bearer ${token}`

    const [state, dispatch] = useReducer(reducer, initialState);


    // token available
    const isLoggedIn = !!token;

    // token remove when click on logout
    const logoutUser = () => {
        setToken("");
        setUserPermission("");
        setLoginUserData("")
        localStorage.removeItem("token")
        localStorage.removeItem("per")
        localStorage.removeItem("LoginUserData")
        localStorage.removeItem("LoginUserEmail");
        localStorage.removeItem("AdminLogin")

    }

    // store token function
    const storeTokenInLS = (tokenValue) => {
        setToken(tokenValue);
        return localStorage.setItem("token", tokenValue);
    }

    // get Login User Data
    const storeLoginUserData = (id, email) => {
        setLoginUserData(id);
        setLoginUserEmail(email)
        localStorage.setItem("LoginUserData", id);
        localStorage.setItem("LoginUserEmail", email)

    }
    const StoreUserPermission = (permissionValue) => {
        setUserPermission(permissionValue);
        return localStorage.setItem("per", permissionValue)
    }
    const AdminLogin = (admin) => {
        setAdminLoginTrue(admin);
        return localStorage.setItem("AdminLogin", admin)
    }

    const getApi = async (URL) => {
        dispatch({ type: "SET_LOADING" })
        try {
            const res = await axios.get(URL);
            const Data = await res.data;
            dispatch({ type: "MY_API_DATA", payload: Data.message })

        } catch (error) {
            dispatch({ type: "API_ERROR" })

        }

    }

    // ==================================================================================
    // API FOR SINGLE PRODUCT
    // ==================================================================================

    const singleProduct = async (URL) => {
        dispatch({ type: "Single_Loading" })
        try {
            const res = await axios.get(URL);
            const Data = await res.data;
            dispatch({ type: "SINGLE_PRODUCT_API", payload: Data.message })

        } catch (error) {
            dispatch({ type: "SET_SINGLE_ERROR" })

        }
    }
    useEffect(() => {
        getApi(URL);
    }, [])

    return (
        <AppContext.Provider value={{ ...state, singleProduct, storeTokenInLS, authorizationToken, token, StoreUserPermission, permissionArray, isLoggedIn, logoutUser, storeLoginUserData, loginUserData, loginUserEmail, AdminLogin, adminLoginTrue }}>
            {children}

        </AppContext.Provider>)

}

const useAuth = () => {
    return useContext(AppContext)
}

export { AppProvider, AppContext, useAuth }