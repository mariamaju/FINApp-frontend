import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./Signup.css";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      console.log('data', data);
      const response = await axios.post("http://localhost:3000/api/auth/register", data);
      console.log("token",response);
      localStorage.setItem("token", response.data.token);
      //console.log("data", response.data);
      navigate("/income");
    } catch (error) {
      console.log("data", error);
      setErrorMessage(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  const handleNextStep = async () => {
    const valid = await trigger(["firstName", "lastName", "email", "phone", "bankName"]);
    if (valid) {
      setStep(2);
    }
  };

  return (
    <div className="signup-container">
      <div className="sidebar">
        <h2 className="logo">FinAi</h2>
        <h3>Signup Process</h3>
        <ul className="step-list">
          <li className={step === 1 ? "active" : ""}>1. Personal Info</li>
          <li className={step === 2 ? "active" : ""}>2. Security Details</li>
        </ul>
      </div>

      <div className="form-content">
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {step === 1 && (
          <form onSubmit={(e) => e.preventDefault()}>
            <h2>Personal Information</h2>
            <div className="input-group">
              <input {...register("firstName", { required: "First Name is required" })} placeholder="First Name" />
              {errors.firstName && <p className="error-message">{errors.firstName.message}</p>}

              <input {...register("lastName", { required: "Last Name is required" })} placeholder="Last Name" />
              {errors.lastName && <p className="error-message">{errors.lastName.message}</p>}

              <input {...register("email", { required: "Email is required", pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email format" } })} placeholder="Email" />
              {errors.email && <p className="error-message">{errors.email.message}</p>}

              <input {...register("phone", { required: "Phone Number is required", pattern: { value: /^\d{10}$/, message: "Phone number must be 10 digits" } })} placeholder="Phone Number" />
              {errors.phone && <p className="error-message">{errors.phone.message}</p>}

              <input {...register("bankName", { required: "Bank Name is required" })} placeholder="Bank Name" />
              {errors.bankName && <p className="error-message">{errors.bankName.message}</p>}
            </div>
            <button onClick={handleNextStep} className="next-btn">Next</button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Security Details</h2>
            <div className="input-group">
              <input {...register("password", { required: "Password is required", minLength: { value: 5, message: "Password must be at least 5 characters" } })} placeholder="Password" type="password" />
              {errors.password && <p className="error-message">{errors.password.message}</p>}

              <input {...register("confirmPassword", { required: "Confirm Password is required", validate: (value) => value === password || "Passwords do not match" })} placeholder="Confirm Password" type="password" />
              {errors.confirmPassword && <p className="error-message">{errors.confirmPassword.message}</p>}
            </div>
            <button onClick={() => setStep(1)} className="back-btn">Back</button>
            <button type="submit" className="signup-btn">Sign Up</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Signup;
