import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loading: false,
  randomBackground: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SPINNER_LOADING_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.SPINNER_LOADING_STOP:
      return {
        ...state,
        loading: false
      };
    case actionTypes.RANDOM_FOOTER_BACKGROUND:
      return {
        ...state,
        randomBackground: Math.floor(Math.random() * 9)
      };
    default:
      return state;
  }
};

export default reducer;
