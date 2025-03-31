import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  FaQrcode,
  FaCreditCard,
  FaMoneyBillWave,
  FaMobileAlt,
  FaTrophy,
  FaBell,
  FaBullseye,
} from "react-icons/fa";
import { IoMdTrendingUp } from "react-icons/io";

const data = [
  { name: "Grocery", value: 400 },
  { name: "Dining", value: 200 },
  { name: "Shopping", value: 600 },
  { name: "Entertainment", value: 300 },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [dailyLimit, setDailyLimit] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("token", token);

    const fetchDailySpendLimit = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/auth/daily-spend-limit", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDailyLimit(response.data.dailySpendLimit);
      } catch (err) {
        console.error("Failed to fetch daily spend limit", err);
      }
    };

    const fetchTotalExpenses = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/expenses/total", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTotalExpense(response.data.totalExpense);
      } catch (err) {
        console.error("Failed to fetch total expenses", err);
      }
    };

    if (token) {
      fetchDailySpendLimit();
      fetchTotalExpenses();
    }
  }, []);

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2 className="sidebar-header">FinAI Dashboard</h2>
        <ul className="sidebar-list">
          <li className="sidebar-item active">
            📊 <span className="sidebar-item-text">Dashboard</span>
          </li>
          <li className="sidebar-item" onClick={() => navigate("/spending")}>
            <IoMdTrendingUp className="icon" /> Spending
          </li>
          <li className="sidebar-item" onClick={() => navigate("/about")}>
            ℹ️ About
          </li>
          <li className="sidebar-item signout" onClick={() => navigate("/")}>
            🔓 Signout
          </li>
        </ul>
      </aside>

      <main className="main-content">
        <div className="top-nav">
          <h2 className="main-heading">Welcome, FinAI</h2>
          <div className="top-nav-actions">
            <div className="total-expenses">
              Total Expenses: ₹{totalExpense}
            </div>
            <button className="add-expense-btn" onClick={() => navigate("/add-expense")}>
              Add Expense
            </button>
          </div>
        </div>

        <div className="dashboard-cards">
          <div className="card payment-card">
            <h3 className="card-title">Payment</h3>
            <div className="payment-icons">
              <Link to="/payment-details">
                <FaQrcode />
              </Link>
              <Link to="/payment-details">
                <FaCreditCard />
              </Link>
              <Link to="/payment-details">
                <FaMoneyBillWave />
              </Link>
              <Link to="/payment-details">
                <FaMobileAlt />
              </Link>
            </div>
          </div>

          <div className="card daily-limit-card">
            <h3 className="card-title">Daily Spend Limit: {dailyLimit}</h3>
          </div>

          <div className="card rewards-card">
            <h3 className="card-title">Reward</h3>
            <FaTrophy className="reward-icon" />
          </div>
        </div>

        <div className="graph-and-sidebar">
          <div className="bar-chart">
            <h3 className="card-title">Spending Chart</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3182CE" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="settings-sidebar">
            <div className="setting-item goal-setting" onClick={() => navigate("/goal-setting")}>
              <FaBullseye className="setting-icon" />
              <span>Goal Setting</span>
            </div>
            <div className="setting-item reminder-setting" onClick={() => navigate("/reminder-preference")}>
              <FaBell className="setting-icon" />
              <span>Reminder Setting</span>
            </div>
            <div className="setting-item budget-setting" onClick={() => navigate("/budget-setting")}>
              <FaTrophy className="setting-icon" />
              <span>Budget Setting</span>
            </div>
          </div>
        </div>

        <div className="recent-transactions">
          <h3 className="card-title">Recent Transactions</h3>
          <ul className="transaction-list">
            <li className="transaction-item">
              <span>Grocery</span> <span className="transaction-amount">-100</span>
            </li>
            <li className="transaction-item">
              <span>Dining</span> <span className="transaction-amount">-20</span>
            </li>
            <li className="transaction-item">
              <span>Shopping</span> <span className="transaction-amount">-290</span>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;