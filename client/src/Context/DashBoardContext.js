import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../Reducer/DashBoardReducer"
import axios from "axios";
import { useAuth } from "./store";

const DBContext = createContext();

const initialState = {
    all_DBProducts: [],
    filter_DBProducts: [],
    DB_Search: {
        inputText: "",
        categoryFilter: "all category",
        companyFilter: "all brandName",
        colorFilter: "all colors",
        orderFilter: "Select Order"
    }

}

const DBProvider = ({ children }) => {

    const { authorizationToken, token, adminLoginTrue } = useAuth();

    const [state, dispatch] = useReducer(reducer, initialState);
    const API = process.env.REACT_APP_API;

    // get the value of product category
    const DBProductsFilter = (e) => {
        let value = e.target.value;
        let name = e.target.name
        dispatch({ type: "DB_Products_Filter", payload: { value, name } })
    }

    // get the value of company filter
    const DBCompanyFilter = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        dispatch({ type: "DB_Company_Filter", payload: { name, value } })

    }

    // get the value of color filter
    const DBColorsFilter = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        dispatch({ type: "DB_Colors_Filter", payload: { name, value } })

    }

    // get the value of order filter
    const DBOrderFilter = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        dispatch({ type: "DB_Order_Filter", payload: { name, value } })

    }

    // get searching input value
    const DBSearchingInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        dispatch({ type: "DB_Searching_Input", payload: { name, value } })
    }
    const ClearFilter = () => {
        return dispatch({ type: "Clear_Filter" })
    }



    const getData = async () => {
        try {
            const res = await axios.get(`${API}/DBproducts/product_Data/get`, {
                headers: {
                    Authorization: authorizationToken
                }
            })
            const ProductData = await res.data;
            return dispatch({ type: "Get_DB_API", payload: ProductData.message })

        } catch (error) {
            console.log(error.message)

        }

    }

    useEffect(() => {
        dispatch({ type: "Sorting_Products_Data" })

    }, [state.DB_Search])

    useEffect(() => {
        if (adminLoginTrue) {
            getData()
        }
    }, [adminLoginTrue])

    return (
        <DBContext.Provider value={{ ...state, DBProductsFilter, DBCompanyFilter, DBColorsFilter, DBOrderFilter, DBSearchingInput, ClearFilter, getData }}>
            {children}

        </DBContext.Provider>
    )
}

const useDB = () => {
    return useContext(DBContext)
}

export { useDB, DBProvider }