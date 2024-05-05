import { createContext, useContext, useEffect, useReducer } from "react";
import { useAuth } from "./store";
import reducer from "../Reducer/FilterReducer"

const FilterContext = createContext();

const initialState = {
    filter_Products: [],
    all_Products: [],
    grid_view: true,
    Sorting_Value: "choose",
    Search_Filter: {
        inputText: "",
        categoryFilter: "all",
        companyFilter: "all",
        colorFilter: "all",
        Price: 0,
        maxPrice: 0,
        minPrice: 0,

    }
}



const FilterContextProvider = ({ children }) => {
    const { products } = useAuth();

    const [state, dispatch] = useReducer(reducer, initialState);


    // ==============GRID VIEW FUNCTION==========================
    const SET_Grid_Review = () => {
        return dispatch({ type: "SET_Grid_Review" })
    }
    // ==============LIST VIEW FUNCTION==========================
    const SET_List_Review = () => {
        return dispatch({ type: "SET_List_Review" })
    }
    // ==============SORTING Value FUNCTION==========================
    const Sorting = (e) => {
        const sortingValue = e.target.value;
        return dispatch({ type: "SORTING_Value", payload: sortingValue })
    }

    // ==============Search filter FUNCTION==========================

    const searchValue = (e) => {
        let value = e.target.value;
        let name = e.target.name;
        return dispatch({ type: "SEARCH_VALUE_FILTER", payload: { value, name } })

    }
    // ==============Category filter value FUNCTION==========================
    const CategoryValue = (e) => {
        let value = e.target.value;
        let name = e.target.name;

        return dispatch({ type: "Category_filter_value", payload: { value, name } })

    }
    // ==============Company filter value FUNCTION==========================
    const CompanyValue = (e) => {
        let value = e.target.value;
        let name = e.target.name;
        return dispatch({ type: "Company_filter_value", payload: { value, name } })


    }
    // ==============Color filter value FUNCTION==========================
    const ColorValue = (e) => {
        let value = e.target.value;
        let name = e.target.name;

        return dispatch({ type: "Color_Filter_Value", payload: { value, name } })
    }
    // ==============Range filter value FUNCTION==========================
    const rangeValue = (e) => {
        let name = e.target.name;
        let value = e.target.value
        return dispatch({ type: "Range_Filter_value", payload: { name, value } })
    }
    // ==============Clear Filter FUNCTION==========================
    const ClearFilter = () => {
        return dispatch({ type: "ClearFilter" })
    }


    // ==============SORTING Data FUNCTION==========================

    useEffect(() => {
        dispatch({ type: "GETTING_SEARCH_DATA" })
        dispatch({ type: "SORTING_VIEW_DATA" })

    }, [products, state.Sorting_Value, state.Search_Filter.inputText, state.Search_Filter.categoryFilter, state.Search_Filter.companyFilter, state.Search_Filter.colorFilter, state.Search_Filter.Price]);

    // ==============All PRODUCT FILTER FUNCTION==========================

    useEffect(() => {
        dispatch({ type: "FILTER_PRODUCTS_FOR_PRODUCT_PAGE", payload: products })

    }, [products])

    return (
        <FilterContext.Provider value={{ ...state, SET_Grid_Review, SET_List_Review, Sorting, searchValue, CategoryValue, CompanyValue, ColorValue, rangeValue, ClearFilter }}>
            {children}
        </FilterContext.Provider>
    )
}

const useFilter = () => {
    return useContext(FilterContext)
}

export { FilterContextProvider, useFilter }