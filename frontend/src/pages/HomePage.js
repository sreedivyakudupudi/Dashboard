import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Left - Image */}
        <div style={styles.left}>
          <img
            src="/homep.jpg"
            alt="Admin Portal Illustration"
            style={styles.image}
          />
        </div>

        {/* Right - Text and Buttons */}
        <div style={styles.right}>
          <h1 style={styles.heading}>Welcome to Creater Dashboard</h1>
          <p style={styles.subtext}>Please register to continue</p>
          <div style={styles.buttons}>
            <button style={styles.button} onClick={() => navigate('/admin-login')}>
              Admin Login
            </button>
            <button style={styles.button} onClick={() => navigate('/register')}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #fbd3e9 0%, #bbdefb 100%)', // pinkish to blue
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  container: {
    width: '90%',
    maxWidth: '1100px',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(240, 248, 255, 0.7))',
    backdropFilter: 'blur(10px)', // Apply backdrop blur for modern feel
    WebkitBackdropFilter: 'blur(10px)', // Safari support
    display: 'flex',
    borderRadius: '16px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
    overflow: 'hidden',
    border: '1px solid rgba(255, 255, 255, 0.61)',
  },
  left: {
    flex: 1.2,
    backgroundColor: '#f0f4f8',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '30px',
  },
  image: {
    width: '100%',
    maxWidth: '700px',
    height: 'auto',
  },

right: {
    flex: 1,
    padding: '40px 30px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    background: 'rgba(255, 255, 255, 0.8)', // Light transparency for a soft background
    borderRadius: '16px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Add slight shadow for a clean effect
},

  
    heading: {
        fontSize: '34px',
        fontWeight: 'bold',
        color: '#bd93f9', 
        // color: 'rgba(189, 147, 255, 0.8)',
        // color: '#2c3e50',
        marginBottom: '20px',
        textAlign: 'center', // Centers the text horizontally
      },
      
  subtext: {
    fontSize: '18px',
    color: '#555',
    marginBottom: '30px',
  },
  buttons: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',
  },
  button: {
    padding: '14px 28px',
    fontSize: '16px',
    backgroundColor: '#4a90e2',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  // Button hover effect
  buttonHover: {
    backgroundColor: '#357ABD',
  },
};

export default HomePage;
