const filterReducer = (state, action) => {
    switch (action.type) {
        case "FILTER_PRODUCTS_FOR_PRODUCT_PAGE":
            let newArray = action.payload.map((ele) => {
                return ele.currentPrice
            })
            let maxPrice = Math.max(...newArray)
            return {
                ...state,
                filter_Products: [...action.payload],
                all_Products: [...action.payload],
                Search_Filter: {
                    ...state.Search_Filter,
                    Price: maxPrice,
                    maxPrice: maxPrice,
                }
            };

        case "SET_Grid_Review":
            return {
                ...state,
                grid_view: true
            };

        case "SET_List_Review":
            return {
                ...state,
                grid_view: false
            };
        // ===============Get Sorting Value =================

        case "SORTING_Value":
            return {
                ...state,
                Sorting_Value: action.payload
            };
        // =============== Sorting Data =================

        case "SORTING_VIEW_DATA":
            let newSortData;
            const { filter_Products } = state;
            let tempSortProduct = [...filter_Products];

            const sortingProduct = (a, b) => {
                if (state.Sorting_Value === "a-z") {
                    return a.productName.localeCompare(b.productName)
                }
                if (state.Sorting_Value === "z-a") {
                    return b.productName.localeCompare(a.productName)
                }
                if (state.Sorting_Value === "lowest") {
                    return a.currentPrice - b.currentPrice
                }
                if (state.Sorting_Value === "highest") {
                    return b.currentPrice - a.currentPrice
                }
                if (state.Sorting_Value === "choose") {
                    return a._id.localeCompare(b._id)
                    // return a.id - b.id
                }

            }

            newSortData = tempSortProduct.sort(sortingProduct)
            return {
                ...state,
                filter_Products: newSortData
            };
        // ===============SEARCH_VALUE_FILTER =================
        case "SEARCH_VALUE_FILTER":
            return {
                ...state,
                Search_Filter: {
                    ...state.Search_Filter,
                    [action.payload.name]: action.payload.value
                }
            }
        // ===============Company_filter_value =================
        case "Company_filter_value":
            return {
                ...state,
                Search_Filter: {
                    ...state.Search_Filter,
                    [action.payload.name]: action.payload.value
                }

            }
        // ===============Color_filter_value =================  
        case "Color_Filter_Value":
            return {
                ...state,
                Search_Filter: {
                    ...state.Search_Filter,
                    [action.payload.name]: action.payload.value
                }
            }

        // ===============Range_filter_value =================  
        case "Range_Filter_value":
            return {
                ...state,
                Search_Filter: {
                    ...state.Search_Filter,
                    [action.payload.name]: action.payload.value
                }

            }
        // ===============GETTING_SEARCH_DATAR =================
        case "GETTING_SEARCH_DATA":
            const { all_Products } = state;
            let tempSearchData = [...all_Products];
            let { inputText, categoryFilter, companyFilter, colorFilter, Price } = state.Search_Filter;
            if (inputText) {
                tempSearchData = tempSearchData.filter((ele) => {
                    return ele.productName.toLowerCase().includes(inputText)

                })
            }

            if (categoryFilter !== "all") {
                tempSearchData = tempSearchData.filter((ele) => {
                    return ele.category === categoryFilter

                })

            }
            if (companyFilter !== "all") {
                tempSearchData = tempSearchData.filter((ele) => {
                    return ele.brandName === companyFilter

                })

            }

            if (colorFilter !== "all") {
                tempSearchData = tempSearchData.filter((ele) => {
                    return ele.colors.includes(colorFilter)
                })

            }

            if (Price !== 0) {
                tempSearchData = tempSearchData.filter((ele) => {
                    return ele.currentPrice <= Price

                })

            }


            return {
                ...state,
                filter_Products: tempSearchData

            }
        // ===============Category_filter_value =================
        case "Category_filter_value":
            return {
                ...state,
                Search_Filter: {
                    ...state.Search_Filter,
                    [action.payload.name]: action.payload.value

                }
            }
        // ===============Clear Filter Function =================
        case "ClearFilter":
            return {
                ...state,
                Sorting_Value: "choose",
                Search_Filter: {
                    ...state.Search_Filter,
                    inputText: "",
                    categoryFilter: "all",
                    companyFilter: "all",
                    colorFilter: "all",
                    Price: state.Search_Filter.maxPrice,
                    maxPrice: state.Search_Filter.maxPrice,
                    minPrice: state.Search_Filter.minPrice,
                }
            }

        // ===============Default =================
        default:
            return state
    }

}

export default filterReducer;