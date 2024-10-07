import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import styles from "./BarChart.module.css";

const CategoryBarChart = ({ expenses }) => {
  // Calculate total expenses per category and sort by value
  const calculateCategoryTotals = (expenses) => {
    const totals = {
      food: 0,
      entertainment: 0,
      travel: 0,
    };

    expenses.forEach((expense) => {
      if (expense.category === "food") {
        totals.food += parseFloat(expense.price);
      } else if (expense.category === "entertainment") {
        totals.entertainment += parseFloat(expense.price);
      } else if (expense.category === "travel") {
        totals.travel += parseFloat(expense.price);
      }
    });

    // Create an array of objects, retain all categories, and sort by value (descending)
    return [
      { name: "Food", value: totals.food },
      { name: "Entertainment", value: totals.entertainment },
      { name: "Travel", value: totals.travel },
    ].sort((a, b) => b.value - a.value);
  };

  const data = calculateCategoryTotals(expenses);

  return (
    <div className={styles.chartContainer}>
      <ResponsiveContainer width="90%" height={300}>
        <BarChart
          layout="vertical"
          data={data}
          className={styles.barChart}
          margin={{ top: 20, right: 30, left: 50, bottom: 5 }}
        >
          {/* Hide axis lines and ticks */}
          <XAxis type="number" hide />
          <YAxis
            dataKey="name"
            type="category"
            className={styles.yAxis}
            axisLine={false} // Hide the axis line
            tickLine={false} // Hide the tick line
          />

          {/* Use the radius prop to create rounded corners */}
          <Bar
            dataKey="value"
            fill="#8884d8"
            barSize={20}
            radius={[0, 20, 20, 0]} // Rounded corners
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryBarChart;
