const StockOutReducer = (state, action) => {
    switch (action.type) {
        case "Stock_Out_Filter":
            let stockOut = action.payload;
            stockOut=stockOut.filter((product)=>{
                return product.stock === 0

            })
            return {
                ...state,
                Filter_StockOut: stockOut

            }
        case "Get_Input_Value":
            return{
                ...state,
                [action.payload.name]: action.payload.value
            }
        case "Search_input_Data":
            const { Filter_StockOut, Search_input_value } = state;
            let sorted_Products = Filter_StockOut;
            if (Search_input_value) {
                sorted_Products = sorted_Products.filter((product) => {
                    return product.productName.toLowerCase().includes(Search_input_value.toLowerCase().trim()) || product.brandName.toLowerCase().includes(Search_input_value.toLowerCase().trim()) || product.category.toLowerCase().includes(Search_input_value.toLowerCase().trim()) || product.currentPrice.toString().includes(Search_input_value.toLowerCase().trim())

                })
            }
            return{
                ...state,
                Filter_StockOut:sorted_Products

            }



        default:
            return state
    }
}

export default StockOutReducer;