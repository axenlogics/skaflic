import { ISLOGGED_IN, LOGIN_FAIL, LOGIN_LOADING, LOGIN_SUCCESS, LOGOUT_USER } from "../actions/types";

const initialState =  {
  isLoggedIn: false, 
  data: {},
  error: null,
  loading: false,
};


const authReducer = (state = initialState, {type, payload}:any) => {
  switch (type) {
    case ISLOGGED_IN:
      return {
        ...state,
        isLoggedIn: payload,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
    };
    case LOGOUT_USER:
      return {
        ...state,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default authReducer;
