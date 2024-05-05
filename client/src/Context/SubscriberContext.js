import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from '../Reducer/SubscriberReducer'
import axios from "axios";
import { useAuth } from "./store";

const SubscriberContext = createContext();

const initialState = {
    Filter_email: [],
    All_email: [],
    Search_input: ""
}

const SubscriberProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { authorizationToken, adminLoginTrue } = useAuth();
    const API = process.env.REACT_APP_API;

    const getEmail = async () => {
        try {
            const res = await axios.get(`${API}/subscriber/getsubscriber`, {
                headers: {
                    Authorization: authorizationToken
                }

            })
            const Data = await res.data;
            let finalResult = Data.message;
            dispatch({ type: "Get_Email", payload: finalResult })
        } catch (error) {
            console.log(error)
        }
    }
    const handleEmail = (e) => {
        let value = e.target.value;
        let name = e.target.name;
        dispatch({ type: "Handle_Email_Value", payload: { value, name } })

    }
    useEffect(() => {
        dispatch({ type: "Sorting_Search_Data" })

    }, [state.Search_input])


    useEffect(() => {
        if (adminLoginTrue) {
            getEmail()
        }
    }, [adminLoginTrue])
    return (
        <SubscriberContext.Provider value={{ ...state, handleEmail, getEmail }}>
            {children}

        </SubscriberContext.Provider>
    )
}

const useSubscriber = () => {
    return useContext(SubscriberContext)
}

export { useSubscriber, SubscriberProvider }