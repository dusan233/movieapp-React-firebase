import React from "react";
import styles from "./BasicMovieTvCard.module.css";
import { Link } from "react-router-dom";
import brokenImage from "../../../../assets/img/no-image-icon-23485.png";

class BasicMovieTvCard extends React.Component {
  constructor(props) {
    super(props);
    this.timer = null;
    this.state = {
      modal: false,
      shangeColor: ""
    };
  }
  componentWillUnmount() {
    this._mounted = false;
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }
  componentDidMount() {
    this._mounted = true;
  }

  showPopUpHandler = () => {
    this.setState({
      modal: true
    });
    this.timer = setTimeout(() => {
      this.setState({
        modal: false
      });
    }, 2000);
  };

  render() {
    const { props } = this;

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

    const posterPath = props.img;
    let poster = `https://image.tmdb.org/t/p/w500/${posterPath}`;
    if (props.img === null) {
      poster = brokenImage;
    }
    let rating = String(props.rating);
    if (rating.length < 2) {
      rating = props.rating + ".0";
    }
    let name = props.title || props.name;

    return (
      <div className={styles.Card}>
        <div
          style={{
            transform: this.state.modal ? "translateY(0)" : "translateY(-100%)"
          }}
          className={styles.Popup}
        >
          You have to be logged in to perform this task.
        </div>
        <div className={styles.Image}>
          <Link
            to={{
              pathname: `/${props.mediaType}/${props.movieId || props.serieId}`,
              state: {
                fromNotifications: true,
                movieId: "asdwq"
              }
            }}
          >
            <img src={poster} alt="" />
          </Link>
          <div className={styles.Icons}>
            <i
              style={{ color: isFavorite ? "red" : "black" }}
              onClick={
                props.isAuthenticated ? props.sendData : this.showPopUpHandler
              }
              className="fas fa-heart"
            />
            <i
              style={{ color: isOnWatchlist ? "#EF47B6" : "black" }}
              onClick={
                props.isAuthenticated
                  ? props.sendWatchlistData
                  : this.showPopUpHandler
              }
              className="fas fa-list-ul"
            />
          </div>
        </div>
        <div className={styles.Information}>
          <div className={styles.Part1}>
            <div className={styles.Rating}>
              <span>{rating}</span>
            </div>
            <div className={styles.Title}>
              <h3>{name}</h3>
              <p>{props.releaseDate}</p>
            </div>
          </div>
          <div className={styles.Part2}>
            <p>{props.overview}...</p>
          </div>
          <div className={styles.Part3}>
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to={{
                pathname: `/${props.mediaType}/${props.movieId ||
                  props.serieId}`,
                state: {
                  fromNotifications: true,
                  movieId: "asdwq"
                }
              }}
            >
              More Info
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default BasicMovieTvCard;
