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
    <div style={{ textAlign: 'center', fontFamily: 'Poppins, sans-serif', backgroundColor: '#f9f9f9', padding: '20px' }}>
      <header style={{ background: '#0056b3', color: 'white', padding: '1rem 0' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Create Your Account</h1>
        <nav>
          <ul style={{ listStyle: 'none', display: 'flex', justifyContent: 'center', padding: '0' }}>
            <li style={{ margin: '0 15px' }}><a href="/" style={{ color: 'white', textDecoration: 'none', padding: '10px 15px' }}>Home</a></li>
            <li style={{ margin: '0 15px' }}><a href="/login" style={{ color: 'white', textDecoration: 'none', padding: '10px 15px' }}>Login</a></li>
            <li style={{ margin: '0 15px' }}><a href="/signup" style={{ color: 'white', textDecoration: 'none', padding: '10px 15px' }}>Sign Up</a></li>
          </ul>
        </nav>
      </header>

      <div style={{
        background: 'white', padding: '50px 20px', textAlign: 'center', borderRadius: '8px', margin: '20px auto',
        maxWidth: '600px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Sign Up</h2>

        {errorMessage && <div style={{ color: 'red', marginBottom: '20px' }}>{errorMessage}</div>}
        {successMessage && <div style={{ color: 'green', marginBottom: '20px' }}>{successMessage}</div>}

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div>
              <label htmlFor="username" style={{ fontWeight: 'bold', textAlign: 'left', marginBottom: '5px' }}>Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                style={{
                  padding: '10px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '1rem', width: '100%'
                }}
              />
            </div>
            <div>
              <label htmlFor="email" style={{ fontWeight: 'bold', textAlign: 'left', marginBottom: '5px' }}>Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  padding: '10px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '1rem', width: '100%'
                }}
              />
            </div>

            <div>
              <label htmlFor="password" style={{ fontWeight: 'bold', textAlign: 'left', marginBottom: '5px' }}>Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                style={{
                  padding: '10px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '1rem', width: '100%'
                }}
              />
            </div>

            <div>
              <label htmlFor="firstName" style={{ fontWeight: 'bold', textAlign: 'left', marginBottom: '5px' }}>First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                style={{
                  padding: '10px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '1rem', width: '100%'
                }}
              />
            </div>
            <div>
              <label htmlFor="lastName" style={{ fontWeight: 'bold', textAlign: 'left', marginBottom: '5px' }}>Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                style={{
                  padding: '10px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '1rem', width: '100%'
                }}
              />
            </div>

            <div>
              <label htmlFor="dob" style={{ fontWeight: 'bold', textAlign: 'left', marginBottom: '5px' }}>Date of Birth</label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
                style={{
                  padding: '10px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '1rem', width: '100%'
                }}
              />
            </div>
            <div>
              <label htmlFor="phone" style={{ fontWeight: 'bold', textAlign: 'left', marginBottom: '5px' }}>Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required

                style={{
                  padding: '10px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '1rem', width: '100%'
                }}
              />
            </div>
          </div>

          <button type="submit" style={{
            padding: '10px 30px', background: '#ff5733', color: 'white', border: 'none', borderRadius: '5px',
            fontSize: '1rem', cursor: 'pointer', transition: 'background 0.3s'
          }}>Sign Up</button>
        </form>
        <p>Already have an account? <a href="/login" style={{ color: '#0056b3' }}>Login</a></p>
      </div>

      <footer style={{
        background: '#333', color: 'white', padding: '20px 0', textAlign: 'center'
      }}>
        <p style={{ fontSize: '1rem' }}>&copy; 2024 Online Job Portal | All rights reserved</p>
      </footer>
    </div>
  );
};

export default SignUp;
