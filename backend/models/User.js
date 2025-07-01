const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: { type: String, enum: ['User', 'Admin'], default: 'User' },
  credits: { type: Number, default: 0},
  savedPosts: [Object],
  recentActivity: [String],
  lastLoginDate: Date
});

module.exports = mongoose.model('User', userSchema);
