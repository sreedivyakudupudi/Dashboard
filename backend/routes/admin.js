
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');


// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  if (req.user.role !== 'Admin') {
    return res.status(403).json({ error: 'Access denied. Admins only.' });
  }
  next();
};
router.get('/users', auth, isAdmin, async (req, res) => {
  try {
    const users = await User.find({}, 'name email credits lastLoginDate');
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});
router.put('/user/:id/credits', auth, isAdmin, async (req, res) => {
    try {
      const { credits } = req.body;
      await User.findByIdAndUpdate(req.params.id, { credits });
      res.json({ message: 'Credits updated successfully' });
    } catch (err) {
      console.error('Error updating credits:', err);
      res.status(500).json({ error: 'Failed to update credits' });
    }
  });
router.get('/user/:id/recent-activity', auth, async (req, res) => {
    try {
      const user = await User.findById(req.params.id, 'recentActivity');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const recent = user.recentActivity?.slice(-5).reverse() || [];
      res.json(recent);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching recent activity' });
    }
  });
  router.delete('/user/:id', auth, async (req, res) => {
    try {
      const userId = req.params.id;
      
      // Find the user and delete
      const user = await User.findByIdAndDelete(userId);
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete user' });
    }
  });
const adminMiddleware = require('../middleware/adminMiddleware');
router.get('/user/:userId/saved-posts', auth, adminMiddleware, async (req, res) => {
  const { userId } = req.params; // Getting the userId from the URL

  try {
   
    const user = await User.findById(userId).populate('savedPosts');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ savedPosts: user.savedPosts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to get saved posts for all users
router.get('/saved-posts', auth, adminMiddleware, async (req, res) => {
  try {
    const users = await User.find({}).populate('savedPosts');
    const allSavedPosts = users.map(user => ({
      user: user.email,
      savedPosts: user.savedPosts
    }));

    res.json(allSavedPosts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;


