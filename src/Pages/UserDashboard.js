import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const UserDashboard = ({ firstname, lastname, username }) => {
  const [allowedMenus, setAllowedMenus] = useState([]);
  const [role, setRole] = useState('');

  // Fetch allowedMenus from localStorage when the component mounts
  useEffect(() => {
    const menus = JSON.parse(localStorage.getItem('allowedMenus'));
    const role= localStorage.getItem('role');
    setRole(role);
    if (menus) {
      setAllowedMenus(menus);
    }
  }, []);

  return (
    <>
      {/* Header Section */}
      <header className="text-white text-center p-4" style={{ background: "linear-gradient(to right, #0056b3, #004494)" }}>
        <h1>User Dashboard</h1>
        <p>Welcome to your personalized dashboard</p>
      </header>

      {/* Dashboard Container */}
      <div className="container text-center mt-4 p-4 bg-white shadow rounded">
        <p className="welcome-msg text-primary" style={{ fontSize: "1.8rem" }}>
          Hello, {firstname} {lastname}!
        </p>
        <p className="info" style={{fontSize:24}}>
          You are logged in as <strong style={{fontSize:30,color: "green"}}>{role}</strong>.
        </p>

        {/* User Menu */}
        <div className="user-menu">
          <h2>
            <span className="text-primary fw-bold">{role}</span>'s Menu
          </h2>
          <br />
          <ul className="list-unstyled d-flex flex-wrap justify-content-center gap-3">
            {allowedMenus && allowedMenus.length > 0 ? (
              allowedMenus.map((menu, index) => (
                <a
                  key={index}
                  href={`/${menu.toLowerCase().replace(" ", "-")}`}
                  className="btn btn-primary"
                >
                  {menu}
                </a>
              ))
            ) : (
              <p>No menus available.</p>
            )}
          </ul>
        </div>
      </div>

      {/* Logout Section */}
      <div className="text-end mt-3 me-4">
        <a href="/login" className="btn btn-danger text-uppercase">
          Logout
        </a>
      </div>
    </>
  );
};

export default UserDashboard;
