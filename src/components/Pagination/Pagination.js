import React from "react";
import styles from "./Pagination.module.css";

const Pagination = props => {
  return (
    <div className={styles.Pagination}>
      <button onClick={props.prevPage}>
        <i className="fas fa-chevron-left" />
      </button>
      <span>Page: {props.currentPage}</span>
      <span>of {props.totalPages}</span>
      <button onClick={props.nextPage}>
        <i className="fas fa-chevron-right" />
      </button>
    </div>
  );
};

export default Pagination;
