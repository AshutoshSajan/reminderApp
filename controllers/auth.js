const mentorsService = require('../src/mentors/mentors-service');
const authService = require('../src/auth/auth-service');

const authController = {
  async loginMentor(req, res) {
    const { email, password } = req.body;

    try {
      const mentor = await mentorsService.findOneByField({ email });
      const response = await authService.loginMentor(mentor, password);

      response.mentor.password = undefined;

      if (!response) {
        return res
          .status(401)
          .json({ success: false, error: 'Password didnt match.' });
      }

      return res.status(200).json({ success: true, message: '', response });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, error, message: 'server error' });
    }
  },

  async identifyMentor(req, res) {
    const mentorId = req.user._id;

    try {
      const mentor = await mentorsService.findOneByField({ _id: mentorId });

      mentor.password = undefined;

      return res.status(200).json({ success: true, message: '', mentor });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, error, message: 'server error' });
    }
  },
};

module.exports = authController;
