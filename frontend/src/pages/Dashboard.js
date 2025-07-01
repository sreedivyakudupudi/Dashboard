



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [savedPosts, setSavedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showRecentActivity, setShowRecentActivity] = useState(false);
  const [showSavedPosts, setShowSavedPosts] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('No token found. Please log in.');
      setLoading(false);
      navigate('/login');
      return;
    }

    axios.get('http://localhost:5000/api/user/dashboard', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        if (err.response && err.response.status === 401) {
          setError('Invalid or expired token. Please log in again.');
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          setError('Failed to load dashboard.');
        }
        setLoading(false);
      });

    axios.get('http://localhost:5000/api/user/saved', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setSavedPosts(res.data.savedPosts);
      })
      .catch(err => {
        console.error('Error fetching saved posts:', err);
      });
  }, [navigate]);
  const navigateToProfile = () => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/profile', { state: { token } });
    } else {
      setError('No token found. Please log in again.');
      navigate('/login');
    }
  };
  const navigateToFeed = () => {
    const token = localStorage.getItem('token');
    token ? navigate('/feed', { state: { token } }) : navigate('/login');
  };

  const navigateToSavedFeeds = () => {
    const token = localStorage.getItem('token');
    token ? navigate('/saved-feeds', { state: { token } }) : navigate('/login');
  };

  const navigateToTwitterFeed = () => {
    const token = localStorage.getItem('token');
    token ? navigate('/twitter-feed', { state: { token } }) : navigate('/login');
  };

  if (loading) return <div className="text-center mt-10 text-gray-600">Loading...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(to right, #f8f9fa, #e0f7fa)',
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      flexDirection: 'column',
      padding: '20px',
    },
    welcomeMessage: {
      fontSize: '32px',
      fontWeight: '700',
      color: '#333',
      textAlign: 'center',
      marginBottom: '20px',
    },
    squareBox: {
      position: 'relative',
      display: 'flex',
      width: '800px',
      minHeight: '500px',
      backgroundColor: '#fff',
      borderRadius: '16px',
      boxShadow: '0 12px 30px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
      flexDirection: 'column',
      paddingBottom: '20px',
    },
    backgroundImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundImage: 'url("/dash.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      filter: 'blur(10px)',
      opacity: 0.5,
      zIndex: 0,
    },
    formSide: {
      zIndex: 1,
      width: '100%',
      padding: '40px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    headerRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
      padding: '0 10px',
    },
    title: {
      fontSize: '26px',
      fontWeight: '600',
      color: '#333',
    },
    label: {
      fontSize: '18px',
      color: '#444',
      fontWeight: '600',
    },
    button: {
      width: '100%',
      maxWidth: '300px',
      padding: '12px',
      fontSize: '16px',
      background: inputFocused
        ? 'linear-gradient(to right, #1e88e5, #8e24aa)'
        : 'linear-gradient(to right, #42a5f5, #7e57c2)',
      color: '#fff',
      fontWeight: '600',
      border: 'none',
      borderRadius: '8px',
      cursor: loading ? 'not-allowed' : 'pointer',
      transition: 'all 0.3s ease-in-out',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
      ...(isHovered ? {
        transform: 'scale(1.03)',
        boxShadow: '0 6px 14px rgba(0, 0, 0, 0.25)',
      } : {}),
    },
    buttonContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '10px',
    },
    scrollBox: {
      maxHeight: '150px',
      overflowY: 'auto',
      padding: '10px',
      marginTop: '10px',
      backgroundColor: '#f9f9f9',
      border: '1px solid #ddd',
      borderRadius: '8px',
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
  };

  return (
    <div style={styles.container}>
      <div style={styles.welcomeMessage}>
        Welcome, {data?.email || 'Guest'}!
      </div>

      <div style={styles.squareBox}>
        <div style={styles.backgroundImage}></div>
        <div style={styles.formSide}>
        <div style={styles.headerRow}>
  <div>
    <h2 style={styles.title}>Dashboard</h2>
    <p style={{ ...styles.label, marginTop: '4px', fontSize: '20px', color: '#555' }}>
     Your Credits: {data?.credits}
    </p>
  </div>
</div>


          {error && <div style={styles.error}>{error}</div>}

          <div style={styles.buttonContainer}>
          <button onClick={navigateToProfile} style={styles.button}
              onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>Go to Profile</button>
            <button onClick={navigateToFeed} style={styles.button}
              onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>Go to Feed</button>
            <button onClick={navigateToSavedFeeds} style={styles.button}
              onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>Saved Feeds</button>
            <button onClick={navigateToTwitterFeed} style={styles.button}
              onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>Twitter Feed</button>
            <button onClick={() => setShowRecentActivity(!showRecentActivity)} style={styles.button}
              onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
              {showRecentActivity ? 'Hide Recent Activity' : 'Show Recent Activity'}
            </button>
            <button onClick={() => setShowSavedPosts(!showSavedPosts)} style={styles.button}
              onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
              {showSavedPosts ? 'Hide Saved Posts' : 'Show Saved Posts'}
            </button>
          </div>

          {showRecentActivity && (
            <div style={styles.scrollBox}>
              <h2 className="text-lg font-medium mb-2 text-gray-700">Recent Activity</h2>
              {data?.recentActivity?.length > 0 ? (
                <ul className="list-disc ml-6 text-sm text-gray-600">
                  {data.recentActivity.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm">No recent activity</p>
              )}
            </div>
          )}

          {showSavedPosts && (
            <div style={styles.scrollBox}>
              <h2 className="text-lg font-medium mb-2 text-gray-700">Saved Posts</h2>
              {savedPosts.length > 0 ? (
  <ul className="list-disc ml-6 text-sm text-gray-600 space-y-2">
    {savedPosts.map((post, index) => (
      <li key={index}>
        <h3 className="font-semibold">
          {post.title ? post.title : post.text ? post.text.slice(0, 100) + '...' : 'Untitled Post'}
        </h3>
        {post.content && <p>{post.content}</p>}
        {post.url && (
          <a
            href={post.url}
            className="text-blue-600 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Go to Post
          </a>
        )}
      </li>
    ))}
  </ul>
) : (
  <p className="text-gray-500 text-sm">No saved posts yet.</p>
)}

              {/* {savedPosts.length > 0 ? (
                <ul className="list-disc ml-6 text-sm text-gray-600 space-y-2">
                  {savedPosts.map((post, index) => (
                    <li key={index}>
                      <h3 className="font-semibold">{post.title}</h3>
                      <p>{post.content}</p>
                      <a href={post.url} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
                        Go to Post
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm">No saved posts yet.</p> */}
              {/* )} */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
