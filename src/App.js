import React, { useEffect, useState } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";

import DraftManager from "./components/DraftManager";
import Login from "./components/Login";

import AdminPage from "./pages/AdminPage";
import Unauthorized from "./pages/Unauthorized";
import CalendarPage from "./pages/CalendarPage";

import ProtectedRoute from "./routes/ProtectedRoute";

import {
  isAuthenticated,
  logout,
  decodeToken,
  getToken,
} from "./auth/jwt";

import "./App.css";

export default function App() {

  const [loggedIn, setLoggedIn] = useState(false);

  const [user, setUser] = useState(null);

  useEffect(() => {

    if (isAuthenticated()) {

      const token = getToken();

      const payload = decodeToken(token);

      setUser(payload);

      setLoggedIn(true);

    }

  }, []);

  function handleLogin() {

    const token = getToken();

    const payload = decodeToken(token);

    setUser(payload);

    setLoggedIn(true);

  }

  function handleLogout() {

    logout();

    setLoggedIn(false);

    setUser(null);

  }

  if (!loggedIn) {

    return <Login onLogin={handleLogin} />;

  }

  return (

    <BrowserRouter>

      <div>

        <div className="topBar">

          <div>

            <h2>

              Welcome, {user.username} 👋

            </h2>

            <p>

              Role: {user.role}

            </p>

          </div>

          <div>

            <Link
              className="navLink"
              to="/"
            >
              Draft Manager
            </Link>
            <Link
  className="navLink"
  to="/calendar"
>
  📅 Calendar
</Link>

            {user.role === "Admin" && (

              <Link
                className="navLink"
                to="/admin"
              >
                Admin Panel
              </Link>

            )}

            <button
              className="logoutButton"
              onClick={handleLogout}
            >
              Logout
            </button>

          </div>

        </div>

        <Routes>

          <Route
            path="/"
            element={<DraftManager />}
          />

          <Route
  path="/calendar"
  element={<CalendarPage />}
/>

          <Route
            path="/admin"
            element={
              <ProtectedRoute
                allowedRoles={["Admin"]}
              >
                <AdminPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/unauthorized"
            element={<Unauthorized />}
          />

          <Route
            path="*"
            element={<Navigate to="/" />}
          />

        </Routes>

      </div>

    </BrowserRouter>

  );

}