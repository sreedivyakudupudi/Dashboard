
  
const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/dashboard', auth, async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // console.log('User Data:', user);
    res.json({
      credits: user.credits,
      savedPosts: user.savedPosts,
      recentActivity: user.recentActivity.slice(-10), // Get the most recent activity
    });
  } catch (err) {
    console.error('Error fetching dashboard:', err);
    res.status(500).json({ error: 'Failed to load dashboard' });
  }
});


router.post('/save', auth, async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      const incomingPost = req.body.post;
  
      if (!incomingPost) {
        return res.status(400).json({ message: 'Post data missing.' });
      }
  
      const postExists = user.savedPosts.some(saved => {
        const savedId = saved?._id?.toString();
        const requestId = incomingPost?._id?.toString();
  
        const savedUrl = saved?.url;
        const requestUrl = incomingPost?.url;
  
        return (savedId && requestId && savedId === requestId) ||
               (savedUrl && requestUrl && savedUrl === requestUrl);
      });
  
      if (postExists) {
        return res.status(400).json({ message: 'You have already saved this post. No points will be added.' });
      }
  
      // Save post and update credits
      user.savedPosts.push(incomingPost);
      user.credits += 2;
      user.recentActivity.push('Saved a post (+2 credits)');
      await user.save();
  
      res.json({ message: 'Post saved', credits: user.credits });
    } catch (error) {
      console.error('Error saving post:', error);
      res.status(500).json({ error: 'Failed to save post' });
    }
  });
  
router.get('/saved', auth, async (req, res) => {
    try {
      const user = await User.findById(req.user.id).populate('savedPosts');
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json({ savedPosts: user.savedPosts });
    } catch (error) {
      console.error('Error fetching saved posts:', error);
      res.status(500).json({ error: 'Failed to fetch saved posts' });
    }
  });
  

  const Profile = require('../models/Profile');
  router.put('/profile', auth, async (req, res) => {
    const { age, occupation, city, phoneNumber } = req.body;
  
    try {
      let profile = await Profile.findOne({ userId: req.user.id });
  
      if (!profile) {
        const user = await User.findById(req.user.id);
        profile = new Profile({
          userId: req.user.id,
          username: user.username,
          email: user.email,
          age,
          occupation,
          city,
          phoneNumber,
        });
      
      } else {
        if (age) profile.age = age;
        if (occupation) profile.occupation = occupation;
        if (city) profile.city = city;
        if (phoneNumber) profile.phoneNumber = phoneNumber;
        console.log('Updating existing profile:', profile);
      }
  
      await profile.save();
      res.json({ message: 'Profile updated successfully', profile });
    } catch (err) {
      console.error('Error updating profile:', err);
      res.status(500).json({ message: 'Server error' });
    }
  });
  router.get('/profile', auth, async (req, res) => {
    try {
      const profile = await Profile.findOne({ userId: req.user.id }).lean();
      if (!profile) return res.status(404).json({ message: 'Profile not found' });
  
      const user = await User.findById(req.user.id).select('username email').lean();
  
      const fullProfile = {
        ...profile,
        username: user.username,
        email: user.email,
      };
  
      res.json(fullProfile);
    } catch (err) {
      console.error('Error fetching profile:', err);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  module.exports = router;