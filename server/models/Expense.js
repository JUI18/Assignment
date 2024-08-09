// backend/models/Expense.js
import mongoose from 'mongoose';

const ExpenseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },  // Category of the expense
    amount: { type: Number, required: true },    // Amount spent
    comments: { type: String },                  // Optional comments
    date: { type: Date, default: Date.now },     // Date of the expense
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // Reference to the user
    createdAt: { type: Date, default: Date.now },  // Creation timestamp
    updatedAt: { type: Date, default: Date.now }   // Update timestamp
});

ExpenseSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

export default mongoose.model('Expense', ExpenseSchema);
