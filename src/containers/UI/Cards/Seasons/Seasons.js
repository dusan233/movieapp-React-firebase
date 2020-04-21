import React from "react";
import styles from "./Seasons.module.css";
import brokenImage from "../../../../assets/img/no-image-icon-23485.png";

const Seasons = props => {
  const posterPath = props.img;
  let poster = `https://image.tmdb.org/t/p/w400/${posterPath}`;
  if (posterPath === null) {
    poster = brokenImage;
  }
  return (
    <div className={styles.Card}>
      <div className={styles.Img}>
        <img src={poster} alt="" />
      </div>
      <div className={styles.Info}>
        <h2>{props.title}</h2>
        <h3>
          {props.year} || {props.episodes} episodes
        </h3>
        <p>{props.overview}</p>
      </div>
    </div>
  );
};

export default Seasons;
