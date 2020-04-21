import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import movieReducer from "./store/reducers/movies";
import seriesReducer from "./store/reducers/show";
import peopleReducer from "./store/reducers/people";
import searchReducer from "./store/reducers/search";
import authReducer from "./store/reducers/auth";
import userReducer from "./store/reducers/userContent";
import spinner from "./store/reducers/loader";
import thunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  movies: movieReducer,
  series: seriesReducer,
  people: peopleReducer,
  spinner: spinner,
  search: searchReducer,
  auth: authReducer,
  user: userReducer
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
