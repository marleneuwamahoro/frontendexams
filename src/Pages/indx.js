import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const OnlineJobPortal = () => {
  return (
    <div>
      {/* Header */}
      <header className="bg-primary text-white text-center py-4">
        <h1>Welcome to Our Online Job Portal</h1>
        {/* Navigation Bar */}
        <nav className="bg-dark">
          <ul className="nav justify-content-center py-2">
            <li className="nav-item">
              <a href="/" className="nav-link text-white">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link text-white">
                Login
              </a>
            </li>
            <li className="nav-item">
              <a href="/signup" className="nav-link text-white">
                Sign Up
              </a>
            </li>
            <li className="nav-item">
              <a href="/change-language?lang=en" className="nav-link text-white">
                English
              </a>
            </li>
            <li className="nav-item">
              <a href="/change-language?lang=fr" className="nav-link text-white">
                French
              </a>
            </li>
            <li className="nav-item">
              <a href="/change-language?lang=es" className="nav-link text-white">
                Spanish
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section
        className="d-flex flex-column justify-content-center align-items-center text-center text-white bg-primary py-5"
        style={{
          background: `url('https://example.com/hero-image.jpg') no-repeat center center/cover`,
          height: "50vh",
        }}
      >
        <h2>Your Dream Job Awaits</h2>
        <p>Find and apply for jobs that match your skills and interests.</p>
        <button className="btn btn-warning">Browse Job Listings</button>
      </section>

      {/* Job Listings Section */}
      <section className="container py-5">
        <h2 className="text-center mb-4">Job Listings</h2>
        <div className="row justify-content-center">
          <div className="col-md-3 mb-4">
            <div className="card shadow text-center p-3">
              <h3>Software Engineer</h3>
              <p>Location: Remote</p>
              <p>Company: Tech Innovations</p>
              <button className="btn btn-primary">Apply Now</button>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="card shadow text-center p-3">
              <h3>Project Manager</h3>
              <p>Location: New York, NY</p>
              <p>Company: Business Solutions</p>
              <button className="btn btn-primary">Apply Now</button>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="card shadow text-center p-3">
              <h3>UX Designer</h3>
              <p>Location: San Francisco, CA</p>
              <p>Company: Creative Agency</p>
              <button className="btn btn-primary">Apply Now</button>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="card shadow text-center p-3">
              <h3>Data Analyst</h3>
              <p>Location: San Francisco, CA</p>
              <p>Company: Creative Agency</p>
              <button className="btn btn-primary">Apply Now</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3">
        <p>&copy; 2024 Online Job Portal | All rights reserved</p>
      </footer>
    </div>
  );
};

export default OnlineJobPortal;
