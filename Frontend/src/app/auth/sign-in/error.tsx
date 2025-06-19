"use client";

import React from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        margin: "0 auto",
        backgroundColor: "#fff",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        padding: "40px",
        borderRadius: "12px",
        maxWidth: "500px",
        width: "100%",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "28px", color: "#d32f2f", marginBottom: "16px" }}>
        Глобальна помилка 😱
      </h1>
      <p
        style={{
          color: "#555",
          marginBottom: "24px",
          whiteSpace: "pre-wrap",
        }}
      >
        {error.message}
      </p>
      <button
        onClick={reset}
        style={{
          padding: "12px 24px",
          backgroundColor: "#1976d2",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "16px",
          transition: "background-color 0.3s ease",
        }}
      >
        Спробувати знову
      </button>
    </div>
  );
}
