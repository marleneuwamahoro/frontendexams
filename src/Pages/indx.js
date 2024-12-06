import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const index = () => {
  return (
    <div>
      {/* Header with Flexbox */}
      <header
        className="bg-dark text-white py-4 d-flex justify-content-between align-items-center"
        style={{ backgroundColor: "#282c34" }}
      >
        <div className="container d-flex justify-content-between align-items-center w-100">
          <h1 className="mb-0">Welcome to Our Dry cleanner</h1>
          <nav>
            <ul className="list-unstyled d-flex justify-content-center mb-0">
            <li className="mx-3">
              <a href="/" className="text-white bg-dark border-0 text-decoration-none">
                Home
              </a>
            </li>
            <li className="mx-3">
              <a href="/login" className="text-white bg-dark border-0 text-decoration-none">
                Login
              </a>
            </li>
            <li className="mx-3">
              <a href="/signup" className="text-white bg-dark border-0 text-decoration-none">
                Sign Up
              </a>
            </li>            
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section with Flex and Online Dry Cleaner Image */}
      <section
        className="d-flex flex-column justify-content-center align-items-center text-center text-white"
        style={{
          backgroundColor: 'green', // Example Dry Cleaning Image
          height: "60vh",
          padding: "0 20px",
        }}
      >
        <h2>Your Journey Begins Here</h2>
        <p>Explore our offerings and discover something new every day.</p>
        <button className="btn btn-warning">Get Started</button>
      </section>

      {/* About Section */}
      <section className="text-center py-5">
        <h2>About Us</h2>
        <p>
          We are a leading company in our industry, offering top-notch products and services.
          Our mission is to deliver quality and value to our customers.
        </p>
      </section>

      {/* Features Section */}
      <section className="bg-light py-5">
        <h2 className="text-center">Our Features</h2>
        <div className="d-flex justify-content-around flex-wrap mt-4">
          <div className="feature-item text-center p-4 mx-2 my-3">
            <i className="fas fa-cog fa-3x" style={{ color: "#ff5733" }}></i>
            <h3>Feature 1</h3>
            <p>Short description of Feature 1</p>
          </div>
          <div className="feature-item text-center p-4 mx-2 my-3">
            <i className="fas fa-star fa-3x" style={{ color: "#ff5733" }}></i>
            <h3>Feature 2</h3>
            <p>Short description of Feature 2</p>
          </div>
          <div className="feature-item text-center p-4 mx-2 my-3">
            <i className="fas fa-shield-alt fa-3x" style={{ color: "#ff5733" }}></i>
            <h3>Feature 3</h3>
            <p>Short description of Feature 3</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="bg-dark text-white py-4 text-center"
        style={{ backgroundColor: "#282c34" }}
      >
        <div className="social-icons">
          <button className="mx-3" style={{ color: "white", background: "none", border: "none" }}>
            <FaFacebookF size={30} />
          </button>
          <button className="mx-3" style={{ color: "white", background: "none", border: "none" }}>
            <FaTwitter size={30} />
          </button>
          <button className="mx-3" style={{ color: "white", background: "none", border: "none" }}>
            <FaLinkedinIn size={30} />
          </button>
        </div>
        <p>&copy; 2024 Dry cleanner Ltd | All rights reserved</p>
      </footer>
    </div>
  );
};

export default index;
