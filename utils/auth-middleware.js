const jwt = require("jsonwebtoken");

const authMiddleware = {
  verifyMentor: function(req, res, next) {
    const token = req.headers.Authorization || req.headers.authorization;

    if (!token) {
      return res.status(403).json({ error: "Not authorized." });
    }

    jwt.verify(token, process.env.JWT_SECRET, function(err, decodedObj) {
      if (err) {
        return res.status(403).json({ error: "Invalid token." });
      }

      req.user = decodedObj;
      next();
    });
  }
};

module.exports = authMiddleware;
