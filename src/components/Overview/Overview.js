import React from "react";
import styles from "./Overview.module.css";
import brokenImage from "../../assets/img/iconfinder_32_171485.png";
import Icons from "../../components/Iconse/Icons";
import { withRouter } from "react-router-dom";

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      layerColors: [
        "#283844",
        "#62083D",
        "#1A1A5E",
        "#3E6590",
        "#124A49",
        "#132434",
        "#2C1F2C",
        "#50301B",
        "#420503",
        "#AD1809"
      ],
      random: Math.floor(Math.random() * 9),
      randomColor: ""
    };
  }

  componentDidMount() {
    this.changeLayerColorHandler();
  }

  redirectToLogIn = () => {
    this.props.history.push("/login");
  };

  changeLayerColorHandler = () => {
    this.setState({
      randomColor: this.state.layerColors[this.state.random]
    });
  };

  render() {
    const { props } = this;

    const posterPath = props.img;
    let poster = `https://image.tmdb.org/t/p/w500/${posterPath}`;
    if (posterPath === null) {
      poster = brokenImage;
    }
    let rating = String(props.rating);
    if (rating.length < 2) {
      rating = props.rating + ".0";
    }
    let backgroundImage = props.background;
    let backgroundPoster = `https://image.tmdb.org/t/p/w1280/${backgroundImage}`;
    if (backgroundImage === null) {
      backgroundPoster = brokenImage;
    }

    let isFavorite;
    let isOnWatchlist;
    if (props.usersFavorites) {
      props.usersFavorites.forEach(item => {
        if (item.id === (props.movieId || props.serieId)) {
          isFavorite = true;
        }
      });
    }
    if (props.usersWatchlist) {
      props.usersWatchlist.forEach(item => {
        if (item.id === (props.movieId || props.serieId)) {
          isOnWatchlist = true;
        }
      });
    }

    return (
      <React.Fragment>
        <div
          style={{ backgroundImage: `url(${backgroundPoster})` }}
          className={styles.Overview}
        >
          <div
            style={{ backgroundColor: this.state.randomColor }}
            className={styles.Layer}
          >
            <div className={styles.Container}>
              <div className={styles.Img}>
                <img src={poster} alt="" />
              </div>
              <div className={styles.Info}>
                <h1>
                  {props.title}
                  <span>({props.date})</span>
                </h1>
                <div className={styles.Icons}>
                  <div className={styles.Rating}>
                    <span>{rating}</span>
                  </div>
                  <Icons
                    click={
                      props.isAuthenticated
                        ? props.sendData
                        : this.redirectToLogIn
                    }
                    text={
                      props.isAuthenticated
                        ? "Mark as Favorite"
                        : "You need to Log in"
                    }
                  >
                    <i
                      style={{ color: isFavorite ? "red" : "" }}
                      className="fas fa-heart"
                    />
                  </Icons>
                  <Icons
                    click={
                      props.isAuthenticated
                        ? props.sendWatchlistData
                        : this.redirectToLogIn
                    }
                    text={
                      props.isAuthenticated
                        ? "Add to your watchlist"
                        : "You need to Log in"
                    }
                  >
                    <i
                      style={{ color: isOnWatchlist ? "#EF47B6" : "" }}
                      className="fas fa-list-ul"
                    />
                  </Icons>
                  <span onClick={this.props.showTrailer}>
                    <i className="fas fa-play" />
                    Play trailer
                  </span>
                </div>
                <h3>Overview</h3>
                <p>{props.overview ? props.overview : "No overview found."}</p>
                {props.type ? <span>Runtime: {props.runtime} min</span> : null}
                {props.genres
                  ? props.genres.map(genre => {
                      return (
                        <button key={genre.name} className={styles.Genre}>
                          {genre.name}
                        </button>
                      );
                    })
                  : null}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Overview);
