// PaymentForm.js
import React, { useState } from 'react';
//import { useHistory } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from "axios";


const PaymentForm = () => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  //const history = useHistory();
  const navigate = useNavigate();
  const categories = ['Groceries', 'Dining', 'shopping', 'Entertainment'];

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("User not authenticated!");
        return;
    }

    if (!amount || !category) {
        alert("Please fill out all fields");
        return;
    }

    try {
        const response = await axios.post(
            "http://localhost:3000/api/payments",
            { amount, category },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        console.log("Payment successful:", response.data);
        alert("Payment Successful");
        navigate("/dashboard"); // Redirect after success
    } catch (error) {
        console.error("Error submitting payment:", error.response?.data || error.message);
        alert("Payment failed, please try again.");
    }
};

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ddd' }}>
      <h2>Payment Form</h2>
      <div>
        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter Amount"
        />
      </div>
      <div>
        <label>Category:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default PaymentForm;