import React from "react";

import backgroundImg from "../../assets/img/green-79a9507a08a7e5a9b8c643a69026fe46191c45972cb45b944ab4b5f8a9110b03.svg";

import styles from "./ProfileOverview.module.css";

const ProfileOverview = props => {
  return (
    <div className={styles.Overview}>
      <div
        style={{ backgroundImage: `url(${backgroundImg})` }}
        className={styles.Wrap}
      >
        <div className={styles.Container}>
          <div className={styles.UserBadge}>D</div>
          <div className={styles.Info}>
            <h1>{props.name}</h1>
            <h3>Favorites: {props.favoritesNumber}</h3>
            <h3>Watchlist: {props.watchlistNumber}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;
