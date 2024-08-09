// import React from 'react';

// const ExpenseList = ({ expenses, onEdit, onDelete }) => {
//     const sortedExpenses = expenses.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

//     return (
//         <table>
//             <thead>
//                 <tr>
//                     <th>Title</th>
//                     <th>Category</th>
//                     <th>Amount</th>
//                     <th>Date</th>
//                     <th>Created At</th>
//                     <th>Updated At</th>
//                     <th>Comments</th>
//                     <th>Actions</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {sortedExpenses.map((expense) => (
//                     <tr key={expense._id}>
//                         <td>{expense.title}</td>
//                         <td>{expense.category}</td>
//                         <td>{expense.amount}</td>
//                         <td>{new Date(expense.date).toLocaleDateString()}</td>
//                         <td>{new Date(expense.createdAt).toLocaleDateString()}</td>
//                         <td>{new Date(expense.updatedAt).toLocaleDateString()}</td>
//                         <td>{expense.comments}</td>
//                         <td>
//                             <button onClick={() => onEdit(expense)}>Edit</button>
//                             <button onClick={() => onDelete(expense._id)}>Delete</button>
//                         </td>
//                     </tr>
//                 ))}
//             </tbody>
//         </table>
//     );
// };

// export default ExpenseList;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ExpenseList.css';  // Import the CSS file

const ExpenseList = () => {
    const [expenses, setExpenses] = useState([]);

    // useEffect(() => {
    //     const fetchExpenses = async () => {
    //         try {
    //             const response = await axios.get('http://localhost:5000/expenses'); // Replace with your API endpoint
    //             const sortedExpenses = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    //             setExpenses(sortedExpenses);
    //         } catch (error) {
    //             console.error('Error fetching expenses:', error);
    //         }
    //     };

    //     fetchExpenses();
    // }, []);

    useEffect(() => {
        const fetchExpenses = async () => {
            const token = localStorage.getItem('token');
            const config = { headers: { 'x-auth-token': token } };

            try {
                const response = await axios.get('http://localhost:5000/expenses', config);
                const sortedExpenses = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setExpenses(sortedExpenses);
            } catch (error) {
                console.error('Error fetching expenses', error);
            }
        };

        fetchExpenses();
    }, []);
    const handleEdit = (id) => {
        // Redirect to edit page with the expense id
        window.location.href = `/edit-expense/${id}`;
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');
        const config = { headers: { 'x-auth-token': token } };
        try {
            await axios.delete(`http://localhost:5000/expenses/${id}`,config);
            setExpenses(expenses.filter(expense => expense._id !== id));
        } catch (error) {
            console.error('Error deleting expense:', error);
        }
    };

    return (
        <div className="container">
            <h2>View Expenses</h2>
            <table>
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                        <th>Comments</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map(expense => (
                        <tr key={expense._id}>
                            <td>{expense.category}</td>
                            <td>{expense.amount}</td>
                            <td>{new Date(expense.createdAt).toLocaleDateString()}</td>
                            <td>{new Date(expense.updatedAt).toLocaleDateString()}</td>
                            <td>{expense.comments || '-'}</td>
                            <td>
                                <button onClick={() => handleEdit(expense._id)}>Edit</button>
                                <button onClick={() => handleDelete(expense._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ExpenseList;
