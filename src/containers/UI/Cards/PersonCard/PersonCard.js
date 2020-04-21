import React from "react";
import styles from "./PersonCard.module.css";
import { Link } from "react-router-dom";
import person from "../../../../assets/img/iconfinder_icon-person_211874.png";

const PersonCard = props => {
  const posterPath = props.img;
  let poster = `https://image.tmdb.org/t/p/w500/${posterPath}`;
  if (props.img === null) {
    poster = person;
  }
  return (
    <div className={styles.Card}>
      <div className={styles.Img}>
        <Link
          to={{
            pathname: `/person/${props.personId}`
          }}
        >
          <img src={poster} alt="" />
        </Link>
      </div>
      <div className={styles.Name}>
        <h3>{props.name}</h3>
      </div>
    </div>
  );
};

export default PersonCard;
