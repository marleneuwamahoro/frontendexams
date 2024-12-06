import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { MdArrowUpward, MdArrowDownward } from "react-icons/md";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: "username", direction: "asc" });

  // Fetch data (users and roles)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersResponse, rolesResponse] = await Promise.all([
          axios.get("https://backendapps-0d3a0920208f.herokuapp.com/users"),
          axios.get("https://backendapps-0d3a0920208f.herokuapp.com/roles"),
        ]);

        let usersData = Array.isArray(usersResponse.data)
          ? usersResponse.data
          : usersResponse.data.users;

        if (usersData) {
          setUsers(usersData.filter((user) => user.role !== "administrator"));
          setFilteredUsers(usersData.filter((user) => user.role !== "administrator"));
        }
        setRoles(rolesResponse.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = users.filter(
      (user) =>
        user.username.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );
    if (selectedRole) {
      filtered = filtered.filter((user) => user.role === selectedRole);
    }
    setFilteredUsers(filtered);
    setCurrentPage(0);
  }, [search, users, selectedRole]);

  const handleSearch = (event) => setSearch(event.target.value);
  const handleRoleChange = (event) => setSelectedRole(event.target.value);
  const handlePageSizeChange = (event) => setPageSize(Number(event.target.value));

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const startIndex = currentPage * pageSize;
  const totalPages = Math.ceil(filteredUsers.length / pageSize);

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <span className="navbar-brand">Admin Dashboard</span>
          <div className="navbar-nav">
            <Link to="/Role-List" className="nav-link">
              View Roles
            </Link>
            <Link to="/AddRole" className="nav-link">
              Manage Roles
            </Link>
            <Link to="/Upload" className="nav-link">
              Upload File
            </Link>
            <Link to="/login" className="nav-link text-danger">
              Logout
            </Link>
          </div>
        </div>
      </nav>

      {/* Search and Filter Section */}
      <div className="container mt-4">
        <div className="card p-3 shadow-sm">
          <div className="row g-3 align-items-center">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Search by username or email"
                value={search}
                onChange={handleSearch}
              />
            </div>
            <div className="col-md-4">
              <select
                className="form-select"
                value={selectedRole}
                onChange={handleRoleChange}
              >
                <option value="">All Roles</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.name}>
                    {role.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <select
                className="form-select"
                value={pageSize}
                onChange={handlePageSizeChange}
              >
                {[5, 10, 20, 50].map((size) => (
                  <option key={size} value={size}>
                    {size} per page
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="container mt-4">
        <div className="table-responsive">
          <table className="table table-hover table-bordered">
            <thead>
              <tr>
                {["ID", "Username", "Email", "Role", "Actions"].map((header, index) => (
                  <th key={index}>
                    {header}
                    {index < 3 && (
                      <span
                        className="ms-2"
                        style={{ cursor: "pointer" }}
                        onClick={() => setSortConfig({ key: header.toLowerCase(), direction: "asc" })}
                      >
                        <MdArrowUpward />
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedUsers.slice(startIndex, startIndex + pageSize).map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button className="btn btn-warning btn-sm">Edit</button>
                    <button className="btn btn-danger btn-sm ms-2">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <nav className="mt-4">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 0 && "disabled"}`}>
            <button
              className="page-link"
              onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
            >
              Previous
            </button>
          </li>
          {[...Array(totalPages)].map((_, index) => (
            <li
              key={index}
              className={`page-item ${index === currentPage && "active"}`}
            >
              <button className="page-link" onClick={() => setCurrentPage(index)}>
                {index + 1}
              </button>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages - 1 && "disabled"}`}>
            <button
              className="page-link"
              onClick={() => setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminDashboard;
