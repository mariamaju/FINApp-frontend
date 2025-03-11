import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BudgetSetting.css";
import { FaShoppingCart, FaUtensils, FaFilm, FaHome } from "react-icons/fa"; // Import icons

const categories = [
    { name: "Groceries", max: 100000, icon: <FaHome /> }, // Use FaHome for Groceries
    { name: "Dining", max: 100000, icon: <FaUtensils /> }, // Use FaUtensils for Dining
    { name: "Shopping", max: 100000, icon: <FaShoppingCart /> }, // Use FaShoppingCart for Shopping
    { name: "Entertainment", max: 100000, icon: <FaFilm /> }, // Use FaFilm for Entertainment
];

const BudgetSetting = () => {
    const navigate = useNavigate();
    const [budgets, setBudgets] = useState(
        categories.map((category) => ({ name: category.name, amount: category.max / 2 }))
    );

    const handleChange = (index, value) => {
        const newValue = Math.min(Math.max(value, 0), categories[index].max);
        setBudgets((prev) =>
            prev.map((item, i) => (i === index ? { ...item, amount: newValue } : item))
        );
    };

    return (
        <div className="budget-setting-container">
            <div className="budget-setting-card">
                <h2 className="budget-setting-title">Let's set your monthly spending limit</h2>
                <p className="budget-setting-subtitle">
                    This is a personalized budget based on your transactions and financial goals.
                </p>

                {categories.map((category, index) => (
                    <div key={index} className="category-container">
                        <div className="category-header">
                            <div className="category-icon">{category.icon}</div> {/* Use icon here */}
                            <div>
                                <h3 className="category-name">{category.name}</h3>
                                <p className="category-max">Max: Rs. {category.max}</p> {/* Updated to Rs. */}
                            </div>
                        </div>

                        <div className="budget-input-container">
                            <input
                                type="number"
                                min="0"
                                max={category.max}
                                value={budgets[index].amount}
                                onChange={(e) => handleChange(index, Number(e.target.value))}
                                className="budget-input"
                            />
                            <input
                                type="range"
                                min="0"
                                max={category.max}
                                value={budgets[index].amount}
                                onChange={(e) => handleChange(index, Number(e.target.value))}
                                className="budget-slider"
                            />
                        </div>
                    </div>
                ))}

                <button
                    onClick={() => navigate("/dashboard")}
                    className="back-button"
                >
                    Back
                </button>
            </div>
        </div>
    );
};

export default BudgetSetting;