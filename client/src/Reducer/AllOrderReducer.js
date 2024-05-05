const AllOrderReducer = (state, action) => {
    switch (action.type) {
        case "Get_All_Order":
            return {
                ...state,
                Filter_Order: [...action.payload],
                All_Order: [...action.payload],
            }
        case "Get_Search_Value":
            return {
                ...state,
                AllOrder_Search: action.payload
            }
        case "Get_Search_Data":
            let { All_Order, AllOrder_Search } = state;
            let filtered_AllOrder = [...All_Order]
            if (AllOrder_Search) {
                filtered_AllOrder = filtered_AllOrder.filter((search) => {
                    return search.orderId.toLowerCase().includes(AllOrder_Search.trim()) ||
                        search.shipping.name.toLowerCase().includes(AllOrder_Search.toLowerCase().trim()) ||
                        (search.total / 100).toString().toLowerCase().includes(AllOrder_Search.toLowerCase().trim()) ||
                        search.payment_status.toLowerCase().includes(AllOrder_Search.toLowerCase().trim()) ||
                        search.delivery_status.toLowerCase().includes(AllOrder_Search.toLowerCase().trim())
                })

            }
            return {
                ...state,
                Filter_Order: filtered_AllOrder

            }



        default:
            return state
    }

}

export default AllOrderReducer;