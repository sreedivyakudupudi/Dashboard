


import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TwitterFeed = () => {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [savedPosts, setSavedPosts] = useState([]);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/twitter');
        setTweets(response.data.data || []);
        setLoading(false);
      } catch (err) {
        setError('Error fetching tweets');
        setLoading(false);
      }
    };

    // Fetch saved posts
    const fetchSavedPosts = async () => {
      if (token) {
        try {
          const config = { headers: { Authorization: `Bearer ${token}` } };
          const response = await axios.get('http://localhost:5000/api/user/saved', config);
          setSavedPosts(response.data.savedPosts || []);
        } catch (err) {
          console.error('Error fetching saved posts:', err);
        }
      }
    };

    fetchTweets();
    fetchSavedPosts();
  }, [token]);

  const isPostSaved = (post) => {
    if (!post) return false;
    return savedPosts.some(saved =>
      (saved?._id && post._id && saved._id === post._id) ||
      (saved?.id && post.id && saved.id === post.id)
    );
  };

  const handleSave = async (post) => {
    if (!token) return alert('You must be logged in to save posts.');
    if (isPostSaved(post)) return alert('You have already saved this post.');

    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      await axios.post('http://localhost:5000/api/user/save', { post }, config);
      // After saving, fetch the saved posts again to update the state
      // const response = await axios.get('http://localhost:5000/api/user/saved', config);
      // setSavedPosts(response.data.savedPosts || []);
      setSavedPosts((prev) => [...prev, post]);
      alert('Post saved and 2 credits earned!');
    } catch (err) {
      alert('Failed to save post. Please try again.');
      console.error('Error saving post:', err);
    }
  };

  const handleReport = (post) => alert(`Reported tweet: "${post.text}"`);

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url)
      .then(() => alert('Link copied to clipboard!'))
      .catch(() => alert('Failed to copy link.'));
  };

  if (loading) return <div style={styles.loading}>Loading tweets...</div>;
  if (error) return <div style={styles.error}>{error}</div>;

  // Render both recent tweets and saved posts
  const renderTweets = (tweets, label) => (
    <div style={styles.container}>
      <h2 style={styles.title}>{label}</h2>
      {tweets.length === 0 ? (
        <p style={styles.noPosts}>No posts found.</p>
      ) : (
        <ul style={styles.tweetList}>
          {tweets.map((tweet) => (
            <li key={tweet.id} style={styles.tweetItem}>
              <img
                src="/twitlogo.png"
                alt="Twitter Logo"
                style={{ width: '50px', height: '50px' }}
              />
              <p style={styles.tweetText}>{tweet.text}</p>
              <p style={styles.author}>Author: {tweet.author_id}</p>
              <a 
                href={`https://twitter.com/${tweet.author_id}/status/${tweet.id}`} 
                target="_blank" 
                rel="noreferrer" 
                style={styles.link}
              >
                View Tweet
              </a>
              <div className="mt-2">
                <button
                  style={{
                    ...styles.button,
                    ...(isPostSaved(tweet) ? styles.saved : styles.save),
                  }}
                  onClick={() => handleSave(tweet)}
                  disabled={isPostSaved(tweet)}
                >
                  {isPostSaved(tweet) ? 'Already Saved' : 'Save'}
                </button>
                <button style={{ ...styles.button, ...styles.report }} onClick={() => handleReport(tweet)}>
                  Report
                </button>
                <button style={{ ...styles.button, ...styles.copy }} onClick={() => handleCopy(`https://twitter.com/${tweet.author_id}/status/${tweet.id}`)}>
                  Copy Link
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  const renderSavedPosts = () => (
    <div style={styles.container}>
      <h2 style={styles.title}>Saved Posts</h2>
      {savedPosts.length === 0 ? (
        <p style={styles.noPosts}>No saved posts yet.</p>
      ) : (
        <ul style={styles.tweetList}>
          {savedPosts.map((post) => (
            <li key={post.id} style={styles.tweetItem}>
              <img
                src="/twitlogo.png"
                alt="Twitter Logo"
                style={{ width: '50px', height: '50px' }}
              />
              <p style={styles.tweetText}>{post.text}</p>
              <p style={styles.author}>Author: {post.author_id}</p>
              <a 
                href={`https://twitter.com/${post.author_id}/status/${post.id}`} 
                target="_blank" 
                rel="noreferrer" 
                style={styles.link}
              >
                View Tweet
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <div>
      {renderTweets(tweets, 'Recent Tweets')}
      {renderSavedPosts()}
    </div>
  );
};

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
  title: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: '20px',
  },
  tweetList: {
    listStyleType: 'none',
    padding: 0,
    marginTop: '20px',
    width: '100%',
    maxWidth: '800px',
  },
  tweetItem: {
    backgroundColor: '#fff',
    padding: '15px',
    marginBottom: '15px',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  tweetText: {
    fontSize: '16px',
    color: '#333',
    marginBottom: '10px',
  },
  author: {
    fontSize: '14px',
    color: '#555',
  },
  saveButton: {
    marginTop: '10px',
    padding: '8px 12px',
    fontSize: '14px',
    backgroundColor: '#0288d1',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  link: {
    color: '#1e88e5',
    textDecoration: 'underline',
  },
  loading: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#888',
    marginTop: '20px',
  },
  error: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#c62828',
    marginTop: '20px',
  },
  noPosts: {
    textAlign: 'center',
    fontSize: '16px',
    color: '#888',
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
};

export default TwitterFeed;
