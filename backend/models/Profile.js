const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  username: String,
  email: String,
  age: Number,
  occupation: String,
  city: String,
  phoneNumber: String
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);