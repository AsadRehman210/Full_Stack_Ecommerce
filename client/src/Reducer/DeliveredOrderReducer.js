const DeliveredOrderReducer = (state, action) => {
    switch (action.type) {
        case "Get_All_DeliveredOrder":
            return {
                ...state,
                Filter_DeliveredOrder: [...action.payload],
                All_DeliveredOrder: [...action.payload],
            }
        case "Get_Search_Value":
            return {
                ...state,
                AllDeliveredOrder_Search: action.payload
            }
        case "Get_Search_Data":
            let { All_DeliveredOrder, AllDeliveredOrder_Search } = state;
            let filtered_DeliveredOrder = [...All_DeliveredOrder]
            if (AllDeliveredOrder_Search) {
                filtered_DeliveredOrder = filtered_DeliveredOrder.filter((search) => {
                    return search.orderId.toLowerCase().includes(AllDeliveredOrder_Search.toLowerCase().trim()) ||
                        search.shipping.name.toLowerCase().includes(AllDeliveredOrder_Search.toLowerCase().trim()) ||
                        (search.total / 100).toString().toLowerCase().includes(AllDeliveredOrder_Search.toLowerCase().trim()) ||
                        search.payment_status.toLowerCase().includes(AllDeliveredOrder_Search.toLowerCase().trim()) ||
                        search.delivery_status.toLowerCase().includes(AllDeliveredOrder_Search.toLowerCase().trim())
                })

            }
            return {
                ...state,
                Filter_DeliveredOrder: filtered_DeliveredOrder

            }



        default:
            return state
    }

}

export default DeliveredOrderReducer;