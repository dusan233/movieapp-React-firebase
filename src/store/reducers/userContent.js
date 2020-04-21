import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loading: false,
  finisedSending: false,
  favorites: null,
  watchlist: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SEND_DATA_START:
      return {
        ...state,
        finisedSending: false,
        loading: true
      };
    case actionTypes.SEND_DATA_SUCCESS:
      return {
        ...state,
        finisedSending: true,
        loading: false
      };
    case actionTypes.GET_USER_FAVORITE:
      return {
        ...state,
        loading: true
      };
    case actionTypes.GET_USER_FINISH:
      return {
        ...state,
        loading: false
      };
    case actionTypes.GET_FAVORITES_SUCCESS:
      return {
        ...state,
        loading: false,
        favorites: action.favorites
      };
    case actionTypes.GET_WATCHLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        watchlist: action.watchlist
      };
    case actionTypes.CLEAR_USERS_FAV_WA:
      return {
        ...state,
        favorites: null,
        watchlist: null
      };
    default:
      return state;
  }
};

export default reducer;
