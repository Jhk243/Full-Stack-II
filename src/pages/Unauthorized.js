import React from "react";
import { Link } from "react-router-dom";

export default function Unauthorized() {

  return (

    <div
      style={{
        textAlign: "center",
        marginTop: "100px",
      }}
    >

      <h1>🚫 Access Denied</h1>

      <h2>You do not have permission to access this page.</h2>

      <p>

        Your current role does not allow access.

      </p>

      <Link to="/">

        <button
          style={{
            marginTop: "20px",
            padding: "12px 24px",
            cursor: "pointer",
          }}
        >

          Return Home

        </button>

      </Link>

    </div>

  );

}