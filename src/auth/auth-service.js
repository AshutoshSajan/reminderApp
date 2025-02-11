const jwt = require('jsonwebtoken');

const authService = {
  loginMentor(mentor, password) {
    const isAuthenticated = mentor.comparePassword(password);

    if (!isAuthenticated) {
      return false;
    }

    const token = jwt.sign({ _id: mentor.id }, process.env.JWT_SECRET);

    return { token, mentor };
  },
};

module.exports = authService;
