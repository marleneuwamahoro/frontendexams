import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RoleListPage = () => {
  const [roles, setRoles] = useState([]); // To hold roles data
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle any errors

  // Fetch roles from backend when component mounts
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get('https://backendapps-0d3a0920208f.herokuapp.com/roles'); // Assuming your API endpoint is /api/roles
        setRoles(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching roles');
        setLoading(false);
      }
    };

    fetchRoles();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  if (loading) {
    return <div style={styles.container}>Loading roles...</div>;
  }

  if (error) {
    return <div style={styles.container}>{error}</div>;
  }

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <header style={styles.header}>
        <h1 style={styles.headerText}>Role List</h1>
      </header>

      {/* Back to Dashboard Button */}
      <div style={styles.backButtonContainer}>
        <a
          href="/AdminDaschboard"
          style={styles.backButton}
          onMouseEnter={(e) => (e.target.style.background = styles.backButtonHover.background)}
          onMouseLeave={(e) => (e.target.style.background = "#0056b3")}
        >
          Back to Dashboard
        </a>
        <a
          href="/AddRole"
          style={styles.button}
          onMouseEnter={(e) => (e.target.style.background = styles.buttonHover.background)}
          onMouseLeave={(e) => (e.target.style.background = "#ff5733")}
        >
          Add New Role
        </a>
      </div>

      {/* Table Section */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>ID</th>
            <th style={styles.tableHeader}>Role Name</th>
            <th style={styles.tableHeader}>Allowed Menus</th>
          </tr>
        </thead>
        <tbody>
          {roles && roles.length > 0 ? (
            roles.map((role) => (
              <tr key={role.id}>
                <td style={styles.tableCell}>{role.id}</td>
                <td style={styles.tableCell}>{role.name}</td>
                <td style={styles.tableCell}>
                  {Array.isArray(role.allowedMenus) ?  role.allowedMenus.join(', ') : role.allowedMenus}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={styles.tableCell}>
                No roles available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Poppins', sans-serif",
    backgroundColor: "#f0f0f0",
    color: "#333",
    lineHeight: "1.6",
    paddingBottom: "40px",
  },
  header: {
    background: "linear-gradient(to right, #0056b3, #004494)",
    color: "white",
    padding: "2rem 0",
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  headerText: {
    fontSize: "2.5rem",
    marginBottom: "10px",
  },
  backButtonContainer: {
    textAlign: "center",
    margin: "20px",
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
    margin: "0 10px",
  },
  buttonHover: {
    background: "#ff6f4f",
  },
  backButton: {
    textDecoration: "none",
    background: "#0056b3",
    color: "white",
    padding: "10px 15px",
    borderRadius: "5px",
    transition: "background 0.3s",
  },
  backButtonHover: {
    background: "#004494",
  },
  table: {
    width: "90%",
    margin: "40px auto",
    borderCollapse: "collapse",
    background: "white",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    textAlign: "center",
  },
  tableCell: {
    padding: "15px",  
    fontSize: "1rem",
  },
  tableHeader: {
    backgroundColor: "#004494",
    color: "white",
    padding: "15px",
    textTransform: "uppercase",
  },
};

export default RoleListPage;
