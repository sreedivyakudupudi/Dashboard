// middlewares/adminMiddleware.js
const User = require('../models/User');

const adminMiddleware = async (req, res, next) => {
  const userId = req.user._id; // Assuming the user is authenticated and user ID is stored in req.user
  const user = await User.findById(userId);

  if (user && user.role === 'Admin') {
    next(); // User is an admin, allow access to the route
  } else {
    return res.status(403).json({ message: 'Access forbidden: Admins only' });
  }
};

module.exports = adminMiddleware;
