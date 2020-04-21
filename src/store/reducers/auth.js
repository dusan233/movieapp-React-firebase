import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loading: false,
  error: null,
  token: null,
  userId: null,
  displayName: null,
  redirectIt: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    case actionTypes.AUTH_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case actionTypes.AUTH_SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null
      };
    case actionTypes.AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        token: action.token,
        userId: action.userId,
        displayName: action.displayName
      };
    case actionTypes.REDIRECT:
      return {
        ...state,
        redirectIt: action.path
      };
    case actionTypes.LOG_OUT:
      return {
        ...state,
        token: null,
        userId: null,
        displayName: null
      };
    default:
      return state;
  }
};

export default reducer;
