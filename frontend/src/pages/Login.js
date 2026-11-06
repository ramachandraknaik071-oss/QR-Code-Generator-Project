// frontend/src/pages/Login.js

import React, { useState } from "react";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // Check empty fields
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      const data = await res.json();

      // If wrong email/password
      if (!res.ok) {
        alert(data.message || "Wrong email or password");
        return;
      }

      // Save logged-in userId
      localStorage.setItem("userId", data.userId);

      // Success message
      alert("Login successful");

      // Redirect to Home page
      window.location.href = "/";

    } catch (error) {
      console.log("Login Error:", error);
      alert("Server error. Please try again.");
    }
  };

  return (
    <div className="loginPage">
      <div className="loginBox">
        <h1>Login Page</h1>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>
          Login
        </button>

        <p>
          New user?{" "}
          <span
            className="signupLink"
            onClick={() => {
              window.location.href = "/signup";
            }}
          >
            Signup here
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;