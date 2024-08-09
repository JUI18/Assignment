import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import ExpenseDashboard from './components/ExpenseDashboard';

import ExpenseList from './components/ExpenseList';  // Import the ExpenseList component
import EditExpense from './components/EditExpense';  // Import the EditExpense component
// import './styles.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<ExpenseDashboard />} />
                <Route path="/expenses" element={<ExpenseList />} /> {/* Add route for ExpenseList */}
                <Route path="/edit-expense/:id" element={<EditExpense />} /> {/* Route for editing expenses */}
            </Routes>
        </Router>
    );
}

export default App;
