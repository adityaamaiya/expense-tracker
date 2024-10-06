import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
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
            if (expense.category === 'food') {
                totals.food += parseFloat(expense.price);
            } else if (expense.category === 'entertainment') {
                totals.entertainment += parseFloat(expense.price);
            } else if (expense.category === 'travel') {
                totals.travel += parseFloat(expense.price);
            }
        });

        // Create an array of objects, retain all categories, and sort by value (descending)
        return [
            { name: 'Food', value: totals.food },
            { name: 'Entertainment', value: totals.entertainment },
            { name: 'Travel', value: totals.travel },
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
                  
                    <XAxis type="number" hide/>
                    <YAxis dataKey="name" type="category" className={styles.yAxis} />
                  
                    <Bar dataKey="value" fill="#8884d8" barSize={20} className={styles.bar} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CategoryBarChart;
