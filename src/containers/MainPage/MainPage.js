import React from "react";
import { connect } from "react-redux";
import styles from "./MainPage.module.css";
import * as actionCreator from "../../store/index";
import SliderCard from "../UI/Cards/SliderCard/SliderCard";
import Spinner from "../../components/Spinner/Spinner";
import deadpool from "../../assets/img/deadpool-06f2a06d7a418ec887300397b6861383bf1e3b72f604ddd5f75bce170e81dce9.png";
import stats from "../../assets/img/sheldon-1a29d9f7807771f061c5a3799a61ed2f0a84505553c70fc99719df02335d9746.png";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../../node_modules/slick-carousel/slick/slick.css";
import "../../../node_modules/slick-carousel/slick/slick-theme.css";

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.sliderHeight = React.createRef();
  }

  componentDidMount() {
    this.props.getTheatersMovies();
    this.props.getOnTvSeries();
    this.props.getRandomFooter();
    window.scrollTo(0, 0);
  }

  render() {
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
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplaySpeed: 4000
          }
        },
        {
          breakpoint: 1000,
          settings: {
            dots: false,
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 1300,
          settings: {
            dots: true,
            slidesToShow: 3,
            slidesToScroll: 3
          }
        }
      ]
    };
    let content;
    if (this.props.loading) {
      content = <Spinner />;
    } else {
      content = (
        <div>
          <div className={styles.Carousel}>
            <Slider {...settings}>
              {this.props.inTheatersMovies != null
                ? this.props.inTheatersMovies.map(movie => {
                    return (
                      <SliderCard
                        key={movie.id}
                        movieId={movie.id}
                        mediaType="movie"
                        img={movie.poster_path}
                        title={movie.title}
                      />
                    );
                  })
                : null}
            </Slider>
          </div>
          <h1>On Tv</h1>
          <div className={styles.Carousel}>
            <Slider {...settings}>
              {this.props.onTvSeries != null
                ? this.props.onTvSeries.map(movie => {
                    return (
                      <SliderCard
                        key={movie.id}
                        serieId={movie.id}
                        mediaType="serie"
                        img={movie.poster_path}
                        title={movie.name}
                      />
                    );
                  })
                : null}
            </Slider>
          </div>
          <div className={styles.Staters}>
            <div className={styles.StatsWrap}>
              <div className={styles.StatsInfo}>
                <h1>Stats</h1>
                <p>We all love them. Here's a few that we find interesting.</p>
                <div className={styles.StatsContainer}>
                  <div className={styles.Stats}>
                    <h3>480,159</h3>
                    <span>Movies</span>
                  </div>
                  <div className={styles.Stats}>
                    <h3>84,239</h3>
                    <span>Tv Shows</span>
                  </div>
                  <div className={styles.Stats}>
                    <h3>115,745</h3>
                    <span>Tv Seasons</span>
                  </div>
                  <div className={styles.Stats}>
                    <h3>1,735,367</h3>
                    <span>Episodes</span>
                  </div>
                  <div className={styles.Stats}>
                    <h3>1,443,556</h3>
                    <span>People</span>
                  </div>
                  <div className={styles.Stats}>
                    <h3>2,427,005</h3>
                    <span>Images</span>
                  </div>
                </div>
                <button className={styles.Contact}>Contact TMDB</button>
              </div>
              <div className={styles.StatsImg}>
                <img src={stats} alt="" />
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className={styles.Container}>
        <div className={styles.AboutContainer}>
          <div className={styles.About}>
            <h1>Hi there,</h1>
            <img src={deadpool} alt="" />
            <h3>Let's talk about TMDb</h3>
            <p>
              The Movie Database (TMDb) is a community built movie and TV
              database. Every piece of data has been added by our amazing
              community dating back to 2008. TMDb's strong international focus
              and breadth of data is largely unmatched and something we're
              incredibly proud of. Put simply, we live and breathe community and
              that's precisely what makes us different.
            </p>
          </div>
        </div>
        <h1>In Theaters</h1>

        {content}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    inTheatersMovies: state.movies.inTheatersMovies,
    onTvSeries: state.series.popularSeries,
    loading: state.spinner.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTheatersMovies: () => dispatch(actionCreator.fetchInTheaterMovies()),
    getOnTvSeries: () => dispatch(actionCreator.fetchPopularSeries()),
    getRandomFooter: () => dispatch(actionCreator.fetchRandomBackground())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage);
