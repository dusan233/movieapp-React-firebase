import * as actionTypes from "../actions/actionTypes";

import axios from "axios";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authFailed = errorMessage => {
  return {
    type: actionTypes.AUTH_FAILED,
    error: errorMessage
  };
};

export const authSuccess = () => {
  return {
    type: actionTypes.AUTH_SIGNUP_SUCCESS
  };
};

export const authLoginSuccess = (token, userId, displayName) => {
  return {
    type: actionTypes.AUTH_LOGIN_SUCCESS,
    token: token,
    userId: userId,
    displayName: displayName
  };
};

export const redirect = path => {
  return {
    type: actionTypes.REDIRECT,
    path: path
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  localStorage.removeItem("displayName");
  return {
    type: actionTypes.LOG_OUT
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const logInAuthentication = (email, password) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,

      returnSecureToken: true
    };
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAB19B5dTGF8d5swjPpPjVO8jimdez4mJY",
        authData
      )
      .then(response => {
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", response.data.localId);
        localStorage.setItem("displayName", response.data.displayName);
        dispatch(
          authLoginSuccess(
            response.data.idToken,
            response.data.localId,
            response.data.displayName
          )
        );
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch(err => {
        dispatch(authFailed(err.response.data.error.message));
      });
  };
};

export const signInAuthentication = (username, email, password) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      displayName: username,
      returnSecureToken: true
    };
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAB19B5dTGF8d5swjPpPjVO8jimdez4mJY",
        authData
      )
      .then(response => {
        dispatch(authSuccess());
        dispatch(redirect(true));
      })
      .catch(err => {
        dispatch(authFailed(err.response.data.error.message));
      });
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem("userId");
        const displayName = localStorage.getItem("displayName");
        dispatch(authLoginSuccess(token, userId, displayName));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
