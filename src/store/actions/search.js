import * as actionTypes from "./actionTypes";
import axios from "axios";

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

export const movieSearch = movieSearch => {
  return {
    type: actionTypes.MOVIE_SEARCH,
    movieSearch: movieSearch
  };
};

export const movieCollections = movieCollections => {
  return {
    type: actionTypes.MOVIE_COLLECTIONS,
    movieCollections: movieCollections
  };
};
export const serieSearch = serieSearch => {
  return {
    type: actionTypes.SERIE_SEARCH,
    serieSearch: serieSearch
  };
};

export const peopleSearch = peopleSearch => {
  return {
    type: actionTypes.PEOPLE_SEARCH,
    peopleSearch: peopleSearch
  };
};

export const fetchMovieSearch = (query, pageNumber) => {
  return dispatch => {
    dispatch(startLoading());
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=f046f2ccc0239800895a169347bb3c9b&language=en-US&query=${query}&page=${pageNumber}&include_adult=false`
      )
      .then(response => {
        dispatch(movieSearch(response.data));
        dispatch(stopLoading());
      });
  };
};

export const fetchMovieCollections = (query, pageNumber) => {
  return dispatch => {
    dispatch(startLoading());
    axios
      .get(
        `https://api.themoviedb.org/3/search/collection?api_key=f046f2ccc0239800895a169347bb3c9b&language=en-US&query=${query}&page=${pageNumber}`
      )
      .then(response => {
        dispatch(movieCollections(response.data));
        dispatch(stopLoading());
      });
  };
};

export const fetchSerieSearch = (query, pageNumber) => {
  return dispatch => {
    dispatch(startLoading());
    axios
      .get(
        `https://api.themoviedb.org/3/search/tv?api_key=f046f2ccc0239800895a169347bb3c9b&language=en-US&query=${query}&page=${pageNumber}`
      )
      .then(response => {
        dispatch(serieSearch(response.data));
        dispatch(stopLoading());
      });
  };
};

export const fetchPeopleSearch = (query, pageNumber) => {
  return dispatch => {
    dispatch(startLoading());
    axios
      .get(
        `https://api.themoviedb.org/3/search/person?api_key=f046f2ccc0239800895a169347bb3c9b&language=en-US&query=${query}&page=${pageNumber}&include_adult=false`
      )
      .then(response => {
        dispatch(peopleSearch(response.data));
        dispatch(stopLoading());
      });
  };
};
