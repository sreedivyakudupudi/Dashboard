// AdminSavedPosts.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminSavedPosts() {
  const [savedPostsData, setSavedPostsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token] = useState(localStorage.getItem('token'));
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    if (!token) {
      setError('No token found. Please login.');
      setLoading(false);
      return;
    }

    const fetchSavedPosts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/saved-posts', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSavedPostsData(res.data);
      } catch (err) {
        setError('Failed to fetch saved posts');
      }
    };

    fetchSavedPosts();
    setLoading(false);
  }, [token]);

  const handleSelectUser = (userId) => {
    setSelectedUserId(prev => (prev === userId ? null : userId));
  };

  const styles = {
    container: {
      padding: '40px',
      background: 'linear-gradient(to right, #f8f9fa, #e0f7fa)',
      minHeight: '100vh',
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    },
    userCard: {
      border: '1px solid #e0e0e0',
      padding: '20px',
      borderRadius: '12px',
      marginBottom: '20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      cursor: 'pointer',
      transition: '0.3s ease',
    },
    userTitle: {
      fontSize: '18px',
      fontWeight: '600',
      marginBottom: '8px',
      color: '#333',
    },
    postCard: {
      border: '1px solid #e0e0e0',
      padding: '16px',
      marginBottom: '10px',
      borderRadius: '10px',
      backgroundColor: '#fff',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    },
    postTitle: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#2196f3',
    },
    postContent: {
      fontSize: '14px',
      color: '#777',
      marginTop: '8px',
    },
    button: {
      padding: '8px 15px',
      borderRadius: '6px',
      cursor: 'pointer',
      backgroundColor: '#3498db',
      color: 'white',
      border: 'none',
      marginTop: '20px',
    },
    error: {
      color: '#c62828',
      backgroundColor: '#ffebee',
      padding: '12px',
      borderRadius: '8px',
      marginBottom: '15px',
      fontSize: '14px',
    },
  };

  if (loading) return <div style={{ textAlign: 'center' }}>Loading...</div>;
  if (error) return <div style={styles.error}>{error}</div>;

  return (
    <div style={styles.container}>
      <h1 className="text-xl font-bold mb-4">Admin: Saved Posts</h1>
      {savedPostsData.length === 0 ? (
        <p>No saved posts found for any users.</p>
      ) : (
        savedPostsData.map((userPosts, index) => (
          <div key={userPosts.userId} style={styles.userCard}>
            <div onClick={() => handleSelectUser(userPosts.userId)}>
              <h2 style={styles.userTitle}>User {index + 1} Saved Posts</h2>
              {selectedUserId === userPosts.userId && (
                <div>
                  {userPosts.savedPosts.length === 0 ? (
                    <p>No saved posts.</p>
                  ) : (
                    userPosts.savedPosts.map(post => (
                      <div key={post._id} style={styles.postCard}>
                        <h3 style={styles.postTitle}>{post.title}</h3>
                        <p style={styles.postContent}>{post.content}</p>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        ))
      )}
      <button style={styles.button}>Go Back</button>
    </div>
  );
}

export default AdminSavedPosts;
