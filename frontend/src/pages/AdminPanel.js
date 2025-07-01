

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token] = useState(localStorage.getItem('token'));
  const [error, setError] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [userCredits, setUserCredits] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setError('No token found. Please login.');
      setLoading(false);
      return;
    }

    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/users', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const usersWithActivity = await Promise.all(res.data.map(async (user) => {
          const activityRes = await axios.get(
            `http://localhost:5000/api/admin/user/${user._id}/recent-activity`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          return { ...user, recentActivity: activityRes.data };
        }));

        setUsers(usersWithActivity);
      } catch (err) {
        setError('Failed to fetch users or their activities');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  const handleCreditChange = async (userId, newCredit) => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/user/${userId}/credits`,
        { credits: newCredit },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers(users.map(user =>
        user._id === userId ? { ...user, credits: newCredit } : user
      ));
      alert('Credits updated successfully');
    } catch (err) {
      alert('Failed to update credits');
    }
  };

  const handleDeleteUser = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/admin/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers(users.filter(user => user._id !== userId));
      alert('User deleted successfully');
    } catch (err) {
      alert('Failed to delete user');
    }
  };

  const handleSelectUser = (userId) => {
    setSelectedUserId(prev => (prev === userId ? null : userId));
  };

  const handleViewSavedPosts = () => {
    navigate('/adminsaved-posts');
  };

  if (loading) return <div style={{ textAlign: 'center' }}>Loading users...</div>;
  if (error) return <div style={{ color: '#c62828', backgroundColor: '#ffebee', padding: '12px', borderRadius: '8px', marginBottom: '15px' }}>{error}</div>;

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '40px',
        minHeight: '100vh',
        backgroundImage: `url('/user1.avif')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
    <div
  style={{
    width: '100%',
    maxWidth: '900px',
    backgroundColor: '#f0f8ff', // Light blue background
    borderRadius: '16px',
    padding: '30px',
    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.2)',
    color: '#1a1a1a', // Dark text for contrast
  }}
>


        <h1 style={{ fontSize: '28px', fontWeight: '600', marginBottom: '20px' }}>Admin Dashboard</h1>

        {users.map((user, idx) => (
          <div key={user._id} style={{ border: '1px solid #e0e0e0', padding: '20px', borderRadius: '12px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <div className="flex justify-between items-center">
              <button
                onClick={() => handleSelectUser(user._id)}
                style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: '#333', cursor: 'pointer' }}
              >
                User {idx + 1}
              </button>
              <button
                style={{ marginRight: '8px', padding: '6px 10px', fontSize: '14px', border: 'none', borderRadius: '6px', cursor: 'pointer', backgroundColor: '#f44336', color: 'white' }}
                onClick={() => handleDeleteUser(user._id)}
              >
                Delete
              </button>
            </div>

            <p style={{ fontSize: '14px', color: '#777' }}>{user.email}</p>

            {selectedUserId === user._id && (
              <div style={{ marginTop: '15px' }}>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Credits:</strong> {user.credits}</p>
                <p><strong>Last Login:</strong> {user.lastLoginDate ? new Date(user.lastLoginDate).toLocaleString() : 'Never'}</p>

                <div style={{ marginTop: '10px' }}>
                  <strong>Recent Activity:</strong>
                  {user.recentActivity?.length > 0 ? (
                    user.recentActivity.slice(-5).reverse().map((act, i) => (
                      <div key={i} style={{ background: '#f9f9f9', padding: '12px', borderRadius: '8px', marginTop: '8px', fontSize: '13px', color: '#333' }}>
                        {act}
                        <div style={{ fontSize: '11px', color: '#999', marginTop: '4px' }}>
                          {new Date().toLocaleString()}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p style={{ fontStyle: 'italic', color: '#aaa' }}>No activity</p>
                  )}
                </div>

                <div style={{ marginTop: '15px' }}>
                  <input
                    type="number"
                    value={userCredits[user._id] || user.credits}
                    onChange={(e) => setUserCredits({ ...userCredits, [user._id]: e.target.value })}
                    style={{ border: '1px solid #ccc', borderRadius: '6px', padding: '6px', width: '100px', marginRight: '10px' }}
                  />
                  <button
                    style={{ marginRight: '8px', padding: '6px 10px', fontSize: '14px', border: 'none', borderRadius: '6px', cursor: 'pointer', backgroundColor: '#2196f3', color: 'white' }}
                    onClick={() => handleCreditChange(user._id, userCredits[user._id])}
                  >
                    Update Credits
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        <button
          onClick={handleViewSavedPosts}
          style={{
            padding: '10px 20px',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '20px',
          }}
        >
          View Saved Posts
        </button>
      </div>
    </div>
  );
}

export default AdminPanel;
