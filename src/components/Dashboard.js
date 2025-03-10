import React from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
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
  { name: "Transport", value: 400 },
  { name: "Entertainment", value: 200 },
  { name: "Food", value: 600 },
  { name: "Savings", value: 300 },
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="sidebar-header">Finai Dashboard</h2>
        <ul className="sidebar-list">
          <li className="sidebar-item active">
            📊 <span className="sidebar-item-text">Dashboard</span>
          </li>
          <li className="sidebar-item">
            <IoMdTrendingUp className="icon" /> Spending
          </li>
          <li className="sidebar-item">💡 Insights</li>
          <li className="sidebar-item">👤 Profile</li>
          <li className="sidebar-item">⚙ Settings</li>
          <li className="sidebar-item">❓ Help</li>
          <li className="sidebar-item signout" onClick={() => navigate("/")}>
            🔓 Signout
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Top Navigation */}
        <div className="top-nav">
          <h2 className="main-heading">Welcome, FinAI</h2>
          <div className="top-nav-actions">
            <input type="text" placeholder="Search" className="search-input" />
            <button
              className="add-expense-btn"
              onClick={() => navigate("/add-expense")} // Navigate to AddExpense
            >
              Add Expense
            </button>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="dashboard-cards">
          {/* Payment Options */}
          <div className="card payment-card">
            <h3 className="card-title">Payment</h3>
            <div className="payment-icons">
              <FaQrcode />
              <FaCreditCard />
              <FaMoneyBillWave />
              <FaMobileAlt />
            </div>
          </div>

          {/* Daily Limit */}
          <div className="card daily-limit-card">
            <h3 className="card-title">Daily Limit</h3>
          </div>

          {/* Rewards */}
          <div className="card rewards-card">
            <h3 className="card-title">Reward</h3>
            <FaTrophy className="reward-icon" />
          </div>
        </div>

        {/* Graph & Right Sidebar (Settings) */}
        <div className="graph-and-sidebar">
          {/* Bar Chart */}
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

          {/* Right Sidebar */}
          <div className="settings-sidebar">
            <div className="setting-item goal-setting">
              <FaBullseye className="setting-icon" />
              <span>Goal Setting</span>
            </div>
            <div
              className="setting-item reminder-setting"
              onClick={() => navigate("/reminder-preference")} // Navigate to ReminderPreference
            >
              <FaBell className="setting-icon" />
              <span>Reminder Setting</span>
            </div>
            <div
              className="setting-item budget-setting"
              onClick={() => navigate("/budget-setting")} // Navigate to BudgetSetting
            >
              <FaTrophy className="setting-icon" />
              <span>Budget Setting</span>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="recent-transactions">
          <h3 className="card-title">Recent Transactions</h3>
          <ul className="transaction-list">
            <li className="transaction-item">
              <span>Food</span> <span className="transaction-amount">-100</span>
            </li>
            <li className="transaction-item">
              <span>Transport</span>{" "}
              <span className="transaction-amount">-20</span>
            </li>
            <li className="transaction-item">
              <span>Entertainment</span>{" "}
              <span className="transaction-amount">-290</span>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;