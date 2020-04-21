import React from "react";
import styles from "./CollectionCard.module.css";
import { Link, withRouter } from "react-router-dom";

import brokenImage from "../../../../assets/img/no-image-icon-23485.png";

const CollectionCard = props => {
  const posterPath = props.img;
  let poster = `https://image.tmdb.org/t/p/w500/${posterPath}`;
  if (props.img === null) {
    poster = brokenImage;
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
    <div className={styles.Card}>
      <Link to={{ pathname: `/movie/${props.movieId}` }}>
        <img src={poster} alt="" />
      </Link>
      <div className={styles.Options}>
        <span className={styles.Number}>{props.number}</span>
        <i
          style={{ color: isFavorite ? "red" : "white" }}
          onClick={
            props.isAuthenticated
              ? props.sendData
              : () => {
                  props.history.push("/login");
                }
          }
          className="fas fa-heart"
        />
        <i
          style={{ color: isOnWatchlist ? "#EF47B6" : "white" }}
          onClick={
            props.isAuthenticated
              ? props.sendWatchlistData
              : () => {
                  props.history.push("/login");
                }
          }
          className="fas fa-list-ul"
        />
        <i className="fas fa-star" />
        <span>{props.average}</span>
      </div>
      <div className={styles.Title}>{props.title}</div>
    </div>
  );
};

export default withRouter(CollectionCard);
