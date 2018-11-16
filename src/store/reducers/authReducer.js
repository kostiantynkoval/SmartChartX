import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL,
  LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAIL
} from '../actions/actionTypes'

const initialState = {
  isAuthenticated: false,
  token: '',
  isAuthenticating: false,
  error: ''
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isAuthenticating: true,
        error: ''
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticating: false,
        isAuthenticated: true,
        token: action.payload,
        error: ''
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticating: false,
        isAuthenticated: false,
        token: '',
        error: action.payload
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isAuthenticating: false,
        isAuthenticated: false,
        token: '',
        error: ''
      };
    default:
      return state
  }
}

export default authReducer;