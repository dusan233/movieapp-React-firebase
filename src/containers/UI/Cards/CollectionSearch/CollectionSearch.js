import React from "react";
import styles from "./CollectionSearch.module.css";
import { Link } from "react-router-dom";

import brokenImage from "../../../../assets/img/no-image-icon-23485.png";

const CollectionSearch = props => {
  const posterPath = props.img;
  let poster = `https://image.tmdb.org/t/p/w500/${posterPath}`;
  if (props.img === null) {
    poster = brokenImage;
  }
  return (
    <div className={styles.Card}>
      <div className={styles.Img}>
        <Link to={{ pathname: `/movieCollection/${props.collectionId}` }}>
          <img
            style={{ width: props.img === null ? "50%" : "100%" }}
            src={poster}
            alt=""
          />
        </Link>
      </div>
      <div className={styles.Name}>
        <h3>{props.title}</h3>
      </div>
    </div>
  );
};

export default CollectionSearch;
