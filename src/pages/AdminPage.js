import React from "react";

export default function AdminPage() {

  return (

    <div
      style={{
        padding: "40px",
        textAlign: "center",
      }}
    >

      <h1>👑 Admin Dashboard</h1>

      <p>

        This page is only accessible by users with the
        <strong> Admin </strong>
        role.

      </p>

      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          borderRadius: "10px",
          background: "#f4f4f4",
          display: "inline-block",
        }}
      >

        <h2>Admin Controls</h2>

        <ul
          style={{
            textAlign: "left",
          }}
        >
          <li>Manage Users</li>
          <li>Delete Any Draft</li>
          <li>View System Reports</li>
          <li>Manage Platform Settings</li>
        </ul>

      </div>

    </div>

  );

}