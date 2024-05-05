const OtherUserReducer = (state, action) => {
    switch (action.type) {
        case "Get_Other_User":

            return {
                ...state,
                filter_OtherUser: [...action.payload],
                All_OtherUser: [...action.payload],
            }
        case "Get_Search_Value":
            return {
                ...state,
                OtherUser_Search: action.payload
            }
        case "Get_Search_Data":
            let { All_OtherUser, OtherUser_Search } = state;
            let filtered_OtherUser = [...All_OtherUser]
            if (OtherUser_Search) {
                filtered_OtherUser = filtered_OtherUser.filter((search) => {
                    return search.email.toLowerCase().includes(OtherUser_Search.toLowerCase().trim()) ||
                        search.role.toLowerCase().includes(OtherUser_Search.toLowerCase().trim()) ||
                        search.name.toLowerCase().includes(OtherUser_Search.toLowerCase().trim()) ||
                        search.phone.toLowerCase().includes(OtherUser_Search.toLowerCase().trim())
                })

            }
            return {
                ...state,
                filter_OtherUser: filtered_OtherUser

            }


        default:
            return state
    }

}

export default OtherUserReducer;