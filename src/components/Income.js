import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Income.css';
import axios from 'axios';

const Income = () => {
  const [income, setIncome] = useState('');
  const [visibleCategories, setVisibleCategories] = useState({
    loan: false,
    insurance: false,
    subscriptionServices: false,
    transportation: false,
    savings: false
  });
  const [expenses, setExpenses] = useState({
    loan: [],
    insurance: [],
    subscriptionServices: [],
    transportation: [],
    savings: []
  });
  const [newExpense, setNewExpense] = useState({
    loan: { name: '', amount: '' },
    insurance: { name: '', amount: '' },
    subscriptionServices: { name: '', amount: '' },
    transportation: { name: '', amount: '' },
    savings: { amount: '' }
  });

  const navigate = useNavigate();

  const handleIncomeChange = (e) => {
    setIncome(e.target.value);
  };

  const toggleCategoryVisibility = (category) => {
    setVisibleCategories((prev) => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handleNewExpenseChange = (category, field, value) => {
    setNewExpense((prev) => ({
      ...prev,
      [category]: { ...prev[category], [field]: value }
    }));
  };

  const handleAddExpense = (category) => {
    if (category === 'savings') {
      const { amount } = newExpense.savings;
      if (amount) {
        setExpenses((prevExpenses) => ({
          ...prevExpenses,
          savings: [...prevExpenses.savings, { amount: parseFloat(amount) }]
        }));
        setNewExpense((prev) => ({
          ...prev,
          savings: { amount: '' }
        }));
      }
    } else {
      const { name, amount } = newExpense[category];
      if (name && amount) {
        setExpenses((prevExpenses) => ({
          ...prevExpenses,
          [category]: [...prevExpenses[category], { name, amount: parseFloat(amount) }]
        }));
        setNewExpense((prev) => ({
          ...prev,
          [category]: { name: '', amount: '' }
        }));
      }
    }
  };

  const handleOkClick = async() => {
    try{
    console.log("data",income,expenses);
    const data = {income : income , savings : expenses.savings , loan : expenses.loan , insurance : expenses.insurance , subscription : expenses.subscriptionServices , transportation : expenses.transportation};
    const token = localStorage.getItem("token");
    console.log("data",token,data);
    const response = await axios.post(
      "http://localhost:3000/api/auth/addExpense",  // Your API endpoint
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("response",response);
     navigate('/dashboard');
  }
  catch(error){
    console.log("error",error);
  }
  };
  
  const renderExpenses = (category) => {
    return (
      <div className="sub-category">
        {expenses[category].map((expense, index) => (
          <div key={index} className="sub-category-item">
            {category !== 'savings' && <label>{expense.name}</label>}
            <span>Rs. {expense.amount}</span>
          </div>
        ))}
        <div className="add-other">
          {category !== 'savings' && (
            <input
              type="text"
              placeholder="Expense Name"
              value={newExpense[category].name}
              onChange={(e) => handleNewExpenseChange(category, 'name', e.target.value)}
            />
          )}
          <input
            type="number"
            placeholder="Amount"
            value={newExpense[category].amount}
            onChange={(e) => handleNewExpenseChange(category, 'amount', e.target.value)}
          />
          <button onClick={() => handleAddExpense(category)}>{category === 'savings' ? 'Add' : 'Add Expense'}</button>
        </div>
      </div>
    );
  };

  return (
    <div className="income-container">
      <h1>Income and Expenses</h1>
      <div className="income-input">
        <label>Income</label>
        <input type="number" value={income} onChange={handleIncomeChange} placeholder="Enter Income" />
      </div>

      <h2>Fixed Expenses</h2>
      <div className="fixed-expenses">
        <div className="category">
          <h3 onClick={() => toggleCategoryVisibility('loan')}>Loan</h3>
          {visibleCategories.loan && renderExpenses('loan')}
        </div>

        <div className="category">
          <h3 onClick={() => toggleCategoryVisibility('insurance')}>Insurance</h3>
          {visibleCategories.insurance && renderExpenses('insurance')}
        </div>

        <div className="category">
          <h3 onClick={() => toggleCategoryVisibility('subscriptionServices')}>Subscription Services</h3>
          {visibleCategories.subscriptionServices && renderExpenses('subscriptionServices')}
        </div>

        <div className="category">
          <h3 onClick={() => toggleCategoryVisibility('transportation')}>Transportation</h3>
          {visibleCategories.transportation && renderExpenses('transportation')}
        </div>

        <div className="category">
          <h3 onClick={() => toggleCategoryVisibility('savings')}>Savings</h3>
          {visibleCategories.savings && renderExpenses('savings')}
        </div>
      </div>

      <button className="ok-button" onClick={handleOkClick}>
        OK
      </button>
    </div>
  );
};

export default Income;