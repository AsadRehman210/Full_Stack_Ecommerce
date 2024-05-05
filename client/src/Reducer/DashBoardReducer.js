const DashBoardReducer = (state, action) => {
    switch (action.type) {
        case "Get_DB_API":
            return {
                ...state,
                all_DBProducts: [...action.payload],
                filter_DBProducts: [...action.payload]

            }
        case "DB_Products_Filter":
        case "DB_Company_Filter":
        case "DB_Colors_Filter":
        case "DB_Order_Filter":
        case "DB_Searching_Input":
            return {
                ...state,
                DB_Search: {
                    ...state.DB_Search,
                    [action.payload.name]: action.payload.value
                }

            }
        case "Sorting_Products_Data":
            let { all_DBProducts, DB_Search } = state;
            let filteredProducts = [...all_DBProducts]

            let { inputText, categoryFilter, companyFilter, colorFilter, orderFilter } = DB_Search

            if (categoryFilter !== "all category") {
                filteredProducts = filteredProducts.filter((product) => {
                    return product.category === categoryFilter

                })
            }
            if (companyFilter !== "all brandName") {
                filteredProducts = filteredProducts.filter((product) => {
                    return product.brandName === companyFilter

                })
            }

            if (colorFilter !== "all colors") {
                filteredProducts = filteredProducts.filter((product) => {
                    return product.colors.includes(colorFilter)
                })
            }

            if (inputText) {
                filteredProducts = filteredProducts.filter((product) => {
                    return product.productName.toLowerCase().includes(inputText.toLowerCase().trim()) || product.category.toLowerCase().includes(inputText.toLowerCase().trim()) || product.brandName.toLowerCase().includes(inputText.toLowerCase().trim()) || product.currentPrice.toString().toLowerCase().includes(inputText.toLowerCase().trim())
                })
            }
            let sortingOrder = (a, b) => {
                if (orderFilter === "lowest") {
                    return a.currentPrice - b.currentPrice
                }
                if (orderFilter === "highest") {
                    return b.currentPrice - a.currentPrice
                }
                if (orderFilter === "a-z") {
                    return a.productName.localeCompare(b.productName)
                }
                if (orderFilter === "z-a") {
                    return b.productName.localeCompare(a.productName)
                }
                if (orderFilter === "select") {
                    return a._id.localeCompare(b._id)
                }
            }
            if (orderFilter) {
                filteredProducts = filteredProducts.sort(sortingOrder);
            }
            return {
                ...state,
                filter_DBProducts: filteredProducts
            }
        case "Clear_Filter":
            return{
                ...state,
                DB_Search: {
                    ...state.DB_Search,
                    inputText: "",
                    categoryFilter: "all category",
                    companyFilter: "all brandName",
                    colorFilter: "all colors",
                    orderFilter: "Select Order"
                }
            }
        default:
            return state
    }
}

export default DashBoardReducer;