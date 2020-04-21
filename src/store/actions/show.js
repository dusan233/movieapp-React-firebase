import axios from "axios";
import * as actionTypes from "../actions/actionTypes";

export const popularSeries = popularSeries => {
  return {
    type: actionTypes.POPULAR_SERIES,
    popularSeries: popularSeries
  };
};

export const topRatedSeries = topRatedSeries => {
  return {
    type: actionTypes.TOP_RATED_SERIES,
    topRatedSeries: topRatedSeries
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

export const serieDetails = serieDetails => {
  return {
    type: actionTypes.SERIE_DETAILS,
    serieDetails: serieDetails
  };
};

export const serieYoutube = serieYoutube => {
  return {
    type: actionTypes.SERIE_YOUTUBE_VIDEO,
    serieYoutube: serieYoutube
  };
};

export const serieCast = serieCast => {
  return {
    type: actionTypes.SERIE_CAST,
    serieCast: serieCast
  };
};

export const serieReviews = serieReviews => {
  return {
    type: actionTypes.SERIE_REVIEVS,
    serieReviews: serieReviews
  };
};

export const recomendedSeries = recomendedSeries => {
  return {
    type: actionTypes.RECOMENDED_SERIES,
    recomendedSeries: recomendedSeries
  };
};

export const fetchPopularSeries = () => {
  return dispatch => {
    dispatch(startLoading());
    axios
      .get(
        "https://api.themoviedb.org/3/tv/popular?api_key=f046f2ccc0239800895a169347bb3c9b&language=en-US&page=1"
      )
      .then(response => {
        dispatch(popularSeries(response.data.results));
        dispatch(stopLoading());
      });
  };
};

export const fetchSerieDetails = serieId => {
  return dispatch => {
    dispatch(startLoading());
    axios
      .get(
        `https://api.themoviedb.org/3/tv/${serieId}?api_key=f046f2ccc0239800895a169347bb3c9b&language=en-US`
      )
      .then(response => {
        dispatch(serieDetails(response.data));
        dispatch(stopLoading());
      });
  };
};

export const fetchTopRatedSeries = () => {
  return dispatch => {
    dispatch(startLoading());
    axios
      .get(
        "https://api.themoviedb.org/3/tv/top_rated?api_key=f046f2ccc0239800895a169347bb3c9b&language=en-US&page=1"
      )
      .then(response => {
        dispatch(topRatedSeries(response.data.results));
        dispatch(stopLoading());
      });
  };
};

export const fetchSerieYoutube = serieId => {
  return dispatch => {
    dispatch(startLoading());
    axios
      .get(
        `https://api.themoviedb.org/3/tv/${serieId}/videos?api_key=f046f2ccc0239800895a169347bb3c9b&language=en-US`
      )
      .then(response => {
        dispatch(serieYoutube(response.data.results[0]));
        dispatch(stopLoading());
      });
  };
};

export const fetchSerieCast = serieId => {
  return dispatch => {
    dispatch(startLoading());
    axios
      .get(
        `https://api.themoviedb.org/3/tv/${serieId}/credits?api_key=f046f2ccc0239800895a169347bb3c9b&language=en-US`
      )
      .then(response => {
        dispatch(serieCast(response.data.cast));
        dispatch(stopLoading());
      });
  };
};

export const fetchSerieReviews = serieId => {
  return dispatch => {
    dispatch(startLoading());
    axios
      .get(
        `https://api.themoviedb.org/3/tv/${serieId}/reviews?api_key=f046f2ccc0239800895a169347bb3c9b&language=en-US&page=1`
      )
      .then(response => {
        dispatch(serieReviews(response.data.results));
        dispatch(stopLoading());
      });
  };
};

export const fetchRecomendedSeries = serieId => {
  return dispatch => {
    dispatch(startLoading());
    axios
      .get(
        `https://api.themoviedb.org/3/tv/${serieId}/recommendations?api_key=f046f2ccc0239800895a169347bb3c9b&language=en-US&page=1
        `
      )
      .then(response => {
        dispatch(recomendedSeries(response.data.results));
        dispatch(stopLoading());
      });
  };
};
