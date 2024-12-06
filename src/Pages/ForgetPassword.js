import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://backendapps-0d3a0920208f.herokuapp.com/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        const data = await response.text();
        setMessage(data);
        setError("");
      } else {
        const errorMessage = await response.text();
        setError(errorMessage);
        setMessage("");
      }
    } catch (err) {
      console.error("Error sending request:", err);
      setError("An unexpected error occurred. Please try again.");
      setMessage("");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100 bg-light"
      style={{
        background: "linear-gradient(135deg, #6c63ff, #3f3d56)",
      }}
    >
      <div
        className="card shadow p-4"
        style={{
          maxWidth: "450px",
          width: "100%",
          borderRadius: "15px",
          background: "#fff",
        }}
      >
        <h2
          className="text-center mb-4"
          style={{ color: "#6c63ff", fontWeight: "bold" }}
        >
          Forgot Password
        </h2>
        {message && (
          <div className="alert alert-success text-center">{message}</div>
        )}
        {error && (
          <div className="alert alert-danger text-center">{error}</div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="form-label">
              Enter your registered email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="e.g., example@domain.com"
              style={{ borderRadius: "10px" }}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100 py-2"
            style={{
              backgroundColor: "#6c63ff",
              borderColor: "#6c63ff",
              borderRadius: "10px",
            }}
          >
            Send Reset Link
          </button>
        </form>
        <div className="text-center mt-4">
          <a
            href="/login"
            className="btn btn-secondary py-2 px-4"
            style={{
              borderRadius: "10px",
              textDecoration: "none",
              color: "#fff",
            }}
          >
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
