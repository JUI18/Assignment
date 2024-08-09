import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
// import './ExpenseForm.css';  // Import the CSS file

const EditExpense = () => {
    const { id } = useParams();
    const [expense, setExpense] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchExpense = async () => {
            try {
                const token = localStorage.getItem('token');
            const config = { headers: { 'x-auth-token': token } };
                const response = await axios.get(`http://localhost:5000/expenses/get/${id}`,config);
                setExpense(response.data);
            } catch (error) {
                console.error('Error fetching expense:', error);
            }
        };

        fetchExpense();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { 'x-auth-token': token } };
    
            // Correctly place `expense` as the second argument (data payload)
            await axios.put(`http://localhost:5000/expenses/edit/${id}`, expense, config);
    
            // Navigate to the expenses list page after successful update
            navigate('/expenses');
        } catch (error) {
            console.error('Error updating expense:', error);
        }
    };
    
    return (
        <div className="container">
            <h2>Edit Expense</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Title"
                        value={expense.title || ''}
                        onChange={(e) => setExpense({ ...expense, title: e.target.value })}
                        required
                    />
                </div>
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Category"
                        value={expense.category || ''}
                        onChange={(e) => setExpense({ ...expense, category: e.target.value })}
                        required
                    />
                </div>
                <div className="input-group">
                    <input
                        type="number"
                        placeholder="Amount"
                        value={expense.amount || ''}
                        onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
                        required
                    />
                </div>
                <div className="input-group">
                    <input
                        type="date"
                        placeholder="Date"
                        value={expense.date || ''}
                        onChange={(e) => setExpense({ ...expense, date: e.target.value })}
                        required
                    />
                </div>
                <div className="input-group">
                    <textarea
                        placeholder="Comments (optional)"
                        value={expense.comments || ''}
                        onChange={(e) => setExpense({ ...expense, comments: e.target.value })}
                    />
                </div>
                <div className="input-group">
                    <button type="submit">Update Expense</button>
                </div>
            </form>
        </div>
    );
};

export default EditExpense;
