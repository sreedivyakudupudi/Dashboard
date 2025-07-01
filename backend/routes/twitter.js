

const express = require('express');
const axios = require('axios');
const router = express.Router();

const BEARER_TOKEN = 'AAAAAAAAAAAAAAAAAAAAAEXk0wEAAAAACqOYvkj8T4IGeU0rS80ISQaev2o%3DOKoRtF23grK1nxo35feJGTWbS4E30T1H8sskTqfV9cZ7DYOWmi'; // Replace this
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

let cachedTweets = null;
let lastFetchedTime = 0;

router.get('/twitter', async (req, res) => {
  const now = Date.now();
  if (cachedTweets && now - lastFetchedTime < CACHE_DURATION) {
    return res.json(cachedTweets);
  }

  const url = 'https://api.twitter.com/2/tweets/search/recent';
  const params = {
    query: 'from:geeksforgeeks',
    max_results: 10,
    'tweet.fields': 'created_at,author_id'
  };

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`
      },
      params: params
    });

    cachedTweets = response.data;
    lastFetchedTime = now;

    res.json(response.data);
  } catch (error) {
    const status = error.response?.status;
    if (status === 429) {
      console.error('Rate limit hit. Try again later.');
    } else {
      console.error('Error fetching tweets:', error.response?.data || error.message);
    }

    res.status(status || 500).json({
      error: 'Error fetching tweets',
      detail: error.response?.data || error.message
    });
  }
});

module.exports = router;




