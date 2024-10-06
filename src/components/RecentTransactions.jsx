import React, { useState } from "react";
import styles from "./RecentTransactions.module.css";
import { TiDeleteOutline } from "react-icons/ti";
import { BsSuitcase2, BsGift } from "react-icons/bs";
import { MdOutlineModeEdit } from "react-icons/md";
import { IoPizzaOutline } from "react-icons/io5";

export default function RecentTransactions({ expenses, onDeleteExpense }) {
  const [currentPage, setCurrentPage] = useState(1);

  const expensesPerPage = 3;

  // Pagination logic
  const indexOfLastExpense = currentPage * expensesPerPage;
  const indexOfFirstExpense = indexOfLastExpense - expensesPerPage;
  const currentExpenses = expenses.slice(indexOfFirstExpense, indexOfLastExpense);

  const totalPages = Math.ceil(expenses.length / expensesPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleDelete = (index) => {
    const actualIndex = indexOfFirstExpense + index;
    onDeleteExpense(actualIndex); // Call the delete function from the parent
  };

  // Function to format date from YYYY-MM-DD to "Month DD, YYYY"
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

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
          width: "850px",
        }}
      >
        Recent Transactions
      </p>
      <div className={styles.recent}>
        <div className={styles.expenseListContainer}>
          {currentExpenses.map((expense, index) => (
            <div key={index} className={styles.expenseItem}>
              <div className={styles.expenseDetails}>
                <p className={styles.expenseTitle}>
                  {expense.category === "food" ? (
                    <IoPizzaOutline className={styles.expenseIcon} />
                  ) : expense.category === "entertainment" ? (
                    <BsGift className={styles.expenseIcon} />
                  ) : expense.category === "travel" ? (
                    <BsSuitcase2 className={styles.expenseIcon} />
                  ) : null}

                  {expense.title}
                </p>
                {/* Format the date */}
                <p className={styles.expenseDate}>{formatDate(expense.date)}</p>
              </div>
              <div className={styles.expenseAmount}>{`₹${expense.price}`}</div>
              <div className={styles.expenseActions}>
                <TiDeleteOutline
                  className={styles.deleteIcon}
                  onClick={() => handleDelete(index)}
                />
                <MdOutlineModeEdit className={styles.editIcon} />
              </div>
            </div>
          ))}
          <div className={styles.pagination}>
            <button onClick={prevPage} disabled={currentPage === 1}>
              ←
            </button>
            <p>{currentPage}</p>
            <button onClick={nextPage} disabled={currentPage === totalPages}>
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
