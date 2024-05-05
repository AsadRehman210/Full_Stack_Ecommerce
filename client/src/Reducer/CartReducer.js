const cartReducer = (state, action) => {
    switch (action.type) {
        case "Add_TO_Cart":
            const { productDetail, _id, quantity, colorTick } = action.payload;
            let existingProduct = state.cart.find((curEle, index) => {
                return curEle.id === _id + colorTick

            })
            if (existingProduct) {
                let updatedProduct = state.cart.map((curEle) => {
                    if (curEle.id === _id + colorTick) {
                        let updatedQuantity = curEle.quantity + quantity
                        return {
                            ...curEle,
                            quantity: updatedQuantity
                        }
                    } else {
                        return curEle
                    }
                })
                return {
                    ...state,
                    cart: updatedProduct
                }

            } else {
                const cartProduct = {
                    id: _id + colorTick,
                    name: productDetail.productName,
                    brand: productDetail.brandName,
                    color: colorTick,
                    quantity: quantity,
                    price: productDetail.currentPrice,
                    image: productDetail.FeaturedImage,
                    stock: productDetail.stock,
                    category: productDetail.category
                }
                return {
                    ...state,
                    cart: [...state.cart, cartProduct],


                }
            }


            ;
        case "Set_Increment":
            let updatedProduct = state.cart.map((curEle) => {
                if (curEle.id === action.payload.id) {
                    let inCrementQuantity = curEle.quantity + 1
                    if (inCrementQuantity >= curEle.max) {
                        inCrementQuantity = curEle.max
                    }
                    return {
                        ...curEle,
                        quantity: inCrementQuantity,
                    }
                } else {
                    return curEle
                }


            })
            return {
                ...state,
                cart: updatedProduct

            }
        case "Set_Decrement":
            let updatedProduct_dec = state.cart.map((curEle) => {
                if (curEle.id === action.payload) {
                    let decreQuantity = curEle.quantity - 1
                    if (decreQuantity <= 1) {
                        decreQuantity = 1
                    }
                    return {
                        ...curEle,
                        quantity: decreQuantity
                    }
                } else {
                    return curEle
                }

            })
            return {
                ...state,
                cart: updatedProduct_dec

            }
        case "Cart_Total_Item":
            let totalItem = state.cart.reduce((acc, curEle) => {
                return (acc + curEle.quantity)
            },0)
            return {
                ...state,
                total_item: totalItem

            }
        case "Cart_Total_Amount":
            let totalAmount = state.cart.reduce((acc, curEle)=>{
                return acc + (curEle.price * curEle.quantity)
            },0)
            return{
                ...state,
                total_Price: totalAmount

            }

        case "Remove_Cart":
            const deleteCart = state.cart.filter((ele, index) => {
                return ele.id !== action.payload

            })
            return {
                ...state,
                cart: deleteCart
            }
        case "Clear_Cart":
            return {
                ...state,
                cart: []
            }

        default:
            return state
    }

}

export default cartReducer;