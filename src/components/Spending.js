import React, { useState } from "react";
import "./Spending.css"; // Make sure this path matches your file structure

const spendingData = [
    { category: "Groceries", amount: 300, max: 1000 },
    { category: "Shopping", amount: 200, max: 1000 },
    { category: "Entertainment", amount: 1000, max: 1000 },
    { category: "Clothing", amount: 200, max: 1000 },
];

const Spending = () => {
    const [visibleIndex, setVisibleIndex] = useState(null);

    const handleClick = (index) => {
        setVisibleIndex(visibleIndex === index ? null : index);
    };

    return (
        <div className="spending-container">
            {spendingData.map((item, index) => (
                <div key={index} className="spending-item">
                    {/* Category Name & Amount */}
                    <div className="spending-header">
                        <span className="category-name">{item.category}</span>
                        <span className="amount">
                            {item.amount} / {item.max}
                        </span>
                    </div>

                    {/* Progress Bar (Clickable) */}
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
                            className={`progress-bar ${
                                item.amount >= item.max ? "over-limit" : ""
                            }`}
                            style={{
                                width: `${Math.min(
                                    (item.amount / item.max) * 100,
                                    100
                                )}%`,
                            }}
                        ></div>
                    </div>

                    {/* Remaining Amount (Animated on toggle) */}
                    <div
                        className={`remaining-amount ${
                            visibleIndex === index ? "visible" : ""
                        }`}
                    >
                        Remaining: Rs. {Math.max(item.max - item.amount, 0)}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Spending;