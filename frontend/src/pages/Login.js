

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      const { role, credits, message } = res.data;
      localStorage.setItem('role', role);
    localStorage.setItem('credits', credits);
      localStorage.setItem('token', res.data.token);
      alert(message); 
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
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
          <img src="/logiii.jpg" alt="Girl" style={styles.image} />
        </div>
        <div style={styles.formSide}>
          <h2 style={styles.title}>Welcome Back</h2>

          {error && <div style={styles.error}>{error}</div>}

          <form onSubmit={handleLogin}>
            <label htmlFor="email" style={styles.label}>Email Address</label>
            <input
              type="email"
              id="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              style={styles.input}
              required
            />

            <label htmlFor="password" style={styles.label}>Password</label>
            <input
              type="password"
              id="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              style={styles.input}
              required
            />

            <button
              type="submit"
              disabled={loading}
              style={styles.button}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {loading ? 'Logging In...' : 'Login'}
            </button>
          </form>

          <p style={styles.footer}>
            Don't have an account?{' '}
            <a href="/register" style={styles.link}>Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
