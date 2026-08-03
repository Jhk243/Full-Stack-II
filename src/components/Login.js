import React, { useState } from "react";

import {
  generateToken,
  saveToken,
} from "../auth/jwt";

import "./Login.css";

export default function Login({ onLogin }) {

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  function handleLogin(e) {

    e.preventDefault();

    const users = [

  {
    username: "admin",
    password: "password123",
  },

  {
    username: "editor",
    password: "editor123",
  },

  {
    username: "viewer",
    password: "viewer123",
  },

];

    const validUser = users.find(
      (user) =>
        user.username === username &&
        user.password === password
    );

    if (!validUser) {

      setError("Invalid username or password");

      return;

    }

    const token = generateToken(username);

    saveToken(token);

    onLogin();

  }

  return (

    <div className="loginContainer">

      <form
        className="loginCard"
        onSubmit={handleLogin}
      >

        <h1>🔐 Secure Login</h1>

        <p>

          JWT Authentication Demo

        </p>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        {error && (

          <div className="error">

            {error}

          </div>

        )}

        <button type="submit">

          Login

        </button>

        <div className="credentials">

  <strong>Demo Accounts</strong>

  <p>👑 Admin → admin / password123</p>

  <p>✏️ Editor → editor / editor123</p>

  <p>👀 Viewer → viewer / viewer123</p>

</div>

      </form>

    </div>

  );

}