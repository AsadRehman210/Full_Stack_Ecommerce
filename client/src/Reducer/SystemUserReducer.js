const SystemUserReducer = (state, action) => {
    switch (action.type) {
        case "Get_Admin_User":
            return {
                ...state,
                filter_SystemUser: [...action.payload],
                All_SystemUser: [...action.payload],
            }

        case "Get_Search_Value":
            return {
                ...state,
                SystemUser_Search: action.payload
            }
        case "Get_Search_Data":
            let { All_SystemUser, SystemUser_Search } = state;
            let filtered_SystemUser = [...All_SystemUser]
            if (SystemUser_Search) {
                filtered_SystemUser = filtered_SystemUser.filter((search) => {
                    return search.email.toLowerCase().includes(SystemUser_Search.toLowerCase().trim()) ||
                        search.role.toLowerCase().includes(SystemUser_Search.toLowerCase().trim()) ||
                        search.name.toLowerCase().includes(SystemUser_Search.toLowerCase().trim()) ||
                        search.phone.toLowerCase().includes(SystemUser_Search.toLowerCase().trim())
                })

            }
            return {
                ...state,
                filter_SystemUser: filtered_SystemUser

            }


        default:
            return state
    }

}

export default SystemUserReducer;