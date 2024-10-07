import React from "react";
import styles from "./Card.module.css";

export default function Card(props) {
  return (
    <div className={styles.card}>
      <div>
        <span>{props.name} :</span>
        {props.name === "Expenses" ? (
          <span style={{ fontWeight: "700", color: "#F4BB4A" }}>
            {" "}
            ₹{props.amount}
          </span>
        ) : (
          <span style={{ fontWeight: "700", color: "#9DFF5B" }}>
            {" "}
            ₹{props.amount}
          </span>
        )}
      </div>
      {props.name === "Expenses" ? (
        <button onClick={props.onClick} className={styles.expenses}>
          {props.buttonText}
        </button>
      ) : (
        <button onClick={props.onClick} className={styles.wallet}>
          {props.buttonText}
        </button>
      )}
    </div>
  );
}
