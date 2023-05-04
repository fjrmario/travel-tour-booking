import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utility/url";

const AccountEdit = () => {
  const [user, setUser] = useState("");
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [validationMsg, setValidationMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const ifUser = localStorage.getItem("user");
    if (ifUser) {
      setUser(JSON.parse(ifUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetch(`${BASE_URL}/users/${user._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    }
  }, [user]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users/${user._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.ok) {
        localStorage.removeItem("user");
        navigate("/home");
      } else {
        const error = await response.json();
        setValidationMsg(error.message);
        console.log(error);
      }
    } catch (error) {
      setValidationMsg(error);
    }
  };

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userDataToSend = {};

    if (userData.username.trim()) {
      userDataToSend.username = userData.username;
    }

    if (userData.email.trim()) {
      userDataToSend.email = userData.email;
    }

    if (userData.password.trim()) {
      userDataToSend.password = userData.password;
    }

    if (userData.confirmPassword.trim()) {
      userDataToSend.confirmPassword = userData.confirmPassword;
    }

    try {
      const response = await fetch(`${BASE_URL}/users/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(userDataToSend),
      });
      if (response.ok) {
        setValidationMsg("Updated Successfully");
        console.log(validationMsg);
        navigate("/account");
      } else {
        const error = await response.json();
        setValidationMsg(error.message);
        navigate("/");
      }
    } catch (error) {
      setValidationMsg(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          onChange={handleInputChange}
        />
      </div>
      <div className="validation-error">{validationMsg}</div>

      <button type="submit">Update Account</button>
      <button onClick={handleDelete}>Delete Account</button>
    </form>
  );
};

export default AccountEdit;
