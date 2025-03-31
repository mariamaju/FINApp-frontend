import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for API requests
import "./BudgetSetting.css";
import { FaShoppingCart, FaUtensils, FaFilm, FaHome } from "react-icons/fa";

const categories = [
    { name: "Groceries", key: "groceries", max: 100000, icon: <FaHome /> },
    { name: "Dining", key: "dining", max: 100000, icon: <FaUtensils /> },
    { name: "Shopping", key: "shopping", max: 100000, icon: <FaShoppingCart /> },
    { name: "Entertainment", key: "entertainment", max: 100000, icon: <FaFilm /> },
];

const BudgetSetting = () => {
    const navigate = useNavigate();
    const [budgets, setBudgets] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        const fetchBudget = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/auth/budget-suggestion",  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                });
                setBudgets(response.data.monthlyBudget);
            } catch (err) {
                setError("Failed to fetch budget suggestions. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchBudget();
    }, []);

    const handleChange = (key, value) => {
        setBudgets((prev) => ({
            ...prev,
            [key]: Math.min(Math.max(value, 0), 100000), // Ensure value stays within limits
        }));
    };

    if (loading) return <p>Loading budget suggestions...</p>;
    if (error) return <p className="error-message">{error}</p>;

    return (
        <div className="budget-setting-container">
            <div className="budget-setting-card">
                <h2 className="budget-setting-title">Let's set your monthly spending limit</h2>
                <p className="budget-setting-subtitle">
                    This is a personalized budget based on your transactions and financial goals.
                </p>

                {categories.map((category) => (
                    <div key={category.key} className="category-container">
                        <div className="category-header">
                            <div className="category-icon">{category.icon}</div>
                            <div>
                                <h3 className="category-name">{category.name}</h3>
                                <p className="category-max">Max: Rs. {category.max}</p>
                            </div>
                        </div>

                        <div className="budget-input-container">
                            <input
                                type="number"
                                min="0"
                                max={category.max}
                                readOnly
                                value={budgets[category.key] || 0}
                                onChange={(e) => handleChange(category.key, Number(e.target.value))}
                                className="budget-input"
                            />
                            <input
                                type="range"
                                min="0"
                                max={category.max}
                                value={budgets[category.key] || 0}
                                disabled
                                onChange={(e) => handleChange(category.key, Number(e.target.value))}
                                className="budget-slider"
                            />
                        </div>
                    </div>
                ))}

                <button onClick={() => navigate("/dashboard")} className="back-button">
                    Back
                </button>
            </div>
        </div>
    );
};

export default BudgetSetting;