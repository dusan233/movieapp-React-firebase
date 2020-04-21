import * as actionTypes from "../actions/actionTypes";

const initialState = {
  popularSeries: null,
  topRatedSeries: null,
  serieDetails: null,
  moreDetails: {
    youtube: null,
    serieCast: null,
    serieReviews: null,
    recomendedSeries: null
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.POPULAR_SERIES:
      return {
        ...state,
        popularSeries: [...action.popularSeries]
      };
    case actionTypes.TOP_RATED_SERIES:
      return {
        ...state,
        topRatedSeries: [...action.topRatedSeries]
      };
    case actionTypes.SERIE_DETAILS:
      return {
        ...state,
        serieDetails: action.serieDetails
      };
    case actionTypes.SERIE_YOUTUBE_VIDEO:
      return {
        ...state,
        moreDetails: {
          ...state.moreDetails,
          youtube: action.serieYoutube
        }
      };
    case actionTypes.SERIE_CAST:
      return {
        ...state,
        moreDetails: {
          ...state.moreDetails,
          serieCast: [...action.serieCast]
        }
      };
    case actionTypes.SERIE_REVIEVS:
      return {
        ...state,
        moreDetails: {
          ...state.moreDetails,
          serieReviews: [...action.serieReviews]
        }
      };
    case actionTypes.RECOMENDED_SERIES:
      return {
        ...state,
        moreDetails: {
          ...state.moreDetails,
          recomendedSeries: [...action.recomendedSeries]
        }
      };
    default:
      return state;
  }
};

export default reducer;
