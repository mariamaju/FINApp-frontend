import React from "react";
import { useNavigate } from "react-router-dom";
import "./About.css"; // Ensure About.css has the new styles

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="about-container">
      <h1>About Fin AI</h1>
      <p>
        Fin AI is an AI-powered financial management platform that combines smart budgeting with seamless transactions.
        Whether you're tracking expenses, setting goals, or making payments, Fin AI helps you stay on top of your finances effortlessly.
      </p>

      <h2>Key Features</h2>
      <ul>
        <li>✅ Smart Expense Tracking</li>
        <li>📊 Spending Insights</li>
        <li>🔔 Real-Time Alerts</li>
        <li>💳 Seamless Transactions</li>
        <li>🎯 Goal-Based Budgeting</li>
        <li>📈 Visual Reports & Analytics</li>
        <li>🏆 Gamification & Rewards</li>
      </ul>

      <h2>How It Works</h2>
      <ol>
        <li>Sign Up & Secure Your Account</li>
        <li>Add Income & Set a Budget</li>
        <li>Track Spending & Get Spending Insights</li>
        <li>Make Payments with QR Code Scanning</li>
        <li>Analyze Reports & Stay on Budget</li>
        <li>Earn Rewards for Smart Spending</li>
      </ol>

      <h2>Why Choose Fin AI?</h2>
      <p>🚀 Better Financial Insights | 🔐 Secure Transactions  | 🎮 Fun & Rewarding</p>

      <h2>Contact & Support</h2>
      <p>📩 Have questions? Reach out to us at <a href="mailto:support@finai.com">support@finai.com</a></p>

      
      <button className="back-btn" onClick={() => navigate("/dashboard")}>
        ← Back to Dashboard
      </button>
    </div>
  );
};

export default About;