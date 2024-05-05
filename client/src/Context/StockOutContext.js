import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../Reducer/StockOutReducer";
// import axios from "axios";
import { useDB } from "./DashBoardContext";

const StockOutContext = createContext();
const initialState={
    Filter_StockOut: [],
    Search_input_value: ""
}
const StockOutProvider = ({children})=>{
    const {filter_DBProducts} = useDB()
    const[state, dispatch] = useReducer(reducer, initialState);

    const handleInput = (e)=>{
        let name = e.target.name;
        let value = e.target.value;
        dispatch({type:"Get_Input_Value", payload:{name, value}})

    }


    useEffect(()=>{
        dispatch({type:"Stock_Out_Filter", payload: filter_DBProducts});
        dispatch({type:"Search_input_Data"})

    },[filter_DBProducts, state.Search_input_value])

    const getFilteredStockOut = () => {
        return state.Filter_StockOut;
    };

    return(
        <StockOutContext.Provider value={{...state, handleInput, getFilteredStockOut}}>
            {children}
        </StockOutContext.Provider>
    )
}

const useStockOut = ()=>{
    return useContext(StockOutContext)
}

export {useStockOut, StockOutProvider}