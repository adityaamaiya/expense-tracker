import React from "react";
import styles from "./TopTransactions.module.css";
import CategoryBarChart from "./BarChart";

export default function TopTransactions({ expenses }) {
  return (
    <div>
      <p
        style={{
          color: "white",
          marginBottom: "10px",
          marginTop: "20px",
          fontStyle: "italic",
          fontSize: "32px",
          fontWeight: "700",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          width: "600px",
        }}
      >
        Top Expenses
      </p>
      <div className={styles.top}>
      <CategoryBarChart expenses={expenses} />

      </div>
    </div>
  );
}
