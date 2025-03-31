import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Spending.css";

const Spending = () => {
    const [spendingData, setSpendingData] = useState([]);
    const [visibleIndex, setVisibleIndex] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const fetchBudget = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/auth/budget-details", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const apiResponse = response.data;
                console.log("API Response:", apiResponse);
                const formattedData = Object.keys(apiResponse.monthlyBudget).map(category => ({
                    category: category.charAt(0).toUpperCase() + category.slice(1), // Capitalize first letter
                    amount: parseFloat(apiResponse.userSpending[category]),
                    max: parseFloat(apiResponse.monthlyBudget[category])
                }));

                setSpendingData(formattedData);
            } catch (error) {
                console.error("Error fetching budget data:", error);
            }
        };

        fetchBudget();
    }, []);

    const handleClick = (index) => {
        setVisibleIndex(visibleIndex === index ? null : index);
    };

    return (
        <div className="spending-container">
            {spendingData.map((item, index) => (
                <div key={index} className="spending-item">
                    <div className="spending-header">
                        <span className="category-name">{item.category}</span>
                        <span className="amount">{item.amount} / {item.max}</span>
                    </div>
                    <div
                        className="progress-bar-container"
                        onClick={() => handleClick(index)}
                        role="button"
                        tabIndex={0}
                        aria-label={`Toggle remaining amount for ${item.category}`}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                handleClick(index);
                            }
                        }}
                    >
                        <div
                            className={`progress-bar ${item.amount >= item.max ? "over-limit" : ""}`}
                            style={{ width: `${Math.min((item.amount / item.max) * 100, 100)}%` }}
                        ></div>
                    </div>
                    <div className={`remaining-amount ${visibleIndex === index ? "visible" : ""}`}>
                        Remaining: Rs. {Math.max(item.max - item.amount, 0)}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Spending;