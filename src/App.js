import React, { useEffect, useState } from "react";
import Card from "./components/Cards/Card";
import Chart from "./components/PieChart/PieChart";
import ExpenseModal from "./components/Modals/AddExpensesModal";
import "./App.css";
import RecentTransactions from "./components/RecentTransactions/RecentTransactions";
import TopTransactions from "./components/TopTransactions/TopTransactions";
import BalanceModal from "./components/Modals/BalanceModal";
import Pill from "./components/Pills/Pill";

function App() {
  const [balance, setBalance] = useState(() => {
    const savedBalance = localStorage.getItem("balance");
    return savedBalance ? parseInt(savedBalance, 10) : 0;
  });

  const [heading, setHeading] = useState("Add Expense");
  const [totalExpenses, setTotalExpenses] = useState(() => {
    const savedExpense = localStorage.getItem("totalExpense");
    return savedExpense ? parseInt(savedExpense, 10) : 0;
  });
  const [expensesArray, setExpensesArray] = useState(() => {
    const savedExpenses = localStorage.getItem("expensesArray");
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  const [isExpenseModalOpen, setExpenseModalOpen] = useState(false);
  const [isBalanceModalOpen, setBalanceModalOpen] = useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState(null); // Store expense to edit
  const [editingIndex, setEditingIndex] = useState(null); // Store the index of the expense being edited

  const handleAddExpense = (expenseData) => {
    if (expenseToEdit !== null) {
      // Update the existing expense if in edit mode
      const updatedExpensesArray = [...expensesArray];
      updatedExpensesArray[editingIndex] = expenseData; // Update the particular expense
      setExpensesArray(updatedExpensesArray);
      localStorage.setItem(
        "expensesArray",
        JSON.stringify(updatedExpensesArray)
      );

      setExpenseToEdit(null); // Clear after editing
    } else {
      const { price } = expenseData;

      // Update total expenses
      const newTotalExpenses = totalExpenses + parseFloat(price);
      setTotalExpenses(newTotalExpenses);
      localStorage.setItem("totalExpense", newTotalExpenses);

      // Update balance
      const newBalance = balance - parseFloat(price);
      setBalance(newBalance);
      localStorage.setItem("balance", newBalance);

      // Add the new expense to the array and localStorage
      const updatedExpensesArray = [...expensesArray, expenseData];
      setExpensesArray(updatedExpensesArray);
      localStorage.setItem(
        "expensesArray",
        JSON.stringify(updatedExpensesArray)
      );
    }
    setExpenseModalOpen(false); // Close the modal

    setExpenseToEdit(null); // Clear the edit state on close
  };

  const openEditModal = (expense, index) => {
    setHeading("Edit Expense");
    setExpenseToEdit(expense); // Pass the selected expense to be edited
    setEditingIndex(index); // Store the index of the expense being edited
    setExpenseModalOpen(true); // Open modal for editing
  };

  const handleAddIncome = (incomeAmount) => {
    const newBalance = balance + incomeAmount;
    setBalance(newBalance);
    localStorage.setItem("balance", newBalance); // Save new balance
    setBalanceModalOpen(false); // Close the modal
  };

  const handleDeleteExpense = (index) => {
    const updatedExpenses = [...expensesArray];
    updatedExpenses.splice(index, 1);
    setExpensesArray(updatedExpenses);
    localStorage.setItem("expensesArray", JSON.stringify(updatedExpenses));

    // Optionally, you may also want to update the total expenses and balance.
    const totalExpense = updatedExpenses.reduce(
      (acc, expense) => acc + parseFloat(expense.price),
      0
    );
    setTotalExpenses(totalExpense);
    localStorage.setItem("totalExpense", totalExpense);
  };

  useEffect(() => {
    console.log("Balance changed:", balance);
    console.log("Total expenses changed:", totalExpenses);
    console.log("Expenses array:", expensesArray);
  }, [balance, totalExpenses, expensesArray]);

  return (
    <div className="App">
      <p
        style={{
          fontSize: "32px",
          fontWeight: "700",
          color: "white",
          marginBottom: "10px",
          marginTop: "0",
        }}
      >
        Expense Tracker
      </p>
      <div className="header">
        <Card
          name="Wallet balance"
          amount={balance}
          buttonText="+ Add Income"
          onClick={() => setBalanceModalOpen(true)}
        />
        <Card
          name="Expenses"
          amount={totalExpenses}
          buttonText="+ Add Expense"
          onClick={() => {
            setExpenseModalOpen(true);
            setHeading("Add Expense");
          }}
        />
        <div className="chart">
          <Chart expenses={expensesArray} />
          <div className="pill-container">
            <Pill text="Food" color="#A000FF" />
            <Pill text="Entertainment" color="#FF9304" />
            <Pill text="Travel" color="#FDE006" />
          </div>
        </div>
      </div>
      <ExpenseModal
        isOpen={isExpenseModalOpen}
        onClose={() => {
          setExpenseModalOpen(false);
          setExpenseToEdit(null); // Clear the edit state on close
        }}
        onAddExpense={handleAddExpense}
        heading={heading}
        expenseToEdit={expenseToEdit} // Pass the expense to edit
      />
      <div className="footer">
        <RecentTransactions
          expenses={expensesArray.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          )}
          onDeleteExpense={handleDeleteExpense}
          handleEdit={openEditModal} // Pass the function to open edit modal
        />

        <TopTransactions expenses={expensesArray} />
        <BalanceModal
          isOpen={isBalanceModalOpen}
          onClose={() => setBalanceModalOpen(false)}
          onAddBalance={handleAddIncome}
          heading="Add Balance"
        />
      </div>
    </div>
  );
}

export default App;
