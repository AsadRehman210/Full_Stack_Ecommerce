const PermissionReducer = (state, action) => {
    switch (action.type) {

        case "Get_Role":
            return {
                ...state,
                Filter_Permission: [...action.payload],
                All_Permission: [...action.payload]
            }
        case "Handle_Search_Value":
            return {
                ...state,
                Permission_input: action.payload
            }
        case "Get_Search_Data":
            let { All_Permission, Permission_input } = state;
            let filteredPermission = [...All_Permission];
            
            if (Permission_input) {
                filteredPermission = filteredPermission.filter((search) => {
                    console.log(search.role)
                    return search.permissions.some((perm) => perm.toLowerCase().includes(Permission_input.toLowerCase().trim())) || search.role.toLowerCase().includes(Permission_input.toLowerCase().trim())
                })
            }
            return {
                ...state,
                Filter_Permission: filteredPermission

            }

        default:
            return state
    }

}

export default PermissionReducer;