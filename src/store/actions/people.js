import * as actionTypes from "../actions/actionTypes";
import axios from "axios";

export const popularPeople = popularPeople => {
  return {
    type: actionTypes.POPULAR_PEOPLE,
    popularPeople: popularPeople
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

export const personDetails = personDetails => {
  return {
    type: actionTypes.PERSON_DETAILS,
    personDetails: personDetails
  };
};

export const personActing = personActing => {
  return {
    type: actionTypes.PERSON_ACTING_HISTORY,
    personActing: personActing
  };
};

export const fetchPopularPeople = () => {
  return dispatch => {
    dispatch(startLoading());
    axios
      .get(
        "https://api.themoviedb.org/3/person/popular?api_key=f046f2ccc0239800895a169347bb3c9b&language=en-US&page=1"
      )
      .then(response => {
        dispatch(stopLoading());
        dispatch(popularPeople(response.data.results));
      });
  };
};

export const fetchPersonDetails = personId => {
  return dispatch => {
    dispatch(startLoading());
    axios
      .get(
        `https://api.themoviedb.org/3/person/${personId}?api_key=f046f2ccc0239800895a169347bb3c9b&language=en-US`
      )
      .then(response => {
        dispatch(stopLoading());
        dispatch(personDetails(response.data));
      });
  };
};

export const fetchPersonActing = personId => {
  return dispatch => {
    dispatch(startLoading());
    axios
      .get(
        `https://api.themoviedb.org/3/person/${personId}/combined_credits?api_key=f046f2ccc0239800895a169347bb3c9b&language=en-US`
      )
      .then(response => {
        dispatch(stopLoading());
        dispatch(personActing(response.data.cast));
      });
  };
};

export const fetchRandomBackground = () => {
  return {
    type: actionTypes.RANDOM_FOOTER_BACKGROUND
  };
};
