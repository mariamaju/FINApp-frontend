import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Signup from "./components/Signup";
import Income from "./components/Income";
import ReminderPreference from "./components/ReminderPreference";
import AddExpense from "./components/AddExpense";
import BudgetSetting from "./components/BudgetSetting";
import PaymentDetails from "./components/PaymentDetails";
import Spending from "./components/Spending";
import GoalSetting from "./components/GoalForm";
import About from "./components/About";
import AdminDashboard from "./components/AdminDashboard";
import Profile from "./components/Profile";
import ForgotPassword from './components/ForgotPassword';

function App() {
    const isAdminAuthenticated = () => {
        return localStorage.getItem("adminToken") !== null;
    };

    return (
        <Router>
            <div className="App">
                <Routes>
                    {/* User Routes */}
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/income" element={<Income />} />
                    <Route path="/reminder-preference" element={<ReminderPreference />} />
                    <Route path="/add-expense" element={<AddExpense />} />
                    <Route path="/budget-setting" element={<BudgetSetting />} />
                    <Route path="/payment-details" element={<PaymentDetails />} />
                    <Route path="/spending" element={<Spending />} />
                    <Route path="/goal-setting" element={<GoalSetting />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />

                    {/* Admin Route */}
                    <Route path="/admin-dashboard" 
                        element={isAdminAuthenticated() ? <AdminDashboard /> : <Login />}
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;