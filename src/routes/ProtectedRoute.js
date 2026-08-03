import React from "react";

import { Navigate } from "react-router-dom";

import {
  getToken,
  decodeToken,
} from "../auth/jwt";

export default function ProtectedRoute({

  children,

  allowedRoles,

}) {

  const token = getToken();

  if (!token) {

    return <Navigate to="/" replace />;

  }

  const user = decodeToken(token);

  if (!user) {

    return <Navigate to="/" replace />;

  }

  if (!allowedRoles.includes(user.role)) {

    return <Navigate to="/unauthorized" replace />;

  }

  return children;

}