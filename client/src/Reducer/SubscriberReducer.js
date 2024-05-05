const SubscriberReducer = (state, action) => {
    switch (action.type) {
        case 'Get_Email':
            return {
                ...state,
                Filter_email: [...action.payload],
                All_email: [...action.payload],
            }
        case 'Handle_Email_Value':
           
            return{
                ...state,
                [action.payload.name]: action.payload.value

            }
        case 'Sorting_Search_Data':
            let {All_email, Search_input} = state;
            let Filter_Email = [...All_email];
            if (Search_input) {
                Filter_Email = Filter_Email.filter((Email) => {
                    return Email.email.includes(Search_input.trim())
                })
            }
            return{
                ...state,
                Filter_email: Filter_Email
            }



        default:
            return state
    }
}

export default SubscriberReducer;