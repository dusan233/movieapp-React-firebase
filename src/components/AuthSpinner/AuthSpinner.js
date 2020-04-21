import React from "react";
import styles from "./AuthSpinner.module.css";

const AuthSpinner = props => {
  return (
    <div className={styles.ldsroller}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default AuthSpinner;
