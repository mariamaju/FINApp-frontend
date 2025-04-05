import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Validate inputs
    if (!email || !newPassword || !confirmPassword) {
      setMessage({ text: 'All fields are required', type: 'error' });
      setIsLoading(false);
      return;
    }
    
    if (newPassword.length < 5) {
      setMessage({ text: 'Password must be at least 5 characters', type: 'error' });
      setIsLoading(false);
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setMessage({ text: 'Passwords do not match', type: 'error' });
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/auth/reset-password', {
        email,
        newPassword
      });

      setMessage({ 
        text: response.data.message || 'Password reset successfully! Redirecting to login...', 
        type: 'success' 
      });
      
      // Clear form fields
      setEmail('');
      setNewPassword('');
      setConfirmPassword('');
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/login', { replace: true }); // Using replace: true to prevent going back
      }, 2000);
    } catch (error) {
      console.error('Password reset error:', error);
      const errorMsg = error.response?.data?.message || 
                     error.response?.data?.error || 
                     'Failed to reset password. Please try again.';
      
      setMessage({ 
        text: errorMsg, 
        type: 'error' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Reset Password</h2>
      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your registered email"
          />
        </div>
        <div className="form-group">
          <label>New Password (min 5 characters)</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            minLength="5"
            required
            placeholder="Enter new password"
          />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            minLength="5"
            required
            placeholder="Confirm new password"
          />
        </div>
        <button 
          type="submit" 
          className="submit-btn"
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Reset Password'}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;