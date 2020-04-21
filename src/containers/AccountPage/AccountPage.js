import React from "react";
import { connect } from "react-redux";
import * as actionCreator from "../../store/index";

import ProfileOverview from "../../components/ProfileOverview/ProfileOverview";
import styles from "./AccountPage.module.css";

import AccountMSCard from "../UI/Cards/AccountMSCard/AccountMSCard";

import Spinner from "../../components/Spinner/Spinner";

class AccountPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.getRandomFooter();
    if (this.props.token) {
      this.props.getUsersFavorites(this.props.token, this.props.userId);
      this.props.getUserWatchlist(this.props.token, this.props.userId);
    }
    window.scrollTo(0, 0);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.token === null && nextProps.token) {
      this.props.getUsersFavorites(nextProps.token, nextProps.userId);
      this.props.getUserWatchlist(nextProps.token, nextProps.userId);
    }
  }
  render() {
    const username = this.props.username ? this.props.username : null;
    const favoritesNumber = this.props.favorites
      ? this.props.favorites.length
      : null;
    const watchlistNumber = this.props.watchlist
      ? this.props.watchlist.length
      : null;

    const content1 = this.props.loading ? (
      <Spinner />
    ) : (
      <div className={styles.FavWaContainer}>
        {this.props.favorites && this.props.favorites.length > 0 ? (
          this.props.favorites.map((movie, i) => {
            if (movie.mediaType === "serie") {
              return (
                <AccountMSCard
                  img={movie.poster_path}
                  number={i + 1}
                  average={movie.vote_average}
                  movieId={movie.id}
                  title={movie.title}
                  key={movie.id}
                  mediaType="serie"
                  deleteItem={() => {
                    this.props.deleteUsersItems(
                      this.props.token,
                      this.props.userId,
                      movie.id,
                      "favorites"
                    );
                  }}
                />
              );
            } else {
              return (
                <AccountMSCard
                  img={movie.poster_path}
                  number={i + 1}
                  average={movie.vote_average}
                  movieId={movie.id}
                  title={movie.title}
                  key={movie.id}
                  mediaType="movie"
                  deleteItem={() => {
                    this.props.deleteUsersItems(
                      this.props.token,
                      this.props.userId,
                      movie.id,
                      "favorites"
                    );
                  }}
                />
              );
            }
          })
        ) : (
          <h4>
            Your favorites list is empty please add something to your list
          </h4>
        )}
      </div>
    );
    return (
      <div className={styles.Profile}>
        <ProfileOverview
          name={username}
          favoritesNumber={favoritesNumber}
          watchlistNumber={watchlistNumber}
        />
        <h2>My Favorites</h2>
        {content1}
        <h2>My Watchlist</h2>
        <div className={styles.FavWaContainer}>
          {this.props.watchlist && this.props.watchlist.length > 0 ? (
            this.props.watchlist.map((movie, i) => {
              if (movie.mediaType === "serie") {
                return (
                  <AccountMSCard
                    img={movie.poster_path}
                    number={i + 1}
                    average={movie.vote_average}
                    movieId={movie.id}
                    title={movie.title}
                    key={movie.id}
                    mediaType="serie"
                    deleteItem={() => {
                      this.props.deleteUsersItems(
                        this.props.token,
                        this.props.userId,
                        movie.id,
                        "watchlist"
                      );
                    }}
                  />
                );
              } else {
                return (
                  <AccountMSCard
                    img={movie.poster_path}
                    number={i + 1}
                    average={movie.vote_average}
                    movieId={movie.id}
                    title={movie.title}
                    key={movie.id}
                    mediaType="movie"
                    deleteItem={() => {
                      this.props.deleteUsersItems(
                        this.props.token,
                        this.props.userId,
                        movie.id,
                        "watchlist"
                      );
                    }}
                  />
                );
              }
            })
          ) : (
            <h4>Your watchlist is empty please add something to your list.</h4>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.user.loading,
    token: state.auth.token,
    userId: state.auth.userId,
    username: state.auth.displayName,
    favorites: state.user.favorites,
    watchlist: state.user.watchlist
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getRandomFooter: () => dispatch(actionCreator.fetchRandomBackground()),
    getUsersFavorites: (token, userId) =>
      dispatch(actionCreator.getUsersFavorites(token, userId)),
    getUserWatchlist: (token, userId) =>
      dispatch(actionCreator.getUsersWatchlist(token, userId)),
    deleteUsersItems: (token, userId, itemId, itemType) =>
      dispatch(actionCreator.deleteFavOrWatch(token, userId, itemId, itemType))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountPage);
