const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
    try {
  const { username, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashed });
  await user.save();
  res.json({ message: 'User registered' });
} catch (err) {
    console.error('Registration error:', err); // Add this line
    res.status(500).json({ message: 'Server error during registration' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'User not found' });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    // Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    const lastLogin = user.lastLoginDate ? new Date(user.lastLoginDate) : new Date(0);
    lastLogin.setHours(0, 0, 0, 0); // Normalize last login date

    let message = "Welcome back!";

    if (today.getTime() !== lastLogin.getTime()) {
     
      user.credits += 5;
      user.recentActivity.push('Logged in and earned 5 credits');
      message = "5 credits added!";
    }

    user.lastLoginDate = new Date();
    await user.save();
    res.json({
      token,
      role: user.role,
      credits: user.credits,
      message
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});
router.get('/user', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('username email');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error('Error fetching user info:', err);
    res.status(500).json({ message: 'Server error' });
  }
});
module.exports = router;