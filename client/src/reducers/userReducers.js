import {
  
    ADD_USER_SUCCESSFULLY,
    GET_USER_DATA,
    GET_USERS,
    GET_PROFILE_USER
  } from '../actions/types';
  
  const initialState = {
  
    loading: true,
    add_success_message:{},
    get_user_data:{},
    get_users:[],
    get_profile_data:{}
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case ADD_USER_SUCCESSFULLY:
        return {
          ...state,
        add_success_message:action.payload
   
        };
      
        case GET_USER_DATA:
            return {
              ...state,
            get_user_data:action.payload,
            loading:false
       
            };

            case GET_USERS:
                return {
                  ...state,
                get_users:action.payload,
                loading:false
           
                };
                case GET_PROFILE_USER:
                    return {
                      ...state,
                    get_profile_data:action.payload,
                    loading:false
               
                    };
              
      default:
        return state;
    }
  }
  