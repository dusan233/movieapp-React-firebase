import React from "react";
import { connect } from "react-redux";
import * as actionCreator from "../../../store/index";
import { Link } from "react-router-dom";
import Overview from "../../../components/Overview/Overview";
import Spinner from "../../../components/Spinner/Spinner";
import styles from "../../../components/Overview/Overview.module.css";
import classes from "./MovieDetails.module.css";
import Slider from "react-slick";
import SliderCard from "../../UI/Cards/SliderCard/SliderCard";
import PersonCard from "../../UI/Cards/PersonCard/PersonCard";
import Reviews from "../../../components/Reviews/Reviews";

class MovieDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trailer: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.movieId !== this.props.match.params.movieId) {
      this.props.getMovieDetails(nextProps.match.params.movieId);
      this.props.getMovieVideo(nextProps.match.params.movieId);
      this.props.getMovieCast(nextProps.match.params.movieId);
      this.props.getMovieReviews(nextProps.match.params.movieId);
      this.props.getRecomendedMovies(nextProps.match.params.movieId);
      this.props.getRandomFooter();
      this.setState({
        allReviews: false
      });
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
    this.props.getMovieDetails(this.props.match.params.movieId);
    this.props.getMovieVideo(this.props.match.params.movieId);
    this.props.getMovieCast(this.props.match.params.movieId);
    this.props.getMovieReviews(this.props.match.params.movieId);
    this.props.getRecomendedMovies(this.props.match.params.movieId);
    this.props.getRandomFooter();
    if (this.props.token) {
      this.props.getUsersFavorites(this.props.token, this.props.userId);
      this.props.getUserWatchlist(this.props.token, this.props.userId);
    } else {
      this.props.clearUsersFavWa();
    }
    window.scrollTo(0, 0);
  }

  showTrailerHandler = () => {
    this.setState({
      trailer: !this.state.trailer,
      allReviews: false
    });
  };

  dosthm = () => {
    console.log(this.props.movieDetails);
  };

  allReviewsHandler = () => {
    this.setState({
      allReviews: true
    });
  };

  render() {
    const {
      movieDetails: movieD,
      youtube: youtubeVideo,
      movieCast,
      recomendedMovies
    } = this.props;

    const settings = {
      dots: true,
      infinite: true,
      speed: 2000,
      autoplay: true,
      slidesToShow: 5,
      autoplaySpeed: 5000,
      slidesToScroll: 5,
      lazyLoad: true,
      className: "slides",
      responsive: [
        {
          breakpoint: 700,
          settings: {
            dots: false,
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 1000,
          settings: {
            dots: true,
            slidesToShow: 3,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 1300,
          settings: {
            dots: true,
            slidesToShow: 4,
            slidesToScroll: 1
          }
        }
      ]
    };

    let favorites = this.props.favorites ? this.props.favorites : null;
    let watchlist = this.props.watchlist ? this.props.watchlist : null;
    const movieData = {
      ...movieD,
      userId: this.props.userId
    };

    let allReviews = this.props.movieReviews ? (
      this.props.movieReviews.map(review => {
        return (
          <Reviews text={review.content} name={review.author} key={review.id} />
        );
      })
    ) : (
      <h3>No reviews for this movie yet.</h3>
    );
    if (this.props.movieReviews && this.props.movieReviews.length < 1) {
      allReviews = <h3>No reviews for this movie yet.</h3>;
    }

    let youtubeKey = youtubeVideo ? youtubeVideo.key : null;
    let youtubeLink = `https://www.youtube.com/embed/${youtubeKey}`;

    let img = movieD ? movieD.poster_path : null;
    let background = movieD ? movieD.backdrop_path : null;
    let rating = movieD ? movieD.vote_average : null;
    let title = movieD ? movieD.title : "No data";
    let date = movieD ? movieD.release_date.slice(0, 4) : null;
    let overview = movieD ? movieD.overview : "No such data";
    let runtime = movieD ? movieD.runtime : "dasd";
    let genres = movieD ? movieD.genres : null;
    let budget = movieD ? movieD.budget : null;
    let revenue = movieD ? movieD.revenue : null;

    let collectionName =
      movieD && movieD.belongs_to_collection
        ? movieD.belongs_to_collection.name
        : null;
    let backgroundPath =
      movieD && movieD.belongs_to_collection
        ? movieD.belongs_to_collection.backdrop_path
        : null;
    let collectionBackground = `https://image.tmdb.org/t/p/w1280/${backgroundPath}`;

    let showCollection =
      movieD && movieD.belongs_to_collection ? (
        <div
          style={{ backgroundImage: `url(${collectionBackground})` }}
          className={classes.Collection}
        >
          <div className={classes.CollectionContainer}>
            <h1>Part of the ...{collectionName}</h1>
            <Link
              to={{
                pathname: `/movieCollection/${movieD.belongs_to_collection.id}`
              }}
            >
              <button className={classes.ViewCollection}>
                VIEW THE COLLECTION
              </button>
            </Link>
          </div>
        </div>
      ) : null;

    let content;
    if (this.props.loading) {
      content = <Spinner />;
    } else {
      content = (
        <div>
          <Overview
            sendData={() => {
              if (this.props.userLoading === false) {
                this.props.sendToUserAccountFavor(
                  this.props.token,
                  this.props.userId,
                  movieData,
                  parseInt(this.props.match.params.movieId),
                  favorites
                );
              } else {
                return;
              }
            }}
            usersFavorites={this.props.favorites ? this.props.favorites : null}
            usersWatchlist={this.props.watchlist ? this.props.watchlist : null}
            sendWatchlistData={() => {
              if (this.props.userLoading === false) {
                this.props.sendToUserAccountWatchlist(
                  this.props.token,
                  this.props.userId,
                  movieData,
                  parseInt(this.props.match.params.movieId),
                  watchlist
                );
              } else {
                return;
              }
            }}
            isAuthenticated={this.props.isAuthenticated}
            userLoading={this.props.userLoading}
            img={img}
            background={background}
            rating={rating}
            title={title}
            date={date}
            overview={overview}
            runtime={runtime}
            showTrailer={this.showTrailerHandler}
            genres={genres}
            budget={budget}
            revenue={revenue}
            movieId={parseInt(this.props.match.params.movieId)}
          />
          <div
            style={{ display: this.state.trailer ? "flex" : "none" }}
            className={styles.Youtube}
            onClick={this.showTrailerHandler}
          >
            <iframe
              title="movieDetails"
              width="560"
              height="315"
              src={youtubeLink}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen={true}
            />
          </div>

          <h1 className={classes.TopBilled} onClick={this.dosthm}>
            Top Billed Cast
          </h1>
          <div className={classes.Carousel}>
            {movieCast && movieCast.length !== 0 ? (
              <Slider {...settings}>
                {movieCast && movieCast.length !== 0
                  ? movieCast.map(person => {
                      return (
                        <PersonCard
                          personId={person.id}
                          key={person.cast_id}
                          img={person.profile_path}
                          name={person.name}
                        />
                      );
                    })
                  : null}
              </Slider>
            ) : (
              <h4>We don't have any cast added to this movie</h4>
            )}
          </div>
          <h4>Full Cast & Crew</h4>
          <hr />
          <h1 className={classes.TopBilled}>Reviews</h1>
          <div
            style={{
              height:
                this.state.allReviews ||
                (this.props.movieReviews && this.props.movieReviews.length < 1)
                  ? "auto"
                  : 350
            }}
            className={styles.ReviewsContainer}
          >
            {allReviews}
          </div>
          <h4 onClick={this.allReviewsHandler}>Read all Reviews</h4>
          <hr />
          {showCollection}
          <h1 className={classes.TopBilled} onClick={this.dosthm}>
            Recomended Movies
          </h1>
          <div className={classes.Carousel}>
            {recomendedMovies && recomendedMovies.length !== 0 ? (
              <Slider {...settings}>
                {recomendedMovies && recomendedMovies.length !== 0
                  ? recomendedMovies.map(movie => {
                      return (
                        <SliderCard
                          movieId={movie.id}
                          key={movie.id}
                          mediaType="movie"
                          img={movie.poster_path}
                          title={movie.title}
                        />
                      );
                    })
                  : null}
              </Slider>
            ) : (
              <h4>
                We don't have enough data to suggest any movies based on {title}
                .
              </h4>
            )}
          </div>
        </div>
      );
    }
    return content;
  }
}

const mapStateToProps = state => {
  return {
    movieDetails: state.movies.movieDetails,
    loading: state.spinner.loading,
    youtube: state.movies.moreDetails.youtube,
    movieCast: state.movies.moreDetails.movieCast,
    movieReviews: state.movies.moreDetails.movieReviews,
    recomendedMovies: state.movies.moreDetails.recomendedMovies,
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
    getMovieDetails: movieId =>
      dispatch(actionCreator.fetchMovieDetails(movieId)),
    getRandomFooter: () => dispatch(actionCreator.fetchRandomBackground()),
    getMovieVideo: movieId =>
      dispatch(actionCreator.fetchMovieYoutube(movieId)),
    getMovieCast: movieId => dispatch(actionCreator.fetchMovieCast(movieId)),
    getMovieReviews: movieId =>
      dispatch(actionCreator.fetchMovieReviews(movieId)),
    getRecomendedMovies: movieId =>
      dispatch(actionCreator.fetchRecomendedMovies(movieId)),
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
)(MovieDetails);
