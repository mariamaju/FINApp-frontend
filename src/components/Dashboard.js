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
import Chatbot from "./chatbot";

const Dashboard = () => {
  const navigate = useNavigate();
  const [dailyLimit, setDailyLimit] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [spendingData, setSpendingData] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [showReward, setShowReward] = useState(false);
  const [rewardMessage, setRewardMessage] = useState("");
  const [rewardType, setRewardType] = useState(""); // 'happy' or 'sad'

  const handleRewardClick = () => {
    if (totalExpense < dailyLimit) {
      setRewardType("happy");
      setRewardMessage("Great job! You're under your daily limit! 🎉");
    } else {
      setRewardType("sad");
      setRewardMessage("You exceeded your daily limit. Try saving more tomorrow. 💡");
    }
    setShowReward(true);
    
    // Auto-hide after 5 seconds
    setTimeout(() => setShowReward(false), 5000);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    let dailyLimitVal = 0;
    console.log("token", token);

    const fetchDashboardData = async () => {
      try {
        // Fetch daily limit
        const limitResponse = await axios.get(
          "http://localhost:3000/api/auth/daily-spend-limit",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDailyLimit(limitResponse.data.dailySpendLimit);
        dailyLimitVal = limitResponse.data.dailySpendLimit;

        // Fetch budget and spending data (same as Spending.js)
        const budgetResponse = await axios.get(
          "http://localhost:3000/api/auth/budget-details",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const apiResponse = budgetResponse.data;
        console.log("API Response:", apiResponse);

        // Format data for bar chart
        const formattedData = Object.keys(apiResponse.monthlyBudget).map(
          (category) => ({
            name: category.charAt(0).toUpperCase() + category.slice(1),
            value: parseFloat(apiResponse.userSpending[category]),
            max: parseFloat(apiResponse.monthlyBudget[category]),
          })
        );
        setSpendingData(formattedData);

        // Calculate total expenses
        const total = formattedData.reduce(
          (sum, item) => sum + item.value,
          0
        );
       // setTotalExpense(total);

        // Create recent transactions from spending data
        const transactions = formattedData
          .map((item) => ({
            category: item.name,
            amount: item.value,
            date: new Date().toISOString().split("T")[0], // Today's date
          }))
          .sort((a, b) => b.amount - a.amount) // Sort by highest amount
          .slice(0, 3); // Get top 3
        setRecentTransactions(transactions);
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      }
    };
    
     const fetchTotalExpenses = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/payments/total-expenses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Total Expenses Response:", response.data.totalExpenses, dailyLimitVal);
        setTotalExpense(response.data.totalExpenses);
        
        if(response.data.totalExpenses > dailyLimitVal) {
          alert("You have exceeded your daily spend limit!");
        }
      } catch (err) {
        console.error("Failed to fetch total expenses", err);
      }
    };

    if (token) {
      fetchDashboardData();
      fetchTotalExpenses();
    }
  }, []);
  return (
    <div className="dashboard-container">
      {/* Sidebar remains unchanged */}
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
            ℹ About
          </li>
          <li className="sidebar-item signout" onClick={() => navigate("/")}>
            🔓 Signout
          </li>
        </ul>
      </aside>

      <main className="main-content">
        {/* Top nav remains unchanged */}
        <div className="top-nav">
          <h2 className="main-heading">Welcome, FinAI</h2>
          <div className="top-nav-actions">
            <div className="total-expenses">
              Total Expenses: ₹{totalExpense}
            </div>
            <button
              className="add-expense-btn"
              onClick={() => navigate("/add-expense")}
            >
              Add Expense
            </button>
          </div>
        </div>

        {/* Dashboard cards remain unchanged */}
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

          <div className="card rewards-card" onClick={handleRewardClick}>
  <h3 className="card-title">Reward</h3>
  <FaTrophy className="reward-icon" />
  
  {showReward && (
    <div className={`reward-message ${rewardType}`}>
      <div className="reward-emojis">
        {rewardType === "happy" ? (
          <>
            🏆🎉😊<br />
            
          </>
        ) : (
          <>
            <br />
            ⚠️😞
          </>
        )}
      </div>
      <p>{rewardMessage}</p>
      {rewardType === "sad" && (
        <div className="advice">
          <p>Tips to save:</p>
          <ul>
            <li>Review small purchases</li>
            <li>Cook at home more</li>
            <li>Use public transport</li>
          </ul>
        </div>
      )}
    </div>
  )}
</div>
</div>

        <div className="graph-and-sidebar">
          {/* Dynamic Bar Chart */}
          <div className="bar-chart">
            <h3 className="card-title">Spending Chart</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={spendingData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="value"
                  fill="#3182CE"
                  radius={[10, 10, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Settings sidebar remains unchanged */}
          <div className="settings-sidebar">
            <div
              className="setting-item goal-setting"
              onClick={() => navigate("/goal-setting")}
            >
              <FaBullseye className="setting-icon" />
              <span>Goal Setting</span>
            </div>
            <div
              className="setting-item reminder-setting"
              onClick={() => navigate("/reminder-preference")}
            >
              <FaBell className="setting-icon" />
              <span>Reminder Setting</span>
            </div>
            <div
              className="setting-item budget-setting"
              onClick={() => navigate("/budget-setting")}
            >
              <FaTrophy className="setting-icon" />
              <span>Budget Setting</span>
            </div>
          </div>
        </div>

        {/* Dynamic Recent Transactions */}
        <div className="recent-transactions">
          <h3 className="card-title">Recent Transactions</h3>
          <ul className="transaction-list">
            {recentTransactions.map((transaction, index) => (
              <li key={index} className="transaction-item">
                <span>{transaction.category}</span>{" "}
                <span className="transaction-amount">
                  -{transaction.amount.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Chatbot />
    </div>
  );
};

export default Dashboard;