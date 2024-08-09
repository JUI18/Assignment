// backend/controllers/expenseController.js
import Expense from '../models/Expense.js';

// Create an Expense
export const createExpense = async (req, res) => {
    const { title, category, amount, comments, date } = req.body;
    console.log("abc")
    try {
        const newExpense = new Expense({ 
            title, 
            category, 
            amount, 
            comments, 
            date, 
            user: req.user.id 
        });
        await newExpense.save();
        res.status(201).json(newExpense);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all Expenses
export const getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
export const getExpenseById = async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);
        if (!expense) return res.status(404).json({ message: 'Expense not found' });
        res.status(200).json(expense);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Update an Expense
export const updateExpense = async (req, res) => {
    const { id } = req.params;
    const { title, category, amount, comments, date } = req.body;

    try {
        const updatedExpense = await Expense.findByIdAndUpdate(
            id, 
            { title, category, amount, comments, date, updatedAt: Date.now() }, 
            { new: true }
        );
        res.json(updatedExpense);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete an Expense
export const deleteExpense = async (req, res) => {
    const { id } = req.params;

    try {
        await Expense.findByIdAndDelete(id);
        res.json({ message: 'Expense deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
