




import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);
      console.log(response.data);
      alert('Registration successful!');
      navigate('/login');
    } catch (err) {
      setError('Error during registration. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(to right, #f8f9fa, #e0f7fa)',
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    },
    squareBox: {
      display: 'flex',
      width: '800px',
      height: '500px',
      backgroundColor: '#fff',
      borderRadius: '16px',
      boxShadow: '0 12px 30px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
    },
    imageSide: {
      width: '50%',
      backgroundColor: '#f0f0f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    formSide: {
      width: '50%',
      padding: '40px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    title: {
      fontSize: '26px',
      fontWeight: '600',
      textAlign: 'center',
      marginBottom: '20px',
      color: '#333',
    },
    label: {
      fontSize: '14px',
      color: '#444',
      marginBottom: '6px',
      display: 'block',
    },
    input: {
      width: '100%',
      padding: '10px 12px',
      marginBottom: '16px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      fontSize: '14px',
      outline: 'none',
    },
    button: {
      width: '100%',
      padding: '12px',
      background: inputFocused
        ? 'linear-gradient(to right, #1e88e5, #8e24aa)'
        : 'linear-gradient(to right, #42a5f5, #7e57c2)',
      color: '#fff',
      fontWeight: '600',
      border: 'none',
      borderRadius: '8px',
      cursor: loading ? 'not-allowed' : 'pointer',
      fontSize: '16px',
      transition: 'all 0.3s ease-in-out',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
      ...(isHovered ? {
        transform: 'scale(1.03)',
        boxShadow: '0 6px 14px rgba(0, 0, 0, 0.25)'
      } : {}),
    },
    error: {
      backgroundColor: '#ffebee',
      color: '#c62828',
      textAlign: 'center',
      padding: '10px',
      borderRadius: '6px',
      marginBottom: '15px',
      fontSize: '14px',
    },
    footer: {
      textAlign: 'center',
      fontSize: '14px',
      marginTop: '16px',
      color: '#666',
    },
    link: {
      color: '#007bff',
      textDecoration: 'none',
      fontWeight: '500',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.squareBox}>
        <div style={styles.imageSide}>
          <img src="/girl.jpg" alt="Girl" style={styles.image} />
        </div>
        <div style={styles.formSide}>
          <h2 style={styles.title}>Create an Account</h2>

          {error && <div style={styles.error}>{error}</div>}

          <form onSubmit={handleSubmit}>
            <label htmlFor="username" style={styles.label}>Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              required
              style={styles.input}
            />

            <label htmlFor="email" style={styles.label}>Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              required
              style={styles.input}
            />

            <label htmlFor="password" style={styles.label}>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              required
              style={styles.input}
            />

            <button
              type="submit"
              disabled={loading}
              style={styles.button}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>

          <p style={styles.footer}>
            Already have an account?{' '}
            <a href="/login" style={styles.link}>Login here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
