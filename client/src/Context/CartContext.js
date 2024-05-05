import { useContext, useEffect, useReducer } from "react";
import { createContext } from "react";
import reducer from "../Reducer/CartReducer"

const CartContext = createContext();

const getLocalStorage = () => {
    let LocalCartStorage = localStorage.getItem("AsadStore");
    if (LocalCartStorage === null || LocalCartStorage === undefined) {
        return [];
    } else {
        return JSON.parse(LocalCartStorage)
    }
}
const initialState = {
    cart: getLocalStorage(),
    total_item: "",
    total_Price: "",
    shipping_fee: 500,

}
const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // ================Get Single Cart Data==========================
    const addToCart = (productDetail, _id, quantity, colorTick) => {
        dispatch({ type: "Add_TO_Cart", payload: { productDetail, _id, quantity, colorTick } })
    }

    // ======================remove Function===========================
    const RemoveCart = (id) => {
        return dispatch({ type: "Remove_Cart", payload: id })
    }

    // ======================SetIncrement Function===========================
    const setIncrement = (id, max)=>{
        dispatch({type:"Set_Increment", payload:{id, max}})
    }

    // ======================SetDecement Function===========================
    const setDecrement = (id)=>{
        dispatch({type:"Set_Decrement", payload:id})
    }
    // ============Set Local data===================================
    useEffect(() => {
        dispatch({type: "Cart_Total_Amount"})
        dispatch({type:"Cart_Total_Item"})
        localStorage.setItem("AsadStore", JSON.stringify(state.cart))
    }, [state.cart, state.total_item, state.total_Price])

    const ClearCart = ()=>{
        return dispatch({type:"Clear_Cart"})
    }
    return (
        <CartContext.Provider value={{ ...state, addToCart, RemoveCart, ClearCart,setDecrement, setIncrement }}>
            {children}
        </CartContext.Provider>
    )
}

const useCart = () => {
    return useContext(CartContext)
}

export { CartProvider, useCart }
