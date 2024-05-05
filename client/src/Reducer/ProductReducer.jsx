const reducer = (state, action) => {
    switch (action.type) {
        case "SET_LOADING":
            return {
                ...state,
                isLoading: true
            };
        case "MY_API_DATA":
            const featuredData = action.payload.filter((ele) => {
                return ele.isFeatured === "true"

            })
            return {
                ...state,
                isLoading: false,
                products: action.payload,
                FeatureProducts: featuredData

            };
        case "API_ERROR":
            return {
                ...state,
                isLoading: false,
                isError: true
            };
        case "Single_Loading":
            return {
                ...state,
                isSingleProductLoading: true,
            }
        case "SINGLE_PRODUCT_API":
            return {
                ...state,
                isSingleProductLoading: false,
                SingleProductData: action.payload
            }

        case "SET_SINGLE_ERROR":
            return {
                ...state,
                isSingleProductLoading: false,
                isError: true
            };


        default:
            return state
    }

}

export default reducer;