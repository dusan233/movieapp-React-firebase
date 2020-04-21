import React from "react";
import styles from "./Reviews.module.css";

const Reviews = props => {
  return (
    <div className={styles.Review}>
      <div className={styles.Coment}>
        <h3>A review by {props.name}</h3>

        <p>{props.text}</p>
      </div>
    </div>
  );
};

export default Reviews;
