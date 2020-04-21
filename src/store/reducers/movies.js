import * as actionTypes from "../actions/actionTypes";
const initialState = {
  popularMovies: "popularMovies",
  topRatedMovies: null,
  upcomingMovies: null,
  inTheatersMovies: null,
  movieDetails: null,
  moreDetails: {
    youtube: null,
    movieCast: null,
    movieReviews: null,
    recomendedMovies: null,
    movieCollection: null
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.POPULAR_MOVIES:
      return {
        ...state,
        popularMovies: [...action.popularMovies]
      };
    case actionTypes.TOP_RATED_MOVIES:
      return {
        ...state,
        topRatedMovies: [...action.topRatedMovies]
      };

    case actionTypes.UPCOMING_MOVIES:
      return {
        ...state,
        upcomingMovies: [...action.upcomingMovies]
      };
    case actionTypes.IN_THEATERS_MOVIES:
      return {
        ...state,
        inTheatersMovies: [...action.inTheatersMovies]
      };
    case actionTypes.MOVIE_DETAILS:
      return {
        ...state,
        movieDetails: action.movieDetails
      };
    case actionTypes.MOVIE_YOUTUBE_VIDEO:
      return {
        ...state,
        moreDetails: {
          ...state.moreDetails,
          youtube: action.movieYoutube
        }
      };
    case actionTypes.MOVIE_CAST:
      return {
        ...state,
        moreDetails: {
          ...state.moreDetails,
          movieCast: [...action.movieCast]
        }
      };
    case actionTypes.MOVIE_REVIEWS:
      return {
        ...state,
        moreDetails: {
          ...state.moreDetails,
          movieReviews: [...action.movieReviews]
        }
      };
    case actionTypes.RECOMENDED_MOVIES:
      return {
        ...state,
        moreDetails: {
          ...state.moreDetails,
          recomendedMovies: [...action.recomendedMovies]
        }
      };
    case actionTypes.MOVIE_COLLECTION:
      return {
        ...state,
        moreDetails: {
          ...state.moreDetails,
          movieCollection: action.movieCollection
        }
      };
    default:
      return state;
  }
};

export default reducer;
