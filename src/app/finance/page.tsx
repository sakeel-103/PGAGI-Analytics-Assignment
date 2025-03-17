"use client";

import React from "react";
import useStockData from "../../hooks/useStockData";

const FinancePage = () => {
  const { data, loading, error } = useStockData("AAPL");

  if (loading)
    return (
      <p style={{ textAlign: "center", fontSize: "1.2rem", color: "#666" }}>
        Loading...
      </p>
    );
  if (error)
    return (
      <p style={{ textAlign: "center", fontSize: "1.2rem", color: "#dc3545" }}>
        Error: {error}
      </p>
    );

  return (
    <div>
      {/* Navbar */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem 2rem",
          backgroundColor: "#333",
          color: "#fff",
        }}
      >
        <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
          <a href="/" style={{ color: "#fff", textDecoration: "none" }}>
            PGAGI Analytics
          </a>
        </div>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <a href="/" style={{ color: "#fff", textDecoration: "none" }}>
            Home
          </a>
          <a href="/weather" style={{ color: "#fff", textDecoration: "none" }}>
            Weather
          </a>
          <a href="/news" style={{ color: "#fff", textDecoration: "none" }}>
            News
          </a>
          <a href="/finance" style={{ color: "#fff", textDecoration: "none" }}>
            Finance
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <div
        style={{
          maxWidth: "800px", // Reduced width
          margin: "0 auto",
          padding: "2rem",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontSize: "2.5rem",
            color: "#333",
            marginBottom: "2rem",
          }}
        >
          Finance Page
        </h1>
        <div
          style={{
            backgroundColor: "#fff",
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            padding: "2rem",
            marginTop: "1rem",
          }}
        >
          <h2
            style={{
              fontSize: "1.75rem",
              color: "#007bff",
              marginBottom: "1.5rem",
              textAlign: "center",
            }}
          >
            Stock Data
          </h2>
          <pre
            style={{
              backgroundColor: "#f9f9f9",
              border: "1px solid #ddd",
              borderRadius: "4px",
              padding: "1rem",
              fontFamily: '"Courier New", Courier, monospace',
              fontSize: "0.9rem",
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
              overflowX: "auto",
            }}
          >
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default FinancePage;