// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Profile = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     age: '',
//     occupation: '',
//     city: '',
//     phoneNumber: '',
//   });

//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const token = localStorage.getItem('token');

//         // Fetch profile details
//         const profileRes = await axios.get('http://localhost:5000/api/user/profile', {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         // Fetch user info like username/email
//         const userRes = await axios.get('http://localhost:5000/api/auth/user', {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         setFormData({
//           username: userRes.data.username,
//           email: userRes.data.email,
//           age: profileRes.data.age || '',
//           occupation: profileRes.data.occupation || '',
//           city: profileRes.data.city || '',
//           phoneNumber: profileRes.data.phoneNumber || '',
//         });
//       } catch (err) {
//         console.error('Error fetching data:', err);
//         setMessage('Failed to load profile.');
//       }
//     };

//     fetchProfile();
//   }, []);

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage('');

//     try {
//       const token = localStorage.getItem('token');
//       const { age, occupation, city, phoneNumber } = formData;

//       const res = await axios.put(
//         'http://localhost:5000/api/user/profile',
//         { age, occupation, city, phoneNumber },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setMessage(res.data.message);
//     } catch (err) {
//       console.error('Error updating profile:', err);
//       setMessage('Failed to update profile.');
//     }
//   };

//   return (
//     <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
//       <h2>User Profile</h2>
//       {message && <p>{message}</p>}

//       <form onSubmit={handleSubmit}>
//         <label>Username:</label>
//         <input name="username" value={formData.username} readOnly /><br />

//         <label>Email:</label>
//         <input name="email" type="email" value={formData.email} readOnly /><br />

//         <label>Age:</label>
//         <input name="age" type="number" value={formData.age} onChange={handleChange} /><br />

//         <label>Occupation:</label>
//         <input name="occupation" value={formData.occupation} onChange={handleChange} /><br />

//         <label>City:</label>
//         <input name="city" value={formData.city} onChange={handleChange} /><br />

//         <label>Phone Number:</label>
//         <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} /><br /><br />

//         <button type="submit">Update Profile</button>
//       </form>
//     </div>
//   );
// };

// export default Profile;


import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    age: '',
    occupation: '',
    city: '',
    phoneNumber: '',
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');

        const profileRes = await axios.get('http://localhost:5000/api/user/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userRes = await axios.get('http://localhost:5000/api/auth/user', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const profileData = profileRes.data || {};
        setFormData({
          username: userRes.data.username || '',
          email: userRes.data.email || '',
          age: profileData.age || '',
          occupation: profileData.occupation || '',
          city: profileData.city || '',
          phoneNumber: profileData.phoneNumber || '',
        });
      } catch (err) {
        console.error('Error fetching data:', err);
        setMessage('Failed to load profile.');
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      const { age, occupation, city, phoneNumber } = formData;

      const res = await axios.put(
        'http://localhost:5000/api/user/profile',
        { age, occupation, city, phoneNumber },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage(res.data.message);
    } catch (err) {
      console.error('Error updating profile:', err);
      setMessage('Failed to update profile.');
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Left Section: Optional Illustration */}
        <div style={styles.left}>
          <img src="/homep.jpg" alt="Profile Illustration" style={styles.image} />
        </div>

        {/* Right Section: Form */}
        <div style={styles.right}>
          <h2 style={styles.heading}>User Profile</h2>
          {message && <p style={{ color: 'green', fontWeight: 'bold' }}>{message}</p>}

          <form onSubmit={handleSubmit}>
            <label>Username:</label>
            <input name="username" value={formData.username} readOnly style={styles.input} />

            <label>Email:</label>
            <input name="email" type="email" value={formData.email} readOnly style={styles.input} />

            <label>Age:</label>
            <input name="age" type="number" value={formData.age} onChange={handleChange} style={styles.input} />

            <label>Occupation:</label>
            <input name="occupation" value={formData.occupation} onChange={handleChange} style={styles.input} />

            <label>City:</label>
            <input name="city" value={formData.city} onChange={handleChange} style={styles.input} />

            <label>Phone Number:</label>
            <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} style={styles.input} />

            <br />
            <button type="submit" style={styles.button}>Update Profile</button>
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #fbd3e9 0%, #bbdefb 100%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  container: {
    height:'600px',
    width: '90%',
    maxWidth: '1100px',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(240, 248, 255, 0.7))',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
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
    padding: '0',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    // maxWidth: '700px',
    // height: 'auto',
  },
  right: {
    flex: 1,
    padding: '40px 30px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    background: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '16px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    fontSize: '30px',
    fontWeight: 'bold',
    color: '#bd93f9',
    marginBottom: '20px',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ccc',
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
};

export default Profile;
