const DBCategoryReducer = (state, action) => {
    switch (action.type) {
        case "DB_Product_Category":
            
            return {
                ...state,
                filter_DB_Category: [...action.payload],
                all_DB_Category: [...action.payload]

            }
        case "handle_Category":
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        case "Input_Search_Data":
            const { all_DB_Category, inputSearch } = state;
            let sorted_Products = [...all_DB_Category];
            if (inputSearch) {
                sorted_Products = sorted_Products.filter((product) => {
                    return product.category.toLowerCase().includes(inputSearch.toLowerCase().trim()) || product.brandName.toLowerCase().includes(inputSearch.toLowerCase().trim()) || product.currentPrice.toString().includes(inputSearch.trim())

                })
            }
            return {
                ...state,
                filter_DB_Category: sorted_Products
            }



        default:
            return state
    }

}

export default DBCategoryReducer