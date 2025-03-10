import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link for navigation
import axios from 'axios'; // Import Axios
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Hook for navigating programmatically

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === '' || password === '') {
      setErrorMessage('Email and Password cannot be empty!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email,
        password,
      });
     console.log("response",response);
      // Store the token in localStorage
      localStorage.setItem('token', response.data.token);
      
      // Redirect to Dashboard after successful login
      navigate('/dashboard');
    } catch (error) {
      // Handle error response from the backend
      setErrorMessage(
        error.response?.data?.message || 'An error occurred. Please try again.'
      );
    }
  };

  return (
    <div>
      <section>
        <div className="container">
          <div className="row full-screen align-items-center">
            <div className="left">
              <span className="line"></span>
              <h2>FinAi</h2>
              <h3>An Intelligent Financial Management App</h3>
            </div>
            <div className="right">
              <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                  <div className="input-group">
                    <label htmlFor="email">Email:</label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="password">Password:</label>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn">Login</button>
                  {errorMessage && <p className="error-message">{errorMessage}</p>}
                </form>
                <p>
                  Don't have an account? <Link to="/signup" className="link">Sign Up</Link>
                </p> 
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
