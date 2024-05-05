const PendingOrderReducer = (state, action) => {
    switch (action.type) {
        case "Get_All_PendingOrder":
            return {
                ...state,
                Filter_PendingOrder: [...action.payload],
                All_PendingOrder: [...action.payload],
            }
        case "Get_Search_Value":
            return {
                ...state,
                AllPendingOrder_Search: action.payload
            }
        case "Get_Search_Data":
            let { All_PendingOrder, AllPendingOrder_Search } = state;
            let filtered_PendingOrder = [...All_PendingOrder]
            if (AllPendingOrder_Search) {
                filtered_PendingOrder = filtered_PendingOrder.filter((search) => {
                    return search.orderId.toLowerCase().includes(AllPendingOrder_Search.toLowerCase().trim()) ||
                        search.shipping.name.toLowerCase().includes(AllPendingOrder_Search.toLowerCase().trim()) ||
                        (search.total / 100).toString().toLowerCase().includes(AllPendingOrder_Search.toLowerCase().trim()) ||
                        search.payment_status.toLowerCase().includes(AllPendingOrder_Search.toLowerCase().trim()) ||
                        search.delivery_status.toLowerCase().includes(AllPendingOrder_Search.toLowerCase().trim())
                })

            }
            return {
                ...state,
                Filter_PendingOrder: filtered_PendingOrder

            }



        default:
            return state
    }

}

export default PendingOrderReducer;