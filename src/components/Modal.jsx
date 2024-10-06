import React, { useState } from 'react';
import Modal from 'react-modal';
import styles from './Modal.module.css';

Modal.setAppElement('#root');

export default function ExpenseModal({ isOpen, onClose, onAddExpense }) {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('select');

  const handleAddExpense = (e) => {
    e.preventDefault(); // Prevent form submission
    
    // Validate fields
    if (!title || !price || !date || category === 'select') {
      alert('All fields are required!');
      return;
    }

    const expenseData = { title, price, date, category };
    console.log('Expense Data:', expenseData);
    
    // Step 1: Retrieve existing expenses from localStorage
    const storedExpenses = localStorage.getItem('expensesArray');
    let expensesArray = storedExpenses ? JSON.parse(storedExpenses) : [];  // Parse existing expenses or use an empty array
    
    // Step 2: Append the new expense to the array
    expensesArray.push(expenseData);
    
    // Step 3: Save the updated expenses array back to localStorage
    localStorage.setItem('expensesArray', JSON.stringify(expensesArray));
    
    // Step 4: Reset form fields to default values
    setTitle('');
    setPrice('');
    setDate('');
    setCategory('select');
    
    // Step 5: Continue with any additional actions
    onAddExpense(expenseData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Add Expense"
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <h2 className={styles.modalTitle}>Add Expenses</h2>
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
