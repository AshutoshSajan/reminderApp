const jwt = require('jsonwebtoken');

const authMiddleware = {
  // eslint-disable-next-line consistent-return
  verifyMentor(req, res, next) {
    try {
      const token = req.headers.Authorization || req.headers.authorization;

      if (!token) {
        return res.status(403).json({ error: 'Not authorized.' });
      }

      jwt.verify(token, process.env.JWT_SECRET, (err, decodedObj) => {
        if (err) {
          return res.status(403).json({ error: 'Invalid token.' });
        }

        req.user = decodedObj;
        return next();
      });
    } catch (err) {
      console.error(err);
      return next(err);
    }
  },
};

module.exports = authMiddleware;
