import * as actionTypes from "../actions/actionTypes";

const initialState = {
  movieSearch: null,
  movieCollections: null,
  serieSearch: null,
  peopleSearch: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.MOVIE_SEARCH:
      return {
        ...state,
        movieSearch: action.movieSearch
      };
    case actionTypes.MOVIE_COLLECTIONS:
      return {
        ...state,
        movieCollections: action.movieCollections
      };
    case actionTypes.SERIE_SEARCH:
      return {
        ...state,
        serieSearch: action.serieSearch
      };
    case actionTypes.PEOPLE_SEARCH:
      return {
        ...state,
        peopleSearch: action.peopleSearch
      };
    default:
      return state;
  }
};

export default reducer;
