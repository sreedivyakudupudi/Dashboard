const express = require('express');
const axios = require('axios');
const auth = require('../middleware/auth');
const User = require('../models/User');
const router = express.Router();

// Fetch Reddit Posts
router.get('/reddit', auth,async (req, res) => {
  try {
    const response = await axios.get('https://www.reddit.com/r/popular.json');
    const posts = response.data.data.children.map(post => ({
      title: post.data.title,
      url: 'https://reddit.com' + post.data.permalink,
      source: 'Reddit'
    }));
    res.json(posts.slice(0, 10));
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Reddit posts' });
  }
});



module.exports = router;
