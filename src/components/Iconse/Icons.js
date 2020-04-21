import React from "react";
import styles from "./Icons.module.css";

const Icons = props => {
  return (
    <button
      onClick={props.click}
      style={{ backgroundColor: props.color }}
      className={styles.Icon}
    >
      {props.children}
      <div>{props.text}</div>
    </button>
  );
};

export default Icons;
