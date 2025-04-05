// PaymentForm.js
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentForm = () => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const navigate = useNavigate();
  const categories = ['Groceries', 'Dining', 'shopping', 'Entertainment'];

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

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
      const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
      if (!res) {
        alert('Razorpay SDK failed to load. Are you online?');
        return;
      }

      // Create order on your server
      const orderResponse = await axios.post(
        "http://localhost:3000/api/payments/create-order",
        { amount },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        }
      );

      const order = orderResponse.data.order;

      const options = {
        key: 'rzp_test_vHgDR6SwBuo9ig',
        amount: order.amount,
        currency: order.currency,
        name: "Your Company Name",
        description: "Payment for services",
        order_id: order.id,
        handler: async function (response) {
          console.log(response);

          try {
            const verificationResponse = await axios.post(
              "http://localhost:3000/api/payments/verify",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                amount,
                category
              },
              {
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`
                }
              }
            );

            if (verificationResponse.data.success) {
              alert("Payment Successful");
              navigate("/dashboard");
            } else {
              alert("Payment verification failed");
            }
          } catch (error) {
            console.error("Verification error:", error);
            alert("Payment verification failed");
          }
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999"
        },
        theme: {
          color: "#3399cc"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
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