import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Switch, Route, Redirect } from "react-router-dom";
import PopularMovies from "../../Movies/PopularMovies/PopularMovies";
import MainPage from "../../MainPage/MainPage";
import TopRatedMovies from "../../Movies/TopRatedMovies/TopRatedMovies";
import UpcomingMovies from "../../Movies/UpcomingMovies/UpcomingMovies";
import PopularSeries from "../../Series/PopularSeries";
import TopRatedSeries from "../../Series/TopRatedSeries";
import PopularPeople from "../../People/PopularPeople";
import MovieDetails from "../../Movies/MovieDetails/MovieDetails";
import SerieDetails from "../../Series/SerieDetails/SerieDetails";
import PersonDetails from "../../People/PersonDetails/PersonDetails";
import SearchMovies from "../../Search/SearchMovies/SearchMovies.js";
import SearchSeries from "../../Search/SearchSeries/SearchSeries";
import SearchCollections from "../../Search/SearchCollection/SearchCollections";
import SearchPeople from "../../Search/SearchPeople/SearchPeople";
import MovieCollection from "../../Movies/MovieCollection/MovieCollection";
import Login from "../../Auth/Login";
import Signup from "../../Auth/Signup";
import AccountPage from "../../AccountPage/AccountPage";

import { connect } from "react-redux";
import * as actionCreator from "../../../store/index";

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.checkAuthState();
  }

  render() {
    let routes;
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/" exact component={MainPage} />
          <Route path="/popularmovies" component={PopularMovies} />
          <Route path="/topratedmovies" component={TopRatedMovies} />
          <Route path="/upcomingmovies" component={UpcomingMovies} />
          <Route path="/popularseries" component={PopularSeries} />
          <Route path="/topratedseries" component={TopRatedSeries} />
          <Route path="/popularpeople" component={PopularPeople} />
          <Route path="/movie/:movieId" component={MovieDetails} />
          <Route path="/serie/:serieId" component={SerieDetails} />
          <Route path="/person/:personId" component={PersonDetails} />
          <Route path="/search/movie/:query" component={SearchMovies} />
          <Route path="/search/serie/:query" component={SearchSeries} />
          <Route
            path="/search/collection/:query"
            component={SearchCollections}
          />
          <Route path="/search/people/:query" component={SearchPeople} />
          <Route
            path="/movieCollection/:collectionId"
            component={MovieCollection}
          />
          <Route path="/useraccount" component={AccountPage} />
          <Redirect to="/" />
        </Switch>
      );
    } else {
      routes = (
        <Switch>
          <Route path="/" exact component={MainPage} />
          <Route path="/popularmovies" component={PopularMovies} />
          <Route path="/topratedmovies" component={TopRatedMovies} />
          <Route path="/upcomingmovies" component={UpcomingMovies} />
          <Route path="/popularseries" component={PopularSeries} />
          <Route path="/topratedseries" component={TopRatedSeries} />
          <Route path="/popularpeople" component={PopularPeople} />
          <Route path="/movie/:movieId" component={MovieDetails} />
          <Route path="/serie/:serieId" component={SerieDetails} />
          <Route path="/person/:personId" component={PersonDetails} />
          <Route path="/search/movie/:query" component={SearchMovies} />
          <Route path="/search/serie/:query" component={SearchSeries} />
          <Route
            path="/search/collection/:query"
            component={SearchCollections}
          />
          <Route path="/search/people/:query" component={SearchPeople} />
          <Route
            path="/movieCollection/:collectionId"
            component={MovieCollection}
          />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />

          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <React.Fragment>
        <Navbar />
        {routes}
        <Footer />
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    token: state.auth.token
  };
};
const mapDispatchToProps = dispatch => {
  return {
    checkAuthState: () => dispatch(actionCreator.authCheckState())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);
