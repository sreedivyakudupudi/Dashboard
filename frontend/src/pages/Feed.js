



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function Feed() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const token = state?.token || localStorage.getItem('token');

  const [redditPosts, setRedditPosts] = useState([]);
  const [twitterPosts, setTwitterPosts] = useState([]);
  const [linkedinPosts, setLinkedinPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      setError('No token found. Redirecting to login...');
      setLoading(false);
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    const config = { headers: { Authorization: `Bearer ${token}` } };

    const fetchPostsAndActivity = async () => {
      try {
        const [redditRes, dashboardRes] = await Promise.all([
          axios.get('http://localhost:5000/api/feed/reddit', config),
          axios.get('http://localhost:5000/api/user/dashboard', config),
        ]);

        setRedditPosts(redditRes.data);
        setSavedPosts(dashboardRes.data.savedPosts || []);
        setRecentActivity(dashboardRes.data.recentActivity || []);
      } catch (err) {
        console.error('Error fetching posts:', err);
        const msg = err?.response?.data?.error || err?.message || 'Unknown error';
        setError(`Failed to load posts. Please try again. Error: ${msg}`);
      } finally {
        setLoading(false);
      }
    };

    fetchPostsAndActivity();
  }, [token, navigate]);

  const isPostSaved = (post) => {
    if (!post) return false;
    return savedPosts.some(saved =>
      (saved?._id && post._id && saved._id === post._id) ||
      (saved?.url && post.url && saved.url === post.url)
    );
  };

  const handleSave = async (post) => {
    if (!token) return alert('You must be logged in to save posts.');
    if (isPostSaved(post)) return alert('You have already saved this post.');

    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      await axios.post('http://localhost:5000/api/user/save', { post }, config);
      setSavedPosts((prev) => [...prev, post]);
      alert('Post saved and 2 credits earned!');
    } catch (err) {
      alert('Failed to save post. Please try again.');
      console.error('Error saving post:', err);
    }
  };

  const handleReport = (post) => alert(`Reported post: "${post.title}"`);

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url)
      .then(() => alert('Link copied to clipboard!'))
      .catch(() => alert('Failed to copy link.'));
  };

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      padding: '40px',
      background: 'linear-gradient(to right, #f8f9fa, #e0f7fa)',
      minHeight: '100vh',
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    },
    contentBox: {
      width: '100%',
      maxWidth: '900px',
      backgroundColor: '#fff',
      borderRadius: '16px',
      padding: '30px',
      boxShadow: '0 12px 30px rgba(0, 0, 0, 0.1)',
    },
    heading: {
      fontSize: '28px',
      fontWeight: '600',
      color: '#333',
      marginBottom: '20px',
    },
    subHeading: {
      fontSize: '20px',
      fontWeight: '500',
      color: '#444',
      marginTop: '30px',
      marginBottom: '10px',
    },
    post: {
      border: '1px solid #e0e0e0',
      padding: '15px',
      borderRadius: '8px',
      marginBottom: '15px',
      boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
    },
    postTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '5px',
    },
    postSource: {
      fontSize: '12px',
      color: '#777',
    },
    link: {
      color: '#1e88e5',
      textDecoration: 'underline',
    },
    button: {
      marginRight: '8px',
      padding: '6px 10px',
      fontSize: '14px',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
    },
    save: {
      backgroundColor: '#4caf50',
      color: 'white',
    },
    saved: {
      backgroundColor: '#bdbdbd',
      color: 'white',
      cursor: 'not-allowed',
    },
    report: {
      backgroundColor: '#f44336',
      color: 'white',
    },
    copy: {
      backgroundColor: '#607d8b',
      color: 'white',
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

  // const renderPosts = (posts, label) => (
  //   <>
  //     <h2 style={styles.subHeading}>{label}</h2>
  //     {posts?.length > 0 ? (
  //       posts.map((post, i) => (
  //         <div key={post.url || i} style={styles.post}>
  //           <div style={styles.postTitle}>{post.title}</div>
  //           <div style={styles.postSource}>{post.source}</div>
  //           <a href={post.url} target="_blank" rel="noreferrer" style={styles.link}>
  //             View
  const renderPosts = (posts, label) => (
    <>
      <h2 style={styles.subHeading}>{label}</h2>
      {posts?.length > 0 ? (
        posts.map((post, i) => (
          <div key={post.url || i} style={styles.post}>
            <div style={styles.postTitle}>{post.title}</div>
            <div style={styles.postSource}>{post.source}</div>
            <a 
              href={post.url} 
              target="_blank" 
              rel="noreferrer" 
              style={{ ...styles.button, marginTop: '10px', textAlign: 'center', display: 'inline-block' }}
            >
              View Post
            </a>
            <div className="mt-2">
              <button
                style={{
                  ...styles.button,
                  ...(isPostSaved(post) ? styles.saved : styles.save),
                }}
                onClick={() => handleSave(post)}
                disabled={isPostSaved(post)}
              >
                {isPostSaved(post) ? 'Already Saved' : 'Save'}
              </button>
              <button style={{ ...styles.button, ...styles.report }} onClick={() => handleReport(post)}>
                Report
              </button>
              <button style={{ ...styles.button, ...styles.copy }} onClick={() => handleCopy(post.url)}>
                Copy Link
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No posts available.</p>
      )}
    </>
  );

  const renderRecentActivity = () => (
    <>
      <h2 style={styles.subHeading}>Recent Activity</h2>
      {recentActivity.length > 0 ? (
        <ul className="list-disc pl-6 text-sm text-gray-700">
          {recentActivity.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : (
        <p>No recent activity.</p>
      )}
    </>
  );

  if (loading) return <div style={{ textAlign: 'center', marginTop: '40px' }}>Loading your feed...</div>;
  if (error) return <div style={styles.error}>{error}</div>;

  return (
    <div style={styles.container}>
      <div style={styles.contentBox}>
        <h1 style={styles.heading}>Your Feed</h1>
        {renderPosts(redditPosts, 'Reddit')}
        {renderPosts(twitterPosts, 'Twitter')}
        {renderPosts(linkedinPosts, 'LinkedIn')}
        {renderRecentActivity()}
      </div>
    </div>
  );
}

export default Feed;
