const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('Authorization');

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    // Expect "Bearer <token>"
    const tokenString = token.replace('Bearer ', '');
    // console.log('Verifying token:', tokenString); 
    const decoded = jwt.verify(tokenString, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error('Auth Middleware Error:', err.message);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
