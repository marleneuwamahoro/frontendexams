import React from "react";
<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
  rel="stylesheet"
/>

const EditUser = ({ user, roles }) => {
  return (
    <div className="container my-5">
      <div className="bg-primary text-white text-center py-4 rounded shadow-sm">
        <h1 className="display-5">Edit User</h1>
      </div>

      <div className="card mt-4 shadow-sm">
        <div className="card-header bg-light text-center">
          <h2 className="card-title mb-0">Update User Details</h2>
        </div>
        <div className="card-body">
          <form action={`/edit/${user.id}`} method="post">
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  defaultValue={user.username}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  defaultValue={user.email}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  defaultValue={user.password}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  defaultValue={user.firstName}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  defaultValue={user.lastName}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="dob" className="form-label">
                  Date of Birth
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="dob"
                  name="dob"
                  defaultValue={user.dob}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="phone" className="form-label">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="phone"
                  name="phone"
                  defaultValue={user.phone}
                  pattern="[0-9]{10}"
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="role" className="form-label">
                  Role
                </label>
                <select
                  className="form-select"
                  id="role"
                  name="role"
                  required
                >
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
            <button type="submit" className="btn btn-primary w-100 mt-4">
              Update User
            </button>
          </form>
        </div>
      </div>

      <div className="text-center mt-3">
        <a href="/AdminDashboard" className="btn btn-outline-secondary">
          Back to Home
        </a>
      </div>
    </div>
  );
};

export default EditUser;
