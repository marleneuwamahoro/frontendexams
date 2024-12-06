import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      alert("Invalid or expired token.");
      navigate("/forgot-password");
    }
  }, [searchParams, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = searchParams.get("token");

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch(
        "https://backendapps-0d3a0920208f.herokuapp.com/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, newPassword }),
        }
      );

      if (response.ok) {
        alert("Password successfully reset!");
        navigate("/login");
      } else {
        alert("Failed to reset password.");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg, #ff758c, #ff7eb3)",
      }}
    >
      <div
        className="card shadow-lg p-5"
        style={{
          maxWidth: "450px",
          width: "100%",
          borderRadius: "15px",
          backgroundColor: "#fff",
        }}
      >
        <h2
          className="text-center mb-4"
          style={{
            color: "#ff758c",
            fontWeight: "bold",
          }}
        >
          Reset Your Password
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="newPassword" className="form-label">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              className="form-control"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              placeholder="Enter new password"
              style={{
                borderRadius: "10px",
              }}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm new password"
              style={{
                borderRadius: "10px",
              }}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100 py-2"
            style={{
              backgroundColor: "#ff758c",
              borderColor: "#ff758c",
              borderRadius: "10px",
            }}
          >
            Reset Password
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

export default ResetPassword;
