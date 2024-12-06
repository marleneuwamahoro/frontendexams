import React, { useState } from 'react';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    dob: '',
    phone: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, firstName, lastName, dob, phone } = formData;
    if (!username || !email || !password || !firstName || !lastName || !dob || !phone) {
      setErrorMessage('Please fill out all fields.');
    } else {
      setErrorMessage('');
      try {
        const response = await fetch('https://backendapps-0d3a0920208f.herokuapp.com/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        if (!response.ok) {
          throw new Error('Signup failed');
        }

        const data = await response.json();
        setSuccessMessage('User registered successfully!');
        console.log(data);
      } catch (error) {
        setErrorMessage(error.message);
      }
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f0f4f8', padding: '40px 0' }}>
      {/* Header Section */}
      <header style={{ background: '#0056b3', color: '#fff', padding: '20px 0' }}>
        <h1 style={{ textAlign: 'center', fontSize: '2.5rem' }}>Create Your Account</h1>
        <nav>
          <ul style={{ listStyle: 'none', display: 'flex', justifyContent: 'center', padding: '0' }}>
            <li style={{ margin: '0 20px' }}>
              <a href="/" style={{ color: 'white', textDecoration: 'none', fontSize: '1.2rem' }}>Home</a>
            </li>
            <li style={{ margin: '0 20px' }}>
              <a href="/login" style={{ color: 'white', textDecoration: 'none', fontSize: '1.2rem' }}>Login</a>
            </li>
            <li style={{ margin: '0 20px' }}>
              <a href="/signup" style={{ color: 'white', textDecoration: 'none', fontSize: '1.2rem' }}>Sign Up</a>
            </li>
          </ul>
        </nav>
      </header>

      {/* SignUp Form Section */}
      <div
        style={{
          background: '#fff',
          borderRadius: '8px',
          margin: '40px auto',
          padding: '40px 30px',
          boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
          maxWidth: '500px',
        }}
      >
        <h2 style={{ textAlign: 'center', fontSize: '2rem', color: '#333', marginBottom: '30px' }}>Sign Up</h2>

        {/* Error and Success Messages */}
        {errorMessage && <div style={{ color: 'red', marginBottom: '20px', textAlign: 'center' }}>{errorMessage}</div>}
        {successMessage && <div style={{ color: 'green', marginBottom: '20px', textAlign: 'center' }}>{successMessage}</div>}

        {/* SignUp Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px', marginBottom: '20px' }}>
            <div>
              <label htmlFor="username" style={{ fontWeight: 'bold', marginBottom: '8px', display: 'block' }}>Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                style={{
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  width: '100%',
                }}
              />
            </div>

            <div>
              <label htmlFor="email" style={{ fontWeight: 'bold', marginBottom: '8px', display: 'block' }}>Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  width: '100%',
                }}
              />
            </div>

            <div>
              <label htmlFor="password" style={{ fontWeight: 'bold', marginBottom: '8px', display: 'block' }}>Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                style={{
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  width: '100%',
                }}
              />
            </div>

            <div>
              <label htmlFor="firstName" style={{ fontWeight: 'bold', marginBottom: '8px', display: 'block' }}>First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                style={{
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  width: '100%',
                }}
              />
            </div>

            <div>
              <label htmlFor="lastName" style={{ fontWeight: 'bold', marginBottom: '8px', display: 'block' }}>Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                style={{
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  width: '100%',
                }}
              />
            </div>

            <div>
              <label htmlFor="dob" style={{ fontWeight: 'bold', marginBottom: '8px', display: 'block' }}>Date of Birth</label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
                style={{
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  width: '100%',
                }}
              />
            </div>

            <div>
              <label htmlFor="phone" style={{ fontWeight: 'bold', marginBottom: '8px', display: 'block' }}>Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                style={{
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  width: '100%',
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            style={{
              padding: '14px 30px',
              backgroundColor: '#0056b3',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '1rem',
              cursor: 'pointer',
              width: '100%',
            }}
          >
            Sign Up
          </button>
        </form>

        <p style={{ marginTop: '20px' }}>
          Already have an account? <a href="/login" style={{ color: '#0056b3' }}>Login</a>
        </p>
      </div>

      {/* Footer Section */}
      <footer style={{ background: '#333', color: '#fff', padding: '30px 0', textAlign: 'center' }}>
        <p style={{ fontSize: '1rem' }}>&copy; 2024 Online Job Portal | All rights reserved</p>
      </footer>
    </div>
  );
};

export default SignUp;
