import axios from "axios";
import * as actionTypes from "./actionTypes";

export const popularMovies = popularMovies => {
  return {
    type: actionTypes.POPULAR_MOVIES,
    popularMovies: popularMovies
  };
};

export const topRatedMovies = topRatedMovies => {
  return {
    type: actionTypes.TOP_RATED_MOVIES,
    topRatedMovies: topRatedMovies
  };
};

export const upcomingMovies = upcomingMovies => {
  return {
    type: actionTypes.UPCOMING_MOVIES,
    upcomingMovies: upcomingMovies
  };
};

export const inTheaterMovies = inTheatersMovies => {
  return {
    type: actionTypes.IN_THEATERS_MOVIES,
    inTheatersMovies: inTheatersMovies
  };
};

export const startLoading = () => {
  return {
    type: actionTypes.SPINNER_LOADING_START
  };
};

export const stopLoading = () => {
  return {
    type: actionTypes.SPINNER_LOADING_STOP
  };
};

export const movieDetails = movieDetails => {
  return {
    type: actionTypes.MOVIE_DETAILS,
    movieDetails: movieDetails
  };
};

export const movieYoutube = movieYoutube => {
  return {
    type: actionTypes.MOVIE_YOUTUBE_VIDEO,
    movieYoutube: movieYoutube
  };
};

export const movieCast = movieCast => {
  return {
    type: actionTypes.MOVIE_CAST,
    movieCast: movieCast
  };
};

export const movieReviews = movieReviews => {
  return {
    type: actionTypes.MOVIE_REVIEWS,
    movieReviews: movieReviews
  };
};

export const recomendedMovies = recomendedMovies => {
  return {
    type: actionTypes.RECOMENDED_MOVIES,
    recomendedMovies: recomendedMovies
  };
};

export const movieCollection = movieCollection => {
  return {
    type: actionTypes.MOVIE_COLLECTION,
    movieCollection: movieCollection
  };
};

export const fetchPopularMovies = () => {
  return dispatch => {
    dispatch(startLoading());
    axios
      .get(
        "https://api.themoviedb.org/3/movie/popular?api_key=f046f2ccc0239800895a169347bb3c9b&language=en-US&page=1"
      )
      .then(response => {
        dispatch(popularMovies(response.data.results));
        dispatch(stopLoading());
      });
  };
};

export const fetchTopRatedMoives = () => {
  return dispatch => {
    dispatch(startLoading());
    axios
      .get(
        "https://api.themoviedb.org/3/movie/top_rated?api_key=f046f2ccc0239800895a169347bb3c9b&language=en-US&page=1"
      )
      .then(response => {
        dispatch(topRatedMovies(response.data.results));
        dispatch(stopLoading());
      });
  };
};

export const fetchUpcomingdMoives = () => {
  return dispatch => {
    dispatch(startLoading());
    axios
      .get(
        "https://api.themoviedb.org/3/movie/upcoming?api_key=f046f2ccc0239800895a169347bb3c9b&language=en-US&page=1"
      )
      .then(response => {
        dispatch(upcomingMovies(response.data.results));
        dispatch(stopLoading());
      });
  };
};

export const fetchMovieDetails = movieId => {
  return dispatch => {
    dispatch(startLoading());
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=f046f2ccc0239800895a169347bb3c9b&language=en-US`
      )
      .then(response => {
        dispatch(movieDetails(response.data));
        dispatch(stopLoading());
      });
  };
};

export const fetchInTheaterMovies = () => {
  return dispatch => {
    dispatch(startLoading());
    axios
      .get(
        "https://api.themoviedb.org/3/movie/now_playing?api_key=f046f2ccc0239800895a169347bb3c9b&language=en-US&page=1"
      )
      .then(response => {
        dispatch(inTheaterMovies(response.data.results));
        dispatch(stopLoading());
      });
  };
};

export const fetchMovieYoutube = movieId => {
  return dispatch => {
    dispatch(startLoading());
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=f046f2ccc0239800895a169347bb3c9b&language=en-US`
      )
      .then(response => {
        dispatch(movieYoutube(response.data.results[0]));
        dispatch(stopLoading());
      });
  };
};

export const fetchMovieCast = movieId => {
  return dispatch => {
    dispatch(startLoading());
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=f046f2ccc0239800895a169347bb3c9b`
      )
      .then(response => {
        dispatch(movieCast(response.data.cast.slice(0, 10)));
        dispatch(stopLoading());
      });
  };
};

export const fetchMovieReviews = movieId => {
  return dispatch => {
    dispatch(startLoading());
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=f046f2ccc0239800895a169347bb3c9b&language=en-US&page=1`
      )
      .then(response => {
        dispatch(movieReviews(response.data.results));
        dispatch(stopLoading());
      });
  };
};

export const fetchRecomendedMovies = movieId => {
  return dispatch => {
    dispatch(startLoading());
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=f046f2ccc0239800895a169347bb3c9b&language=en-US&page=1`
      )
      .then(response => {
        dispatch(recomendedMovies(response.data.results));
        dispatch(stopLoading());
      });
  };
};

export const fetchMovieCollectione = collectionId => {
  return dispatch => {
    dispatch(startLoading());
    axios
      .get(
        `https://api.themoviedb.org/3/collection/${collectionId}?api_key=f046f2ccc0239800895a169347bb3c9b&language=en-US`
      )
      .then(response => {
        dispatch(movieCollection(response.data));
        dispatch(stopLoading());
      });
  };
};
