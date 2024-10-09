# Expense Tracker

## Description

The Expense Tracker is a web application built using **React.JS** that helps users manage their expenses efficiently. Users can add, edit, and delete expenses, while keeping track of their available wallet balance. The app provides expense summaries and trends through interactive charts.

## Features

- **Wallet Balance**

  - Default wallet balance is set to 5000.
  - Users can increase the wallet balance using the "Add Income" form.
  - The wallet balance updates automatically after expenses are added.
  - Users cannot spend more than their available balance. Alerts are triggered if spending exceeds the balance.

- **Add Expense**

  - Add expenses with details such as title, amount, category, and date.
  - Wallet balance reduces accordingly after an expense is added.

- **Edit/Delete Expense**

  - Modify or remove existing expenses from the list.

- **Expense Summary**

  - View a pie chart summarizing total expenses categorized by type.

- **Expense Trends**

  - View a bar chart showing trending expenses based on categories over time.

- **LocalStorage**

  - The wallet balance and the list of expenses are saved in **localStorage** to ensure data persists between page refreshes.

- **Responsive Design**
  - The application is designed to work seamlessly across mobile, tablet, and desktop devices.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/adityaamaiya/expense-tracker.git
   ```

2. Navigate to the project directory:

   ```bash
   cd expense-tracker
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm start
   ```

   The application will be running at `http://localhost:3000`.

## Technologies Used

- **React.js**: Frontend framework for building user interfaces.
- **HTML5 & CSS3**: For structuring and styling the app.
- **JavaScript**: Application logic and state management.
- **Recharts**: For visualizing data through charts (expense summary and trends).
- **React-Modal**: For managing modals (Add/Edit Expense forms).
- **Notistack**: For displaying alerts (e.g., wallet balance validation).
- **React-Icons**: For incorporating icons representing expense categories.
- **LocalStorage**: For persisting wallet balance and expenses across sessions.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
