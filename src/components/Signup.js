import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import axios from 'axios'; 

const Signup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bankName: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("data",formData);
    const { firstName, lastName, email, phone, bankName, password, confirmPassword } = formData;

    if (!firstName || !lastName || !email || !phone || !bankName || !password || !confirmPassword) {
      setErrorMessage("All fields are required!");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }
    try {
        const response = await axios.post('http://localhost:3000/api/auth/register', {
          firstName, 
          lastName, 
          email, 
          phone, 
          bankName, 
          password,
        });
    console.log("data",response);
        // Store the token in localStorage
       // localStorage.setItem('token', response.data.token);
        
        // Redirect to Dashboard after successful login
        navigate('/income');
      } catch (error) {
        console.log("data",error);
        // Handle error response from the backend
        setErrorMessage(
          error.response?.data?.message || 'An error occurred. Please try again.'
        );
      }
    alert("Sign up successful!");
     navigate("/income"); // Redirect to Income page
  };

  return (
    <div className="signup-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="logo">FinAi</h2>
        <h3>Signup Process</h3>
        <ul className="step-list">
          <li className={step === 1 ? "active" : ""}>1. Personal Info</li>
          <li className={step === 2 ? "active" : ""}>2. Security Details</li>
        </ul>
      </div>

      {/* Form Section */}
      <div className="form-content">
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {step === 1 && (
          <>
            <h2>Personal Information</h2>
            <div className="input-group">
              <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} value={formData.firstName} required />
              <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} value={formData.lastName} required />
              <input type="email" name="email" placeholder="Email" onChange={handleChange} value={formData.email} required />
              <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} value={formData.phone} required />
              <input type="text" name="bankName" placeholder="Bank Name" onChange={handleChange} value={formData.bankName} required />
            </div>
            <button onClick={nextStep} className="next-btn">Next</button>
          </>
        )}

        {step === 2 && (
          <>
            <h2>Security Details</h2>
            <div className="input-group">
              <input type="password" name="password" placeholder="Password" onChange={handleChange} value={formData.password} required />
              <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} value={formData.confirmPassword} required />
            </div>
            <button onClick={prevStep} className="back-btn">Back</button>
            <button onClick={handleSubmit} className="signup-btn">Sign Up</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Signup;