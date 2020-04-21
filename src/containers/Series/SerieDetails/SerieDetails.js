import React from "react";
import { connect } from "react-redux";
import * as actionCreator from "../../../store/index";
import Overview from "../../../components/Overview/Overview";
import Spinner from "../../../components/Spinner/Spinner";
import styles from "./SerieDetails.module.css";
import Slider from "react-slick";
import PersonCard from "../../UI/Cards/PersonCard/PersonCard";
import Reviews from "../../../components/Reviews/Reviews";
import SliderCard from "../../UI/Cards/SliderCard/SliderCard";
import Seasons from "../../UI/Cards/Seasons/Seasons";

class SerieDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trailer: false,
      allReviews: false
    };
  }

  componentDidMount() {
    this.props.getSerieDetails(this.props.match.params.serieId);
    this.props.getSerieYoutube(this.props.match.params.serieId);
    this.props.getSerieCast(this.props.match.params.serieId);
    this.props.getSerieReviews(this.props.match.params.serieId);
    this.props.getRecomendedSeries(this.props.match.params.serieId);
    this.props.getRandomFooter();
    if (this.props.token) {
      this.props.getUsersFavorites(this.props.token, this.props.userId);
      this.props.getUserWatchlist(this.props.token, this.props.userId);
    } else {
      this.props.clearUsersFavWa();
    }
    window.scrollTo(0, 0);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.serieId !== this.props.match.params.serieId) {
      this.props.getSerieDetails(nextProps.match.params.serieId);
      this.props.getSerieYoutube(nextProps.match.params.serieId);
      this.props.getSerieCast(nextProps.match.params.serieId);
      this.props.getSerieReviews(nextProps.match.params.serieId);
      this.props.getRecomendedSeries(nextProps.match.params.serieId);
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

  showTrailerHandler = () => {
    this.setState({
      trailer: !this.state.trailer,
      allReviews: false
    });
  };

  allReviewsHandler = () => {
    this.setState({
      allReviews: true
    });
  };
  render() {
    const {
      serieDetails: serieD,
      loading,
      youtube: youtubeVideo,
      serieCast,
      recomendedSeries
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
    const serieData = {
      ...serieD,
      userId: this.props.userId,
      mediaType: "serie"
    };

    let allReviews = this.props.serieReviews ? (
      this.props.serieReviews.map(review => {
        return (
          <Reviews text={review.content} name={review.author} key={review.id} />
        );
      })
    ) : (
      <h3>No reviews for this movie yet.</h3>
    );
    if (this.props.serieReviews && this.props.serieReviews.length < 1) {
      allReviews = <h3>No reviews for this show yet.</h3>;
    }

    let youtubeKey = youtubeVideo ? youtubeVideo.key : null;
    let youtubeLink = `https://www.youtube.com/embed/${youtubeKey}`;

    let img = serieD ? serieD.poster_path : null;
    let background = serieD ? serieD.backdrop_path : null;
    let rating = serieD ? serieD.vote_average : null;
    let title = serieD ? serieD.name : null;
    let date =
      serieD && serieD.first_air_date ? serieD.first_air_date.slice(0, 4) : "/";
    let overview = serieD ? serieD.overview : null;
    let genres = serieD ? serieD.genres : null;

    let content;
    if (loading) {
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
                  serieData,
                  parseInt(this.props.match.params.serieId),
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
                  serieData,
                  parseInt(this.props.match.params.serieId),
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
            genres={genres}
            showTrailer={this.showTrailerHandler}
            serieId={parseInt(this.props.match.params.serieId)}
          />
          <div
            style={{ display: this.state.trailer ? "flex" : "none" }}
            className={styles.Youtube}
            onClick={this.showTrailerHandler}
          >
            <iframe
              title="serieDetails"
              width="560"
              height="315"
              src={youtubeLink}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen={true}
            />
          </div>

          <h1 className={styles.TopBilled} onClick={this.dosthm}>
            Series Cast
          </h1>

          <div className={styles.Carousel}>
            {serieCast && serieCast.length !== 0 ? (
              <Slider {...settings}>
                {serieCast
                  ? serieCast.map(person => {
                      return (
                        <PersonCard
                          personId={person.id}
                          key={person.id}
                          img={person.profile_path}
                          name={person.name}
                        />
                      );
                    })
                  : null}
              </Slider>
            ) : (
              <h4>We don't have any cast added to this TV Show.</h4>
            )}
          </div>
          <h4>Full Cast & Crew</h4>

          <hr />
          <h1 className={styles.TopBilled} onClick={this.dosthm}>
            Seasons
          </h1>
          <div className={styles.SeasonsContainer}>
            {serieD && serieD.seasons.length !== 0 ? (
              serieD.seasons.map(season => {
                return (
                  <Seasons
                    img={season.poster_path}
                    overview={season.overview}
                    title={season.name}
                    key={season.name}
                    year={
                      season.air_date ? season.air_date.slice(0, 4) : "no info"
                    }
                    episodes={season.episode_count}
                  />
                );
              })
            ) : (
              <h4>No data.</h4>
            )}
          </div>
          <hr />
          <h1 className={styles.TopBilled}>Reviews</h1>
          <div
            style={{
              height:
                this.state.allReviews ||
                (this.props.serieReviews && this.props.serieReviews.length < 1)
                  ? "auto"
                  : 350
            }}
            className={styles.ReviewsContainer}
          >
            {allReviews}
          </div>
          <h4 onClick={this.allReviewsHandler}>Read all Reviews</h4>
          <hr />
          <h1 className={styles.TopBilled} onClick={this.dosthm}>
            Recomended Shows
          </h1>
          <div className={styles.Carousel}>
            {recomendedSeries && recomendedSeries.length !== 0 ? (
              <Slider {...settings}>
                {recomendedSeries
                  ? recomendedSeries.map(serie => {
                      return (
                        <SliderCard
                          serieId={serie.id}
                          key={serie.id}
                          mediaType="serie"
                          img={serie.poster_path}
                          title={serie.name}
                        />
                      );
                    })
                  : null}
              </Slider>
            ) : (
              <h4>
                We don't have enough data to suggest any Tv Shows based on{" "}
                {title}.
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
    serieDetails: state.series.serieDetails,
    loading: state.spinner.loading,
    youtube: state.series.moreDetails.youtube,
    serieCast: state.series.moreDetails.serieCast,
    serieReviews: state.series.moreDetails.serieReviews,
    recomendedSeries: state.series.moreDetails.recomendedSeries,
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
    getSerieDetails: serieId =>
      dispatch(actionCreator.fetchSerieDetails(serieId)),
    getRandomFooter: () => dispatch(actionCreator.fetchRandomBackground()),
    getSerieYoutube: serieId =>
      dispatch(actionCreator.fetchSerieYoutube(serieId)),
    getSerieCast: serieId => dispatch(actionCreator.fetchSerieCast(serieId)),
    getSerieReviews: serieId =>
      dispatch(actionCreator.fetchSerieReviews(serieId)),
    getRecomendedSeries: serieId =>
      dispatch(actionCreator.fetchRecomendedSeries(serieId)),
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
)(SerieDetails);
