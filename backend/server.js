const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const twitterRoutes = require('./routes/twitter');
 // Now it's accessible via /api/feed/twitter
 const adminRoutes = require('./routes/admin');
 
require('dotenv').config();
const feedRoutes = require('./routes/feed');


const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));
// app.use('/', authRoutes); 
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
// app.use('/api/feed', feedRoutes);
app.use('/api/feed', require('./routes/feed'));
app.use('/api/admin', require('./routes/admin'));
 // Adjust path if needed
// app.use('/api', adminRoutes); // This is key: `/api/admin/user-analytics` becomes valid
app.use('/api',twitterRoutes);
//  app.use('/api/twitter', require('./routes/twitter'));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
