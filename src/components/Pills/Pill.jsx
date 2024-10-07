import React from "react";
import styles from "./Pill.module.css";

export default function Pill({ text, color }) {
  return (
    <div className={styles.pill}>
      <div
        className={styles.pillColor}
        style={{ backgroundColor: color }}
      ></div>
      <div className={styles.pillText}>{text}</div>
    </div>
  );
}
