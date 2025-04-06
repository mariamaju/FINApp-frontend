import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ReminderPreference.css"; // Import the CSS file

const ReminderPreference = () => {
  const [expenses, setExpenses] = useState({});
  const [dates, setDates] = useState({});
  const [categories, setCategories] = useState([]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; 
  };

  useEffect(() => {
    const fetchPaymentsByCategory = async () => {
      const token = localStorage.getItem('token'); 
      try {
        const response = await axios.get('http://localhost:3000/api/payments/payments-by-category', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const { data } = response.data;

        const transformedCategories = data.map((category) => ({
          name: category.category,
          color: "default-color", 
          items: category.payments.map((payment) => ({
            id: payment._id,
            date: formatDate(payment.date), 
            amount: payment.amount
          }))
        }));

        setCategories(transformedCategories);
      } catch (error) {
        console.error("Error fetching payments by category:", error);
      }
    };

    fetchPaymentsByCategory();
  }, []);

  const handleAmountChange = (category, itemId, value) => {
    setExpenses((prev) => ({
      ...prev,
      [category]: { ...prev[category], [itemId]: value }
    }));
  };

  const handleDateChange = (category, itemId, value) => {
    setDates((prev) => ({
      ...prev,
      [category]: { ...prev[category], [itemId]: value }
    }));
  };

  return (
    <div className="spending-report">
      <h1 className="title">TRANSACTION OVERVIEW</h1>
      <div className="grid">
        {/* Dynamic categories from API */}
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
                  <tr key={item.id}>
                    <td>
                      <input
                        type="date"
                        value={dates[name]?.[item.id] || item.date || ""}
                        onChange={(e) => handleDateChange(name, item.id, e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        placeholder="Rs.0.00"
                        value={expenses[name]?.[item.id] || item.amount || ""}
                        onChange={(e) => handleAmountChange(name, item.id, e.target.value)}
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