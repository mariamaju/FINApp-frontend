import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = React.useState("");

  const onSubmit = async (data) => {
    try {
      console.log("data", data);

      // Check if user is admin
      if (data.email === "admin@gmail.com" && data.password === "admin@123") {
        localStorage.setItem("adminToken", "authenticated");
        navigate("/admin-dashboard"); // Redirect to Admin Dashboard
        return;
      }

      // For regular users, continue with API login
      const response = await axios.post("http://localhost:3000/api/auth/login", data);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard"); // Redirect to User Dashboard
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "An error occurred. Please try again.");
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
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="input-group">
                    <label htmlFor="email">Email:</label>
                    <input
                      type="email"
                      id="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: "Invalid email format",
                        },
                      })}
                    />
                    {errors.email && <p className="error-message">{errors.email.message}</p>}
                  </div>
                  <div className="input-group">
                    <label htmlFor="password">Password:</label>
                    <input
                      type="password"
                      id="password"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 5,
                          message: "Password must be at least 5 characters",
                        },
                      })}
                    />
                    {errors.password && <p className="error-message">{errors.password.message}</p>}
                  </div>
                  {errorMessage && <p className="error-message">{errorMessage}</p>}
                  <button type="submit" className="btn">Login</button>
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

export default Login;
