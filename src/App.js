import React, { useEffect, useState } from "react";
import Card from "./components/Card";
import Chart from "./components/Chart";
import ExpenseModal from "./components/Modals/AddExpensesModal";
import "./App.css";
import RecentTransactions from "./components/RecentTransactions";
import TopTransactions from "./components/TopTransactions";
import BalanceModal from "./components/Modals/BalanceModal";

function App() {
  const [balance, setBalance] = useState(() => {
    const savedBalance = localStorage.getItem("balance");
    return savedBalance ? parseInt(savedBalance, 10) : 5000;
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

  const handleAddExpense = (expenseData) => {
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
    localStorage.setItem("expensesArray", JSON.stringify(updatedExpensesArray));
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
        </div>
      </div>
      <ExpenseModal
        isOpen={isExpenseModalOpen}
        onClose={() => setExpenseModalOpen(false)}
        onAddExpense={handleAddExpense}
        heading={heading}
      />
      <div className="footer">
        <RecentTransactions
          expenses={expensesArray.sort((a, b) => new Date(b.date) - new Date(a.date))}
          onDeleteExpense={handleDeleteExpense}
          handleEdit={() => {
            setHeading("Edit Expenses");
            setExpenseModalOpen(true);
          }}
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
