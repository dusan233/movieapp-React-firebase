import React from "react";
import BasicMovieTvCard from "../UI/Cards/BasicMoviTvCard/BasicMovieTvCard";
import { connect } from "react-redux";
import * as actionCreator from "../../store/index";
import styles from "../Movies/PopularMovies/PopularMovies.module.css";
import Spinner from "../../components/Spinner/Spinner";

class PopularSeries extends React.Component {
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
    this.props.getTopRatedSeries();
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
          {this.props.topRatedSeries != null
            ? this.props.topRatedSeries.map(serie => {
                const serieData = {
                  ...serie,
                  userId: this.props.userId,
                  mediaType: "serie"
                };
                return (
                  <BasicMovieTvCard
                    sendData={() => {
                      if (this.props.userLoading === false) {
                        this.props.sendToUserAccountFavor(
                          this.props.token,
                          this.props.userId,
                          serieData,
                          serie.id,
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
                          serieData,
                          serie.id,
                          watchlist
                        );
                      } else {
                        return;
                      }
                    }}
                    isAuthenticated={this.props.isAuthenticated}
                    userLoading={this.props.userLoading}
                    key={serie.id}
                    serieId={serie.id}
                    mediaType="serie"
                    img={serie.poster_path}
                    name={serie.name}
                    releaseDate={serie.release_date}
                    overview={serie.overview.slice(0, 100)}
                    rating={serie.vote_average}
                  />
                );
              })
            : null}
        </div>
      );
    }
    return (
      <div className={styles.Wrap}>
        <h1>20 Top Rated Tv Shows</h1>
        {content}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    topRatedSeries: state.series.topRatedSeries,
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
    getTopRatedSeries: () => dispatch(actionCreator.fetchTopRatedSeries()),
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
  mapStateToProps,
  mapDispatchToProps
)(PopularSeries);
