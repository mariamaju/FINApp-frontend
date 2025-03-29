// PaymentForm.js
import React, { useState } from 'react';
//import { useHistory } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


const PaymentForm = () => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  //const history = useHistory();
  const navigate = useNavigate();
  const categories = ['Groceries', 'Dining', 'shopping', 'Entertainment'];

  const handleSubmit = () => {
    if (amount && category) {
      alert('Payment Successful');
      // Redirect to the home page after the successful payment
      //history.push('/');
      navigate("/dashboard");
    } else {
      alert('Please fill out all fields');
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