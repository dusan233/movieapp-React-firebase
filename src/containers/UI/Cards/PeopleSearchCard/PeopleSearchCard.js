import React from "react";
import styles from "./PeopleSearchCard.module.css";
import { Link } from "react-router-dom";

import person from "../../../../assets/img/iconfinder_icon-person_211874.png";

const PeopleSearchCard = props => {
  const posterPath = props.img;
  let poster = `https://image.tmdb.org/t/p/w400/${posterPath}`;
  if (props.img === null) {
    poster = person;
  }
  return (
    <Link
      style={{ textDecoration: "none", color: "black" }}
      to={{ pathname: `/person/${props.personId}` }}
    >
      <div className={styles.Card}>
        <div className={styles.Img}>
          <img src={poster} alt="" />
        </div>
        <div className={styles.Name}>{props.name}</div>
      </div>
    </Link>
  );
};

export default PeopleSearchCard;


