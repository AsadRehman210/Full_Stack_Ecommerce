import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../Reducer/DBCategoryReducer"
import axios from "axios";
import { useAuth } from "./store";

const CategoryContext = createContext();

const initialState = {
    filter_DB_Category: [],
    all_DB_Category: [],
    inputSearch: ''
}

const CategoryProvider = ({ children }) => {
    const { authorizationToken, adminLoginTrue } = useAuth();
    const [state, dispatch] = useReducer(reducer, initialState);
    const API = process.env.REACT_APP_API;

    const handleCategory = (e) => {
        let value = e.target.value;
        let name = e.target.name;
        dispatch({ type: "handle_Category", payload: { name, value } })
    }
    const getData = async () => {
        try {
            const res = await axios.get(`${API}/DBproducts/product_Data/get`, {
                headers: {
                    Authorization: authorizationToken
                }
            })
            const ProductData = await res.data;
            dispatch({ type: "DB_Product_Category", payload: ProductData.message })

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        dispatch({ type: "Input_Search_Data" });
    }, [state.inputSearch]);

    useEffect(() => {
        if (adminLoginTrue) {
            getData()

        }

    }, [adminLoginTrue]);

    return (
        <CategoryContext.Provider value={{ ...state, handleCategory, getData }}>
            {children}
        </CategoryContext.Provider>
    )
}

const useDBCategory = () => {
    return useContext(CategoryContext)
}

export { useDBCategory, CategoryProvider }