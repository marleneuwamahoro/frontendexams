import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MdArrowUpward, MdArrowDownward } from 'react-icons/md'; // Import the icons

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10); // Number of users per page
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [roles, setRoles] = useState([]); // Roles state
  const [selectedRole, setSelectedRole] = useState(''); // Selected role for filtering
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: 'username', direction: 'asc' });

  // Fetch all users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://backendapps-0d3a0920208f.herokuapp.com/users');
        console.log('Fetched Users:', response.data);

        let usersData = Array.isArray(response.data) ? response.data : response.data.users;

        if (usersData) {
          const filteredUsers = usersData.filter(user => user.role !== 'administrator');
          setUsers(filteredUsers);
          setFilteredUsers(filteredUsers);
        } else {
          console.error('Response data does not contain users:', response.data);
        }
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
  }, []);

  // Fetch roles from the backend
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get('https://backendapps-0d3a0920208f.herokuapp.com/roles'); // Adjust endpoint as needed
        setRoles(response.data); // Assuming response.data is an array of roles
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };
    fetchRoles();
  }, []);

  // Update filtered users based on search input
  useEffect(() => {
    let filtered = users.filter(
      (user) =>
        user.username.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );

    // Apply role filter if a role is selected
    if (selectedRole) {
      filtered = filtered.filter(user => user.role === selectedRole);
    }

    setFilteredUsers(filtered);
    setCurrentPage(0); // Reset to first page when search or role filter changes
  }, [search, users, selectedRole]);

  // Handle search input change
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  // Handle role filter change
  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  // Pagination logic
  const startIndex = currentPage * pageSize;
  const totalPages = Math.ceil(filteredUsers.length / pageSize);

  // Handle page size change
  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value)); // Update page size based on selected value
    setCurrentPage(0); // Reset to first page
  };

  // Handle delete user
  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      try {
        await axios.delete(`https://backendapps-0d3a0920208f.herokuapp.com/delete/${userId}`);
        setFilteredUsers(filteredUsers.filter((user) => user.id !== userId));
      } catch (err) {
        alert('Failed to delete user. Please try again.');
      }
    }
  };

  // Open edit modal
  const openEditModal = (user) => {
    setSelectedUser(user); // Set the selected user data
    setIsModalOpen(true); // Open the modal
  };

  // Close edit modal
  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  // Handle user update
  const handleUserUpdate = async (event) => {
    event.preventDefault();

    try {
      await axios.post(`https://backendapps-0d3a0920208f.herokuapp.com/edit/${selectedUser.id}`, selectedUser);
      setUsers(users.map(user => (user.id === selectedUser.id ? selectedUser : user))); // Update the users list
      closeModal(); // Close the modal
    } catch (error) {
      console.error('Failed to update user:', error);
      alert('Failed to update user. Please try again.');
    }
  };

  // Handle input change in the modal
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSelectedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Sorting logic
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedUsers = filteredUsers.sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  return (
    <div>
      {/* Header Section with Logout */}
      <header className="bg-primary text-white py-4 text-center position-relative">
        <Link to="/Role-List" className="btn btn-secondary" style={{ fontSize: '23px', width: 150 }}>
          ViewRole
        </Link>
        &nbsp;&nbsp;
        <Link to="/AddRole" className="btn btn-secondary" style={{ fontSize: '23px' }}>
          Role manage
        </Link>
        &nbsp;&nbsp;
        <Link to="/Upload" className="btn btn-secondary" style={{ fontSize: '23px' }}>
          Upload file
        </Link>
        &nbsp;&nbsp;
        <Link to="/login" className="btn btn-danger" style={{ fontSize: '23px' }}>
          Logout
        </Link>
      </header>

      {/* Additional Header with same link */}
      <header className="bg-secondary text-white py-3 text-center">
        <h2>Welcome Back, Admin!</h2>
      </header>
      <div className="d-flex align-items-center justify-content-start mt-5 mb-3 w-75 mx-auto">
              {/* Search Section */}
              <input
                type="text"
                className="form-control me-3 w-25"
                placeholder="Search by username or email"
                value={search}
                onChange={handleSearch}
              />

              {/* Role Filter Section */}
              <div className="d-flex align-items-center me-3">
                <label htmlFor="roleFilter" className="form-label mb-0 me-2">Filter by Role:</label>
                <select
                  id="roleFilter"
                  className="form-select w-auto"
                  value={selectedRole}
                  onChange={handleRoleChange}
                >
                  <option value="">All</option>
                  {roles.map((role) => (
                    <option key={role.id} value={role.name}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Page Size Selector */}
              <div className="d-flex align-items-center">
                <label htmlFor="pageSize" className="form-label mb-0 me-2">Users per page:</label>
                <select
                  id="pageSize"
                  className="form-select w-auto"
                  value={pageSize}
                  onChange={handlePageSizeChange}
                >
                  <option value={1}>1</option>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                </select>
              </div>
            </div>


      {/* Table Section */}
      <table className="table table-striped table-bordered my-4" style={{ width: '80%', marginLeft: '10%' }}>
      <thead>
          <tr>
            <th onClick={() => requestSort('id')}>
              ID
              {sortConfig.key === 'id' && (
                sortConfig.direction === 'ascending' ? 
                  <MdArrowUpward /> : 
                  <MdArrowDownward />
              )}
            </th>
            <th onClick={() => requestSort('username')}>
              Username
              {sortConfig.key === 'username' && (
                sortConfig.direction === 'ascending' ? 
                  <MdArrowUpward /> : 
                  <MdArrowDownward />
              )}
            </th>
            <th onClick={() => requestSort('email')}>
              Email
              {sortConfig.key === 'email' && (
                sortConfig.direction === 'ascending' ? 
                  <MdArrowUpward /> : 
                  <MdArrowDownward />
              )}
            </th>
            <th onClick={() => requestSort('firstName')}>
              First Name
              {sortConfig.key === 'firstName' && (
                sortConfig.direction === 'ascending' ? 
                  <MdArrowUpward /> : 
                  <MdArrowDownward />
              )}
            </th>
            <th onClick={() => requestSort('lastName')}>
              Last Name
              {sortConfig.key === 'lastName' && (
                sortConfig.direction === 'ascending' ? 
                  <MdArrowUpward /> : 
                  <MdArrowDownward />
              )}
            </th>
            <th onClick={() => requestSort('dob')}>
              Date of Birth
              {sortConfig.key === 'dob' && (
                sortConfig.direction === 'ascending' ? 
                  <MdArrowUpward /> : 
                  <MdArrowDownward />
              )}
            </th>
            <th onClick={() => requestSort('phone')}>
              Phone Number
              {sortConfig.key === 'phone' && (
                sortConfig.direction === 'ascending' ? 
                  <MdArrowUpward /> : 
                  <MdArrowDownward />
              )}
            </th>
            <th onClick={() => requestSort('role')}>
              Role
              {sortConfig.key === 'role' && (
                sortConfig.direction === 'ascending' ? 
                  <MdArrowUpward /> : 
                  <MdArrowDownward />
              )}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(sortedUsers) && sortedUsers.length > 0 ? (
            sortedUsers
              .slice(startIndex, startIndex + pageSize)
              .map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.dob}</td>
                  <td>{user.phone}</td>
                  <td>{user.role}</td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() => openEditModal(user)}
                    >
                      Edit
                    </button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button
                      className="btn btn-danger ml-2"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
          ) : (
            <tr>
              <td colSpan="6">No users found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* No Users Message */}
      {filteredUsers.length === 0 && (
        <div className="text-center my-4">No users found.</div>
      )}

      {/* Pagination Section */}
      {filteredUsers.length > pageSize && (
        <div className="pagination-container d-flex justify-content-center align-items-center my-4">
          {currentPage > 0 && (
            <button
              className="pagination-button btn btn-secondary me-2"
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </button>
          )}

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`pagination-number btn ${
                index === currentPage ? 'btn-primary' : 'btn-outline-primary'
              } mx-1`}
              onClick={() => setCurrentPage(index)}
            >
              {index + 1}
            </button>
          ))}

          {currentPage < totalPages - 1 && (
            <button
              className="pagination-button btn btn-secondary ms-2"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          )}
        </div>
      )}

      {/* Edit User Modal */}
      {isModalOpen && selectedUser && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit User</h5>
                <button
                  type="button"
                  className="close"
                  onClick={closeModal}
                >
                  &times;
                </button>
              </div>
              <form onSubmit={handleUserUpdate}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      className="form-control"
                      value={selectedUser.username}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      value={selectedUser.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="form-control"
                      value={selectedUser.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="form-control"
                      value={selectedUser.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="dob" className="form-label">Date of Birth</label>
                    <input
                      type="date"
                      id="dob"
                      name="dob"
                      className="form-control"
                      value={selectedUser.dob}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="form-control"
                      value={selectedUser.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Role</label>
                    <select
                      name="role"
                      className="form-control"
                      value={selectedUser.role}
                      onChange={handleInputChange}
                      required
                    >
                      {roles.map((role) => (
                        <option key={role.id} value={role.name}>
                          {role.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={closeModal}>
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
