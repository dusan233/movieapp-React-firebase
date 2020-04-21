import React from "react";
import { connect } from "react-redux";
import * as actionCreator from "../../../store/index";
import styles from "../PopularMovies/PopularMovies.module.css";
import BasicMovieTvCard from "../../UI/Cards/BasicMoviTvCard/BasicMovieTvCard";
import Spinner from "../../../components/Spinner/Spinner";

class UpcomingMovies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.token && nextProps.token === null) {
      this.props.clearUsersFavWa();
    }
    if (this.props.token === null && nextProps.token) {
      this.props.getUsersFavorites(nextProps.token, nextProps.userId);
      this.props.getUserWatchlist(nextProps.token, nextProps.userId);
    }
  }

  componentDidMount() {
    this.props.getUpcomingMovies();
    this.props.getRandomFooter();
    if (this.props.token) {
      this.props.getUsersFavorites(this.props.token, this.props.userId);
      this.props.getUserWatchlist(this.props.token, this.props.userId);
    } else {
      this.props.clearUsersFavWa();
    }
    window.scrollTo(0, 0);
  }
  render() {
    let favorites = this.props.favorites ? this.props.favorites : null;
    let watchlist = this.props.watchlist ? this.props.watchlist : null;
    let content;
    if (this.props.loading) {
      content = <Spinner />;
    } else {
      content = (
        <div className={styles.Container}>
          {this.props.upcomingMovies != null
            ? this.props.upcomingMovies.map(movie => {
                const movieData = {
                  ...movie,
                  userId: this.props.userId
                };
                return (
                  <BasicMovieTvCard
                    sendData={() => {
                      if (this.props.userLoading === false) {
                        this.props.sendToUserAccountFavor(
                          this.props.token,
                          this.props.userId,
                          movieData,
                          movie.id,
                          favorites
                        );
                      } else {
                        return;
                      }
                    }}
                    usersFavorites={
                      this.props.favorites ? this.props.favorites : null
                    }
                    usersWatchlist={
                      this.props.watchlist ? this.props.watchlist : null
                    }
                    sendWatchlistData={() => {
                      if (this.props.userLoading === false) {
                        this.props.sendToUserAccountWatchlist(
                          this.props.token,
                          this.props.userId,
                          movieData,
                          movie.id,
                          watchlist
                        );
                      } else {
                        return;
                      }
                    }}
                    isAuthenticated={this.props.isAuthenticated}
                    userLoading={this.props.userLoading}
                    key={movie.id}
                    movieId={movie.id}
                    mediaType="movie"
                    img={movie.poster_path}
                    title={movie.title}
                    releaseDate={movie.release_date}
                    overview={movie.overview.slice(0, 100)}
                    rating={movie.vote_average}
                  />
                );
              })
            : null}
        </div>
      );
    }
    return (
      <div className={styles.Wrap}>
        <h1>Top 20 Upcoming Movies</h1>
        {content}
      </div>
    );
  }
}

const mapStateTopProps = state => {
  return {
    upcomingMovies: state.movies.upcomingMovies,
    loading: state.spinner.loading,
    userLoading: state.user.loading,
    token: state.auth.token,
    isAuthenticated: state.auth.token !== null,
    userId: state.auth.userId,
    favorites: state.user.favorites,
    watchlist: state.user.watchlist
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUpcomingMovies: () => dispatch(actionCreator.fetchUpcomingdMoives()),
    getRandomFooter: () => dispatch(actionCreator.fetchRandomBackground()),
    sendToUserAccountFavor: (token, sendData, movieData, itemId, favorites) =>
      dispatch(
        actionCreator.sendToUsersAccount(
          token,
          sendData,
          movieData,
          itemId,
          favorites
        )
      ),
    sendToUserAccountWatchlist: (
      token,
      sendData,
      movieData,
      itemId,
      watchlist
    ) =>
      dispatch(
        actionCreator.sendToUsersAccountWatchlist(
          token,
          sendData,
          movieData,
          itemId,
          watchlist
        )
      ),
    getUsersFavorites: (token, userId) =>
      dispatch(actionCreator.getUsersFavorites(token, userId)),
    getUserWatchlist: (token, userId) =>
      dispatch(actionCreator.getUsersWatchlist(token, userId)),
    clearUsersFavWa: () => dispatch(actionCreator.clearUsersFavWa())
  };
};

export default connect(
  mapStateTopProps,
  mapDispatchToProps
)(UpcomingMovies);
