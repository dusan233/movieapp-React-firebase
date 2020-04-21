import React from "react";
import styles from "./ActingHistory.module.css";
import { Link } from "react-router-dom";

const ActingHistory = props => {
  let mediaType = props.mediaType === "movie" ? "movie" : "serie";
  let year;
  if (props.year) {
    year = props.year.slice(0, 4);
  } else {
    year = "/";
  }
  return (
    <div
      style={{ display: props.name === null ? "none" : "block" }}
      className={styles.ActingHistory}
    >
      <span className={styles.Year}>{year}</span>
      <Link
        style={{ textDecoration: "none", color: "black" }}
        to={{
          pathname: `/${mediaType}/${props.mediaId}`
        }}
      >
        <span className={styles.Title}>{props.name}</span>
      </Link>
      <span className={styles.Role}>as {props.role}</span>
    </div>
  );
};

export default ActingHistory;
