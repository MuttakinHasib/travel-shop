const jwt = require('jsonwebtoken');

module.exports = async function (req, res, next) {
  // const token = req.header('x-auth-token');
  const token = req.cookies.token || req.header('x-auth-token');

  if (!token)
    return res.status(401).json({ msg: 'No token, authorization denied' });
  try {
    const { user } = await jwt.verify(token, process.env.SECRET);
    req.user = user;
    next();
  } catch (err) {
    console.error(err.message);
    return res.status(401).json({ msg: 'Token is not valid' });
  }
};
