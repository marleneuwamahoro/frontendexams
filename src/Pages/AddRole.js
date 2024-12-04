import React, { useState } from 'react';
import axios from 'axios';

const AddRole = ({ onSubmit, errorMessage }) => {

  const [formData, setFormData] = useState({
    name: '',
    allowedMenus: ''
  });

  // Inline CSS
  const styles = {
    container: {
      fontFamily: "'Poppins', sans-serif",
      backgroundColor: "#f0f0f0",
      color: "#333",
      lineHeight: "1.6",
      minHeight: "100vh",
      paddingBottom: "40px"
    },
    header: {
      background: "linear-gradient(to right, #0056b3, #004494)",
      color: "white",
      padding: "2rem 0",
      textAlign: "center",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)"
    },
    headerText: {
      fontSize: "2.5rem",
      marginBottom: "10px"
    },
    buttonContainer: {
      textAlign: "center",
      margin: "20px"
    },
    button: {
      padding: "10px 15px",
      background: "#ff5733",
      color: "white",
      border: "none",
      borderRadius: "5px",
      textDecoration: "none",
      fontSize: "1rem",
      transition: "background 0.3s",
      cursor: "pointer",
      margin: "0 10px"
    },
    buttonHover: {
      background: "#ff6f4f"
    },
    formContainer: {
      width: "90%",
      maxWidth: "600px",
      margin: "40px auto",
      padding: "20px",
      background: "white",
      borderRadius: "10px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)"
    },
    formGroup: {
      marginBottom: "15px"
    },
    label: {
      display: "block",
      marginBottom: "5px"
    },
    input: {
      width: "100%",
      padding: "10px",
      border: "1px solid #ddd",
      borderRadius: "5px"
    },
    submitButton: {
      background: "#0056b3",
      color: "white",
      padding: "10px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "1rem",
      transition: "background 0.3s",
      width: "100%"
    },
    submitButtonHover: {
      background: "#004494"
    },
    errorMessage: {
      color: "red",
      textAlign: "center",
      marginBottom: "20px"
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const roleData = {
      name: formData.name,
      allowedMenus: formData.allowedMenus.split(',') 
    };

    try {
      const response = await axios.post('https://backendapps-0d3a0920208f.herokuapp.com/roles', roleData);
      alert('Role added successfully!');
      if (onSubmit) onSubmit(response.data);
    } catch (error) {
      console.error('Error adding role:', error);
      alert('Failed to add role');
    }
  };

  return (
    <div style={styles.container}>

      <header style={styles.header}>
        <h1 style={styles.headerText}>Add New Role</h1>
      </header>

      <div style={styles.buttonContainer}>
        <a
          href="/AdminDaschboard"
          style={styles.button}
          onMouseEnter={(e) => (e.target.style.background = styles.buttonHover.background)}
          onMouseLeave={(e) => (e.target.style.background = "#ff5733")}
        >
          Back Dashboard
        </a>
        <a
          href="/Role-List"
          style={styles.button}
          onMouseEnter={(e) => (e.target.style.background = styles.buttonHover.background)}
          onMouseLeave={(e) => (e.target.style.background = "#ff5733")}
        >
          View All Roles
        </a>
      </div>

      <div style={styles.formContainer}>
        {errorMessage && <div style={styles.errorMessage}>{errorMessage}</div>}
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label htmlFor="name" style={styles.label}>Role Name:</label>
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
            <label htmlFor="allowedMenus" style={styles.label}>Allowed Menus (comma separated):</label>
            <input
              type="text"
              id="allowedMenus"
              name="allowedMenus"
              value={formData.allowedMenus}
              onChange={handleChange}
              style={styles.input}
              placeholder="Menu1, Menu2"
            />
          </div>
          <button
            type="submit"
            style={styles.submitButton}
            onMouseEnter={(e) => (e.target.style.background = styles.submitButtonHover.background)}
            onMouseLeave={(e) => (e.target.style.background = "#0056b3")}
          >
            Add Role
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRole;
