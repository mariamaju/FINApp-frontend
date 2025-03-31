import React, { useState } from 'react';
import './GoalForm.css';

const GoalForm = ({ onGoalAdded }) => {
  const [goal, setGoal] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [duration, setDuration] = useState('');
  const [dailyLimit, setDailyLimit] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!goal || !targetAmount || !duration || !dailyLimit) {
      setError('Please fill all fields');
      return;
    }

    const amount = parseFloat(targetAmount);
    const days = parseInt(duration);
    const limit = parseFloat(dailyLimit);
    
    if (amount <= 0 || days <= 0 || limit <= 0) {
      setError('Values must be greater than zero');
      return;
    }

    const dailySavings = amount / days;
    const achievable = dailySavings <= limit;

    setResult({
      goal,
      targetAmount: amount,
      duration: days,
      dailyLimit: limit,
      requiredDaily: dailySavings,
      achievable
    });

    if (achievable && onGoalAdded) {
      onGoalAdded({
        title: goal,
        targetAmount: amount,
        duration: days,
        dailyLimit: limit
      });
    }
  };

  return (
    <div className="goal-container">
      <h1>Set Your Financial Goal</h1>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>What is your goal?</label>
          <input
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="e.g., Vacation, New Laptop"
          />
        </div>
        
        <div className="form-group">
          <label>Target Amount (Rs)</label>
          <input
            type="number"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            placeholder="e.g., 5000"
            min="0.01"
            step="0.01"
          />
        </div>
        
        <div className="form-group">
          <label>Duration (days)</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="e.g., 90"
            min="1"
          />
        </div>
        
        <div className="form-group">
          <label>Daily Saving Limit (Rs))</label>
          <input
            type="number"
            value={dailyLimit}
            onChange={(e) => setDailyLimit(e.target.value)}
            placeholder="e.g., 50"
            min="0.01"
            step="0.01"
          />
        </div>
        
        <button type="submit" className="submit-btn">
          submit
        </button>
      </form>
      
      {result && (
        <div className={`result-box ${result.achievable ? 'success' : 'error'}`}>
          <h3>{result.achievable ? 'Savings Plan' : 'Goal Not Achievable'}</h3>
          <p>Goal: <strong>{result.goal}</strong></p>
          <p>Target: <strong>Rs {result.targetAmount.toFixed(2)}</strong> in {result.duration} days</p>
          
          <div className="daily-amount">
            Required Daily Savings: <strong>Rs {result.requiredDaily.toFixed(2)}</strong>
          </div>
          
          {result.achievable ? (
            <p className="success-message">
              This fits within your daily limit of <strong>Rs {result.dailyLimit.toFixed(2)}</strong>
            </p>
          ) : (
            <p className="error-message">
              Exceeds your daily limit of <strong>Rs {result.dailyLimit.toFixed(2)}</strong>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default GoalForm;