import React from "react";

const EditUser = ({ user, roles }) => {
  const containerStyle = {
    maxWidth: "700px",
    margin: "50px auto",
    padding: "30px",
    background: "white",
    borderRadius: "12px",
    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
  };

  const headerStyle = {
    background: "linear-gradient(90deg, #0056b3, #004494)",
    color: "white",
    padding: "2rem 0",
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  };

  const headerTextStyle = {
    fontSize: "2.5rem",
    fontWeight: "600",
  };

  const formGridStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  };

  const labelStyle = {
    fontWeight: "bold",
    marginBottom: "8px",
    color: "#0056b3",
    display: "block",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "1rem",
    backgroundColor: "#f9f9f9",
  };

  const buttonStyle = {
    padding: "12px 0",
    background: "#0056b3",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "1.1rem",
    cursor: "pointer",
    textAlign: "center",
    marginTop: "20px",
    width: "100%",
  };

  const backToHomeStyle = {
    textAlign: "center",
    marginTop: "20px",
  };

  const linkStyle = {
    textDecoration: "none",
    color: "#0056b3",
    fontSize: "1.1rem",
  };

  return (
    <div>
      <header style={headerStyle}>
        <h1 style={headerTextStyle}>Edit User</h1>
      </header>

      <div style={containerStyle}>
        <h2 style={{ textAlign: "center", marginBottom: "25px", fontSize: "2rem", color: "#333" }}>
          Update User Details
        </h2>
        <form action={`/edit/${user.id}`} method="post">
          <div style={formGridStyle}>
            <div>
              <label htmlFor="username" style={labelStyle}>
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                defaultValue={user.username}
                required
                style={inputStyle}
              />
            </div>
            <div>
              <label htmlFor="email" style={labelStyle}>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                defaultValue={user.email}
                required
                style={inputStyle}
              />
            </div>
            <div>
              <label htmlFor="password" style={labelStyle}>
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                defaultValue={user.password}
                required
                style={inputStyle}
              />
            </div>
            <div>
              <label htmlFor="firstName" style={labelStyle}>
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                defaultValue={user.firstName}
                required
                style={inputStyle}
              />
            </div>
            <div>
              <label htmlFor="lastName" style={labelStyle}>
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                defaultValue={user.lastName}
                required
                style={inputStyle}
              />
            </div>
            <div>
              <label htmlFor="dob" style={labelStyle}>
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                defaultValue={user.dob}
                required
                style={inputStyle}
              />
            </div>
            <div>
              <label htmlFor="phone" style={labelStyle}>
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                defaultValue={user.phone}
                required
                pattern="[0-9]{10}"
                style={inputStyle}
              />
            </div>
            <div>
              <label htmlFor="role" style={labelStyle}>
                Role
              </label>
              <select id="role" name="role" required style={inputStyle}>
                {roles.map((role) => (
                  <option
                    key={role.name}
                    value={role.name}
                    selected={role.name === user.role}
                  >
                    {role.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button type="submit" style={buttonStyle}>
            Update User
          </button>
        </form>

        <div style={backToHomeStyle}>
          <p>
            <a href="/AdminDashboard" style={linkStyle}>
              Back to Home
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
