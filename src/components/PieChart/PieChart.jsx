import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import styles from "./PieChart.module.css";

// Define color mapping for each category
const categoryColors = {
  Food: "#A000FF",
  Entertainment: "#FF9304",
  Travel: "#FDE006",
};

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return percent > 0 ? ( // Only render the label if percent is greater than 0
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  ) : null;
};

const CategoryPieChart = ({ expenses }) => {
  // Calculate total expenses per category
  const calculateCategoryTotals = (expenses) => {
    const totals = {
      Food: 0,
      Entertainment: 0,
      Travel: 0,
    };

    expenses.forEach((expense) => {
      if (expense.category === "food") {
        totals.Food += parseFloat(expense.price);
      } else if (expense.category === "entertainment") {
        totals.Entertainment += parseFloat(expense.price);
      } else if (expense.category === "travel") {
        totals.Travel += parseFloat(expense.price);
      }
    });

    // Filter out categories with a value of 0
    return Object.entries(totals)
      .map(([name, value]) => ({ name, value }))
      .filter((item) => item.value > 0);
  };

  const data = calculateCategoryTotals(expenses);

  return (
    <ResponsiveContainer width="100%" height={200} className={styles.chart}>
      <PieChart width="100%" height={200}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={categoryColors[entry.name]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CategoryPieChart;
