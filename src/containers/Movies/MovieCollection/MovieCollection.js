import React from "react";
import styles from "./MovieCollection.module.css";

import { connect } from "react-redux";
import * as actionCreator from "../../../store/index";
import CollectionCard from "../../UI/Cards/CollectionCard/CollectionCard";
import Spinner from "../../../components/Spinner/Spinner";

import brokenImage from "../../../assets/img/no-image-icon-23485.png";

class MovieCollection extends React.Component {
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
    this.props.getRandomFooter();
    this.props.getCollection(this.props.match.params.collectionId);
    if (this.props.token) {
      this.props.getUsersFavorites(this.props.token, this.props.userId);
      this.props.getUserWatchlist(this.props.token, this.props.userId);
    } else {
      this.props.clearUsersFavWa();
    }
    window.scrollTo(0, 0);
  }

  render() {
    const { collectionDetails: clDetails } = this.props;

    let favorites = this.props.favorites ? this.props.favorites : null;
    let watchlist = this.props.watchlist ? this.props.watchlist : null;

    let allRatings = [];

    if (clDetails) {
      clDetails.parts.forEach(add => {
        if (add.vote_average > 0) {
          allRatings.push(add.vote_average);
        }
      });
    }

    let allSuperRatings = allRatings
      ? allRatings.reduce((add, sum) => {
          return add + sum;
        }, 0)
      : null;
    let rating = clDetails
      ? (allSuperRatings / allRatings.length).toFixed(1)
      : null;

    let image = clDetails ? clDetails.poster_path : null;
    let poster = clDetails ? `https://image.tmdb.org/t/p/w500/${image}` : null;
    if (clDetails && clDetails.poster_path === null) {
      poster = brokenImage;
    }

    let background = clDetails ? clDetails.backdrop_path : null;
    let backgroundPoster = clDetails
      ? `https://image.tmdb.org/t/p/w1280/${background}`
      : null;
    let title = clDetails ? clDetails.name : null;

    let overview = clDetails ? clDetails.overview : null;

    let content;
    if (this.props.loading) {
      content = <Spinner />;
    } else {
      content = (
        <React.Fragment>
          <div
            style={{ backgroundImage: `url(${backgroundPoster})` }}
            className={styles.Backdrop}
          >
            <div className={styles.Container}>
              <div className={styles.Img}>
                <img src={poster} alt="" />
              </div>
              <div className={styles.Info}>
                <span
                  onClick={() => {
                    this.props.history.goBack();
                  }}
                  className={styles.Back}
                >
                  <i className="fas fa-long-arrow-alt-left"></i>Back To Details
                </span>
                <h1>{title}</h1>
                <h2>
                  <i className="fas fa-star" />
                  {rating}
                </h2>
              </div>
            </div>
          </div>
          <div className={styles.Overview}>
            <div className={styles.Text}>
              <h3>Overview</h3>

              {overview}
            </div>
            <div className={styles.Facts}>
              <h3>Facts</h3>
              Number of movies: {clDetails ? clDetails.parts.length : null}
            </div>
          </div>
          <div className={styles.Movies}>
            <h3>Movies</h3>
            <div className={styles.Cards}>
              {clDetails
                ? clDetails.parts.map((movie, i) => {
                    const movieData = {
                      ...movie,
                      userId: this.props.userId
                    };
                    return (
                      <CollectionCard
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
                        img={movie.poster_path}
                        number={i + 1}
                        average={movie.vote_average}
                        movieId={movie.id}
                        title={movie.title}
                        key={movie.id}
                      />
                    );
                  })
                : null}
            </div>
          </div>
        </React.Fragment>
      );
    }

    return content;
  }
}

const mapStateToProps = state => {
  return {
    loading: state.spinner.loading,
    collectionDetails: state.movies.moreDetails.movieCollection,
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
    getRandomFooter: () => dispatch(actionCreator.fetchRandomBackground()),
    getCollection: collectionId =>
      dispatch(actionCreator.fetchMovieCollectione(collectionId)),
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
  mapStateToProps,
  mapDispatchToProps
)(MovieCollection);
