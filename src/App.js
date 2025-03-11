import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Signup from "./components/Signup";
import Income from "./components/Income";
import ReminderPreference from "./components/ReminderPreference"; // Import ReminderPreference
import AddExpense from "./components/AddExpense"; // Import AddExpense
import BudgetSetting from "./components/BudgetSetting"; // Import BudgetSetting

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/income" element={<Income />} />
                    {/* Add new routes for ReminderPreference, AddExpense, and BudgetSetting */}
                    <Route path="/reminder-preference" element={<ReminderPreference />} />
                    <Route path="/add-expense" element={<AddExpense />} />
                    <Route path="/budget-setting" element={<BudgetSetting />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;