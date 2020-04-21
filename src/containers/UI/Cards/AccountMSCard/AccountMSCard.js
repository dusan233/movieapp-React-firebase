import React from "react";
import styles from "./AccountMSCard.module.css";
import { Link } from "react-router-dom";
import brokenImage from "../../../../assets/img/no-image-icon-23485.png";

const AccountMSCard = props => {
  const posterPath = props.img;
  let poster = `https://image.tmdb.org/t/p/w500/${posterPath}`;

  if (!props.img) {
    poster = brokenImage;
  }

  let pathNamer =
    props.mediaType === "serie"
      ? `/serie/${props.movieId}`
      : `/movie/${props.movieId}`;
  return (
    <div className={styles.Card}>
      <Link
        to={{
          pathname: pathNamer
        }}
      >
        <img src={poster} alt="" />
      </Link>
      <div className={styles.Options}>
        <span className={styles.Number}>{props.number}</span>
        <i onClick={props.deleteItem} className="fas fa-times"></i>
        <i className="fas fa-star" />
        <span>{props.average}</span>
      </div>
      <div className={styles.Title}>{props.title}</div>
    </div>
  );
};

export default AccountMSCard;
