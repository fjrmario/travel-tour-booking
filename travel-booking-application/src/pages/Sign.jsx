import React, { useRef, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../styles/auth.css";

import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../utility/url.js";

const Sign = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const containerRef = useRef(null);

  const handleSignup = () => {
    containerRef.current.classList.add("right-panel-active");
    setErrors({});
  };

  const handleSignin = () => {
    containerRef.current.classList.remove("right-panel-active");
    setErrors({});
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (credentials.password !== credentials.confirmPassword) {
      setErrors({ message: "Confirm Password must match Password" });
      return;
    }

    try {
      console.log("h1");
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const result = await res.json();
      console.log("h1", result);

      if (!res.ok) {
        setErrors(result);
        return;
      }
      console.log("h2");

      dispatch({
        type: "REGISTER_SUCCESS",
      });
      console.log("h3");

      handleSignin();
      setErrors("");
    } catch (error) {
      setErrors(error);
    }
  };

  const handleClickLogIn = async (e) => {
    e.preventDefault();

    dispatch({ type: "LOGIN_START" });
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(credentials),
      });

      const result = await res.json();
      if (!res.ok) {
        setErrors({ message: result.message });
        return;
      }

      dispatch({ type: "LOGIN_SUCCESS", payload: result.data });
      navigate("/");
      setErrors("");
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.message });
    }
  };

  return (
    <>
      <div
        className="sign__wrapper"
        id="sign__wrapper"
        ref={containerRef}
      >
        <div className="form-sign__wrapper sign-up-sign__wrapper">
          <form
            className="auth-form"
            onSubmit={handleClick}
          >
            <h1>Create Account</h1>
            <input
              type="text"
              placeholder="Userame"
              // required
              id="username"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              // required
              id="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              // required
              id="password"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              // required
              id="confirmPassword"
              onChange={handleChange}
            />
            {errors.message && (
              <p className="error-message">{errors.message}</p>
            )}
            <button type="submit">Sign Up</button>
          </form>
        </div>
        <div className="form-sign__wrapper sign-in-sign__wrapper">
          <form onSubmit={handleClickLogIn}>
            <h1>Sign in</h1>
            <input
              type="email"
              placeholder="Email"
              required
              id="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              required
              id="password"
              onChange={handleChange}
            />
            <a href="#">Forgot your password?</a>
            {errors.message && (
              <p className="error-message">{errors.message}</p>
            )}
            <button>Sign In</button>
          </form>
        </div>
        <div className="overlay-sign__wrapper">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button
                className="ghost"
                onClick={handleSignin}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button
                className="ghost"
                onClick={handleSignup}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sign;
