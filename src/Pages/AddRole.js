import React, { useState } from "react";
import axios from "axios";

const AddRole = ({ onSubmit, errorMessage }) => {
  const [formData, setFormData] = useState({
    name: "",
    allowedMenus: "",
  });

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#f9fafb",
      fontFamily: "'Roboto', sans-serif",
    },
    card: {
      background: "#ffffff",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      borderRadius: "8px",
      padding: "30px",
      width: "100%",
      maxWidth: "500px",
    },
    title: {
      fontSize: "24px",
      fontWeight: "600",
      marginBottom: "20px",
      textAlign: "center",
      color: "#333333",
    },
    formGroup: {
      marginBottom: "15px",
    },
    label: {
      display: "block",
      fontWeight: "500",
      color: "#555555",
      marginBottom: "8px",
    },
    input: {
      width: "100%",
      padding: "12px",
      border: "1px solid #dddddd",
      borderRadius: "6px",
      fontSize: "16px",
    },
    button: {
      backgroundColor: "#007bff",
      color: "#ffffff",
      border: "none",
      borderRadius: "6px",
      padding: "12px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      width: "100%",
      marginTop: "10px",
      transition: "background-color 0.3s",
    },
    buttonHover: {
      backgroundColor: "#0056b3",
    },
    errorMessage: {
      color: "red",
      textAlign: "center",
      marginBottom: "20px",
      fontSize: "14px",
    },
    navLinks: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "20px",
      fontSize: "14px",
    },
    navLink: {
      textDecoration: "none",
      color: "#007bff",
      fontWeight: "500",
      cursor: "pointer",
      transition: "color 0.3s",
    },
    navLinkHover: {
      color: "#0056b3",
    },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const roleData = {
      name: formData.name,
      allowedMenus: formData.allowedMenus.split(","),
    };

    try {
      const response = await axios.post(
        "https://backendapps-0d3a0920208f.herokuapp.com/roles",
        roleData
      );
      alert("Role added successfully!");
      if (onSubmit) onSubmit(response.data);
    } catch (error) {
      console.error("Error adding role:", error);
      alert("Failed to add role");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Add New Role</h2>

        {errorMessage && <div style={styles.errorMessage}>{errorMessage}</div>}

        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label htmlFor="name" style={styles.label}>
              Role Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="allowedMenus" style={styles.label}>
              Allowed Menus (comma-separated)
            </label>
            <input
              type="text"
              id="allowedMenus"
              name="allowedMenus"
              value={formData.allowedMenus}
              onChange={handleChange}
              style={styles.input}
              placeholder="e.g., Menu1, Menu2"
              required
            />
          </div>
          <button
            type="submit"
            style={styles.button}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = "#007bff")
            }
          >
            Add Role
          </button>
        </form>

        <div style={styles.navLinks}>
          <a
            href="/AdminDaschboard"
            style={styles.navLink}
            onMouseEnter={(e) =>
              (e.target.style.color = styles.navLinkHover.color)
            }
            onMouseLeave={(e) =>
              (e.target.style.color = "#007bff")
            }
          >
            Back to Dashboard
          </a>
          <a
            href="/Role-List"
            style={styles.navLink}
            onMouseEnter={(e) =>
              (e.target.style.color = styles.navLinkHover.color)
            }
            onMouseLeave={(e) =>
              (e.target.style.color = "#007bff")
            }
          >
            View All Roles
          </a>
        </div>
      </div>
    </div>
  );
};

export default AddRole;
