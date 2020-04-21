import * as actionTypes from "../actions/actionTypes";
import axios from "axios";

export const sendToUsersAccountSuccess = () => {
  return {
    type: actionTypes.SEND_DATA_SUCCESS
  };
};

export const sendToUsersAccountStart = () => {
  return {
    type: actionTypes.SEND_DATA_START
  };
};

export const getUserStart = () => {
  return {
    type: actionTypes.GET_USER_FAVORITE
  };
};
export const getUserFinish = () => {
  return {
    type: actionTypes.GET_USER_FINISH
  };
};
export const getUserFavoritesSuccess = data => {
  return {
    type: actionTypes.GET_FAVORITES_SUCCESS,
    favorites: data
  };
};
export const getUserWatchlistSuccess = data => {
  return {
    type: actionTypes.GET_WATCHLIST_SUCCESS,
    watchlist: data
  };
};

export const clearUsersFavWa = () => {
  return {
    type: actionTypes.CLEAR_USERS_FAV_WA
  };
};

export const deleteFavOrWatch = (token, userId, itemId, listType) => {
  return dispatch => {
    if (listType === "favorites") {
      const queryParam =
        "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
      axios
        .get("https://movidb-c4446.firebaseio.com/favorites.json" + queryParam)
        .then(response => {
          for (let key in response.data) {
            let mainKey = [key];
            if (itemId === response.data[key].id) {
              axios
                .delete(
                  `https://movidb-c4446.firebaseio.com/favorites/${mainKey}.json?auth=` +
                    token
                )
                .then(response => {
                  dispatch(getUsersFavorites(token, userId));
                });
            }
          }
        });
    } else {
      const queryParam =
        "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
      axios
        .get("https://movidb-c4446.firebaseio.com/watchlist.json" + queryParam)
        .then(response => {
          for (let key in response.data) {
            let mainKey = [key];
            if (itemId === response.data[key].id) {
              axios
                .delete(
                  `https://movidb-c4446.firebaseio.com/watchlist/${mainKey}.json?auth=` +
                    token
                )
                .then(response => {
                  dispatch(getUsersWatchlist(token, userId));
                });
            }
          }
        });
    }
  };
};

export const sendToUsersAccount = (
  token,
  userId,
  sendData,
  itemId,
  userFavorites
) => {
  return dispatch => {
    dispatch(sendToUsersAccountStart());
    let deleteItem;
    userFavorites.forEach(item => {
      if (item.id === itemId) {
        deleteItem = true;
      }
    });
    if (deleteItem) {
      const queryParam =
        "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
      axios
        .get("https://movidb-c4446.firebaseio.com/favorites.json" + queryParam)
        .then(response => {
          for (let key in response.data) {
            let mainKey = [key];
            if (itemId === response.data[key].id) {
              axios
                .delete(
                  `https://movidb-c4446.firebaseio.com/favorites/${mainKey}.json?auth=` +
                    token
                )
                .then(response => {
                  dispatch(sendToUsersAccountSuccess());
                  dispatch(getUsersFavorites(token, userId));
                });
            }
          }
        });
    } else {
      dispatch(sendToUsersAccountStart());
      axios
        .post(
          "https://movidb-c4446.firebaseio.com/favorites.json?auth=" + token,
          sendData
        )
        .then(response => {
          dispatch(sendToUsersAccountSuccess());
          dispatch(getUsersFavorites(token, userId));
        })
        .catch(err => {
          console.log(err.response.data.error.message);
        });
    }
  };
};

export const sendToUsersAccountWatchlist = (
  token,
  userId,
  sendData,
  itemId,
  userWatchlist
) => {
  return dispatch => {
    let deleteItem;
    userWatchlist.forEach(item => {
      if (item.id === itemId) {
        deleteItem = true;
      }
    });
    if (deleteItem) {
      const queryParam =
        "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
      axios
        .get("https://movidb-c4446.firebaseio.com/watchlist.json" + queryParam)
        .then(response => {
          for (let key in response.data) {
            let mainKey = [key];
            if (itemId === response.data[key].id) {
              axios
                .delete(
                  `https://movidb-c4446.firebaseio.com/watchlist/${mainKey}.json?auth=` +
                    token
                )
                .then(response => {
                  dispatch(getUsersWatchlist(token, userId));
                });
            }
          }
        });
    } else {
      dispatch(sendToUsersAccountStart());
      axios
        .post(
          "https://movidb-c4446.firebaseio.com/watchlist.json?auth=" + token,
          sendData
        )
        .then(response => {
          dispatch(sendToUsersAccountSuccess());
          dispatch(getUsersWatchlist(token, userId));
        })
        .catch(err => {
          console.log(err.response.data.error.message);
        });
    }
  };
};

export const getUsersFavorites = (token, userId) => {
  return dispatch => {
    dispatch(getUserStart());
    const queryParam =
      "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios
      .get("https://movidb-c4446.firebaseio.com/favorites.json" + queryParam)
      .then(response => {
        const favorites = [];
        for (let key in response.data) {
          favorites.push(response.data[key]);
        }

        dispatch(getUserFavoritesSuccess(favorites));
      })
      .catch(err => {
        dispatch(getUserFinish());
      });
  };
};

export const getUsersWatchlist = (token, userId) => {
  return dispatch => {
    dispatch(getUserStart());
    const queryParam =
      "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios
      .get("https://movidb-c4446.firebaseio.com/watchlist.json" + queryParam)
      .then(response => {
        const watchlist = [];
        for (let key in response.data) {
          watchlist.push(response.data[key]);
        }

        dispatch(getUserWatchlistSuccess(watchlist));
      })
      .catch(err => {
        dispatch(getUserFinish());
      });
  };
};
