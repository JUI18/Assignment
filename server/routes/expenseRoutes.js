import express from 'express';
import { createExpense, getExpenses, updateExpense, deleteExpense, getExpenseById } from '../controllers/expenseController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Create an expense
router.post('/', verifyToken, createExpense);

// Get all expenses for the authenticated user
router.get('/', verifyToken, getExpenses);

// Get a single expense by ID
router.get('/get/:id', verifyToken, getExpenseById); // New route for getting expense by ID

// Update an expense by ID
router.put('/edit/:id', verifyToken, updateExpense);

// Delete an expense by ID
router.delete('/:id', verifyToken, deleteExpense);

export default router;
