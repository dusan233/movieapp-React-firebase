import React from "react";
import { connect } from "react-redux";
import * as actionCreator from "../../../store/index";
import Spinner from "../../../components/Spinner/Spinner";
import SearchNavigation from "../../../components/SearchNavigation/SearchNavigation";
import styles from "./SearchMovies.module.css";
import BasicMovieTvCard from "../../UI/Cards/BasicMoviTvCard/BasicMovieTvCard";
import Pagination from "../../../components/Pagination/Pagination";

class SearchMovies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNumber: 1
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.query !== this.props.match.params.query) {
      this.props.getMovieSearch(nextProps.match.params.query, 1);
      this.props.getMovieSearchCollections(nextProps.match.params.query, 1);
      this.props.getSerieSearch(nextProps.match.params.query, 1);
      this.props.getPeopleSearch(nextProps.match.params.query, 1);
      this.setState({
        pageNumber: 1
      });
      this.props.getRandomFooter();

      window.scrollTo(0, 0);
    }
    if (this.props.token && nextProps.token === null) {
      this.props.clearUsersFavWa();
    }
    if (this.props.token === null && nextProps.token) {
      this.props.getUsersFavorites(nextProps.token, nextProps.userId);
      this.props.getUserWatchlist(nextProps.token, nextProps.userId);
    }
  }

  componentDidMount() {
    this.props.getMovieSearch(
      this.props.match.params.query,
      this.state.pageNumber
    );
    this.props.getMovieSearchCollections(
      this.props.match.params.query,
      this.state.pageNumber
    );
    this.props.getSerieSearch(
      this.props.match.params.query,
      this.state.pageNumber
    );
    this.props.getPeopleSearch(
      this.props.match.params.query,
      this.state.pageNumber
    );
    this.props.getRandomFooter();
    if (this.props.token) {
      this.props.getUsersFavorites(this.props.token, this.props.userId);
      this.props.getUserWatchlist(this.props.token, this.props.userId);
    } else {
      this.props.clearUsersFavWa();
    }
    window.scrollTo(0, 0);
  }

  nextPageHandler = () => {
    let currentPage = this.state.pageNumber + 1;
    this.props.getMovieSearch(this.props.match.params.query, currentPage);
    this.setState({
      pageNumber: currentPage
    });
    window.scrollTo(0, 0);
  };

  prevPageHandler = () => {
    let currentPage = this.state.pageNumber - 1;
    this.props.getMovieSearch(this.props.match.params.query, currentPage);
    this.setState({
      pageNumber: currentPage
    });
    window.scrollTo(0, 0);
  };

  render() {
    const {
      movieSearch,
      peopleSearch,
      serieSearch,
      movieCollections: movieC
    } = this.props;

    let favorites = this.props.favorites ? this.props.favorites : null;
    let watchlist = this.props.watchlist ? this.props.watchlist : null;

    let movieSearchResults = movieSearch ? movieSearch.total_results : null;
    let serieSearchResults = serieSearch ? serieSearch.total_results : null;
    let peopleSearchResults = peopleSearch ? peopleSearch.total_results : null;
    let movieCollectionsResults = movieC ? movieC.total_results : null;

    let movieSearchTotalPages = movieSearch ? movieSearch.total_pages : null;

    let content;
    if (this.props.loading) {
      content = <Spinner />;
    } else {
      content = (
        <div className={styles.Container}>
          <div className={styles.Navigation}>
            <SearchNavigation
              mResults={movieSearchResults}
              sResults={serieSearchResults}
              people={peopleSearchResults}
              mCollection={movieCollectionsResults}
              query={this.props.match.params.query}
              type="movies"
            />
          </div>
          <div className={styles.Results}>
            <h1>Search > Movie Results</h1>
            <div>
              {movieSearch !== null && movieSearch.results.length > 0 ? (
                movieSearch.results.map(movie => {
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
                      overview={movie.overview.slice(0, 150)}
                      rating={movie.vote_average}
                    />
                  );
                })
              ) : (
                <h2>There is no match for {this.props.match.params.query}</h2>
              )}
            </div>
            {movieSearch && movieSearch.total_pages > 1 ? (
              <Pagination
                currentPage={this.state.pageNumber}
                totalPages={movieSearchTotalPages}
                nextPage={this.nextPageHandler}
                prevPage={this.prevPageHandler}
              />
            ) : null}
          </div>
        </div>
      );
    }

    return content;
  }
}

const mapStateToProps = state => {
  return {
    loading: state.spinner.loading,
    movieSearch: state.search.movieSearch,
    movieCollections: state.search.movieCollections,
    serieSearch: state.search.serieSearch,
    peopleSearch: state.search.peopleSearch,
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
    getMovieSearch: (query, pageNumber) =>
      dispatch(actionCreator.fetchMovieSearch(query, pageNumber)),
    getRandomFooter: () => dispatch(actionCreator.fetchRandomBackground()),
    getMovieSearchCollections: (query, pageNumber) =>
      dispatch(actionCreator.fetchMovieCollections(query, pageNumber)),
    getSerieSearch: (query, pageNumber) =>
      dispatch(actionCreator.fetchSerieSearch(query, pageNumber)),
    getPeopleSearch: (query, pageNumber) =>
      dispatch(actionCreator.fetchPeopleSearch(query, pageNumber)),

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
)(SearchMovies);
