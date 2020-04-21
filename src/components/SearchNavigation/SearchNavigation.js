import React from "react";
import styles from "./SearchNavigation.module.css";
import { Link } from "react-router-dom";

class SearchNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { props } = this;

    return (
      <div className={styles.Navigation}>
        <Link
          style={{
            borderBottom: "0px solid red",
            textDecoration: "none",
            color: this.props.type === "movies" ? "#01d277" : "black"
          }}
          to={{ pathname: `/search/movie/${props.query}` }}
        >
          <h2>Movies: {props.mResults}</h2>
        </Link>
        <Link
          style={{
            borderBottom: "0px solid red",
            textDecoration: "none",
            color: this.props.type === "series" ? "#01d277" : "black"
          }}
          to={{ pathname: `/search/serie/${props.query}` }}
        >
          <h2>Tv Shows: {props.sResults}</h2>
        </Link>
        <Link
          style={{
            borderBottom: "0px solid red",
            textDecoration: "none",
            color: this.props.type === "collections" ? "#01d277" : "black"
          }}
          to={{ pathname: `/search/collection/${props.query}` }}
        >
          <h2>Collections: {props.mCollection}</h2>
        </Link>
        <Link
          style={{
            borderBottom: "0px solid red",
            textDecoration: "none",
            color: this.props.type === "people" ? "#01d277" : "black"
          }}
          to={{ pathname: `/search/people/${props.query}` }}
        >
          <h2>People: {props.people}</h2>
        </Link>
      </div>
    );
  }
}

export default SearchNavigation;
