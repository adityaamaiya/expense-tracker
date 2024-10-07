import React, { useState,useEffect } from "react";
import Modal from "react-modal";
import styles from "./AddExpensesModal.module.css";

Modal.setAppElement("#root");

export default function ExpenseModal({
  isOpen,
  onClose,
  onAddExpense,
  heading,
  expenseToEdit, // This prop is passed when editing an expense
}) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("select");

  // If editing, pre-fill the form with existing expense data
  useEffect(() => {
    if (expenseToEdit) {
      setTitle(expenseToEdit.title);
      setPrice(expenseToEdit.price);
      setDate(expenseToEdit.date);
      setCategory(expenseToEdit.category);
    } else {
      // Reset the form if no expense is being edited
      setTitle("");
      setPrice("");
      setDate("");
      setCategory("select");
    }
  }, [expenseToEdit]);

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!title || !price || !date || category === 'select') {
      alert('All fields are required!');
      return;
    }
    const expenseData = { title, price, date, category };
    onAddExpense(expenseData); // Call parent function to add or edit expense
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Add Expense"
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <h2 className={styles.modalTitle}>{heading}</h2>
      <form onSubmit={handleAddExpense}>
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className={styles.inputField}
            required={true}
          />
        </div>

        <div>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            className={styles.inputField}
            required={true}
          />
        </div>

        <div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={styles.inputField}
            required={true}
            defaultValue="select"
          >
            <option value="select">Select Category</option>
            <option value="food">Food</option>
            <option value="entertainment">Entertainment</option>
            <option value="travel">Travel</option>
          </select>
        </div>

        <div>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="Date"
            className={styles.inputField}
            required={true}
          />
        </div>

        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.addButton}>
            Add Expense
          </button>
          <button
            type="button"
            onClick={onClose}
            className={styles.cancelButton}
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}
