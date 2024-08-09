import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import './ExpenseDashboard.css';

const ExpenseDashboard = () => {


    return (
        <div className='container'>
            <h2>Expense Tracker</h2>
            <ExpenseForm  />
        </div>
    );
};

export default ExpenseDashboard;
