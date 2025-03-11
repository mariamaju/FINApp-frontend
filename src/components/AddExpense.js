import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddExpense.css"; // Import the CSS file

const AddExpense = () => {
    const navigate = useNavigate();
    const [category, setCategory] = useState("Groceries"); // Default category
    const [amount, setAmount] = useState(""); // Amount input

    const handleSaveExpense = () => {
        // Validate amount
        if (!amount || isNaN(amount)) {
            alert("Please enter a valid amount.");
            return;
        }

        // Save the expense (you can use state management or API calls here)
        console.log("Category:", category);
        console.log("Amount: Rs.", amount);

        // Navigate to the Dashboard or another page
        navigate("/dashboard");
    };

    return (
        <div className="add-expense-container">
            <div className="add-expense-card">
                <h2 className="add-expense-title">Add Expense</h2>
                <p className="add-expense-subtitle">Track your expenses by category and amount.</p>

                {/* Category Dropdown */}
                <div className="form-group">
                    <label htmlFor="category" className="form-label">
                        Category
                    </label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="form-select"
                    >
                        <option value="Groceries">Groceries</option>
                        <option value="Dining">Dining</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Shopping">Shopping</option>
                    </select>
                </div>

                {/* Amount Input */}
                <div className="form-group">
                    <label htmlFor="amount" className="form-label">
                        Amount
                    </label>
                    <div className="amount-input-container">
                        <span className="amount-prefix">Rs.</span>
                        <input
                            type="text"
                            id="amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter amount"
                            className="amount-input"
                        />
                    </div>
                </div>

                {/* Save Expense Button */}
                <button onClick={handleSaveExpense} className="save-expense-button">
                    Save Expense
                </button>
            </div>
        </div>
    );
};

export default AddExpense;