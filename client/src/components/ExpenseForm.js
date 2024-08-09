import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useNavigationType } from 'react-router-dom';

const ExpenseForm = ({  existingExpense }) => {
    const [title, setTitle] = useState(existingExpense?.title || '');
    const [category, setCategory] = useState(existingExpense?.category || '');
    const [amount, setAmount] = useState(existingExpense?.amount || '');
    const [comments, setComments] = useState(existingExpense?.comments || '');
    const [date, setDate] = useState(existingExpense?.date || '');
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const expenseData = { title, category, amount, comments, date };
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { 'x-auth-token': token } };

                // Create new expense
            const res = await axios.post('http://localhost:5000/expenses', expenseData, config);
            navigate('/expenses')
        } catch (error) {
            console.error('Error saving the expense', error);
        }

        setTitle('');
        setCategory('');
        setAmount('');
        setComments('');
        setDate('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                
            />
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
            />
            <textarea
                placeholder="Comments"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
            />
            <button type="submit">Save Expense</button>
        </form>
    );
};

export default ExpenseForm;
