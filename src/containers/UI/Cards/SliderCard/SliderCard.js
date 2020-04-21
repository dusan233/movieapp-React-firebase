import React from "react";

import brokenImage from "../../../../assets/img/no-image-icon-23485.png";

import styles from "./SliderCard.module.css";
import { Link } from "react-router-dom";

const SliderCard = props => {
  const cardHeight = {
    height: props.img === null ? props.height : null
  };
  const posterPath = props.img;
  let poster = `https://image.tmdb.org/t/p/w500/${posterPath}`;
  if (posterPath === null) {
    poster = brokenImage;
  }

  return (
    <div style={cardHeight} className={styles.Card}>
      <img src={poster} alt="" />
      <div className={styles.Title}>
        <h5>{props.title}</h5>
      </div>
      <div className={styles.Details}>
        <Link
          style={{ textDecoration: "none", color: "white" }}
          to={{
            pathname: `/${props.mediaType}/${props.movieId || props.serieId}`,
            state: {
              fromNotifications: true,
              movieId: "asdwq"
            }
          }}
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default SliderCard;
