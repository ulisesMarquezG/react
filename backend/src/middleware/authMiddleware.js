const jwt = require('jsonwebtoken');

exports.protect = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace('Bearer ', '');

  if (!token)
    return res.status(401).json({ message: 'No token, acceso denegado' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;   // payload { id, username }
    next();
  } catch {
    res.status(401).json({ message: 'Token inválido' });
  }
};
