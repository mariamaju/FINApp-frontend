import React, { useEffect, useState } from "react";
import axios from "axios";

const ExpenseTracker = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/users/${userId}`);
        setUser(response.data);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to fetch data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchUserData();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!user) return <div>No user data found</div>;

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px", border: "1px solid #ddd" }}>
      <h2>Expense Tracker</h2>
      <p>Annual Income: ${user.annualIncome || 0}</p>
      <div>
        <h3>Expense Breakdown</h3>
        {user.expenses && user.expenses.length > 0 ? (
          user.expenses.map((expense, index) => {
            const remaining = expense.categoryLimit - expense.amountSpent;
            const progress = (expense.amountSpent / expense.categoryLimit) * 100;

            return (
              <div key={index} style={{ marginBottom: "20px" }}>
                <h4>{expense.category}</h4>
                <p>Amount Spent: ${expense.amountSpent}</p>
                <p>Category Limit: ${expense.categoryLimit}</p>
                <p>Remaining Budget: ${remaining}</p>

                {/* Progress Bar */}
                <div style={{ height: "10px", background: "#ddd" }}>
                  <div
                    style={{
                      width: `${Math.min(progress, 100)}%`,
                      background: progress > 100 ? "red" : "#4caf50",
                      height: "100%",
                      transition: "width 0.5s",
                    }}
                  ></div>
                </div>

                {/* Warning if budget exceeded */}
                {remaining <= 0 && <p style={{ color: "red" }}>Category limit exceeded!</p>}
              </div>
            );
          })
        ) : (
          <p>No expenses recorded.</p>
        )}
      </div>
    </div>
  );
};

export default ExpenseTracker;