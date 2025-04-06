import React, { useState, useEffect } from "react";
import "./ReminderPreference.css"; // Import the CSS file


// Example of initial categories - these would be replaced by database data
const initialCategories = [
  { name: "Grocery", color: "red", items: ["Groceries", "Fruits & Vegetables", "Meat & Dairy", "Pantry Items"] },
  { name: "Shopping", color: "orange", items: ["Clothes", "Electronics", "Beauty", "Home Goods", "Gifts"] },
  { name: "Dining", color: "green", items: ["Restaurants", "Coffee Shops", "Fast Food", "Delivery"] },
  { name: "Entertainment", color: "blue", items: ["Movies", "Concerts/Events", "Hobbies", "Parties", "Leisure Travel"] },
];

const ReminderPreference = () => {
  const [expenses, setExpenses] = useState({});
  const [dates, setDates] = useState({});
  const [categories, setCategories] = useState([]);
  
  // Simulate loading categories from database
  useEffect(() => {
    // In a real implementation, this would be a fetch call to your database
    const fetchCategories = () => {
      // Simulating database response delay
      setTimeout(() => {
        setCategories(initialCategories);
      }, 500);
    };
    
    fetchCategories();
  }, []);

  const handleAmountChange = (category, item, value) => {
    setExpenses((prev) => ({
      ...prev,
      [category]: { ...prev[category], [item]: value },
    }));
  };

  const handleDateChange = (category, item, value) => {
    setDates((prev) => ({
      ...prev,
      [category]: { ...prev[category], [item]: value },
    }));
  };

  return (
    <div className="spending-report">
      <h1 className="title">TRANSACTION OVERVIEW</h1>
      <div className="grid">
        
           

        {/* Dynamic categories from database */}
        {categories.map(({ name, color, items }) => (
          <div key={name} className={`category-card ${color}`}>
            <h3>{name}</h3>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item}>
                    <td>
                      <input
                        type="date"
                        value={dates[name]?.[item] || ""}
                        onChange={(e) => handleDateChange(name, item, e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        placeholder="Rs.0.00"
                        value={expenses[name]?.[item] || ""}
                        onChange={(e) => handleAmountChange(name, item, e.target.value)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>

    </div>
  );
};

export default ReminderPreference;