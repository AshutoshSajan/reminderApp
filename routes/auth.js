const express = require('express');

const router = express.Router();
const authController = require('../controllers/auth');
const validatorMiddleware = require('../utils/validator-middleware');
const authMiddleware = require('../utils/auth-middleware');

/* POST login mentor */
router.post(
  '/login',
  validatorMiddleware.mustHaveFields(['email', 'password']),
  validatorMiddleware.isValidEmail('email'),
  authController.loginMentor,
);

router.get('/me', authMiddleware.verifyMentor, authController.identifyMentor);

module.exports = router;
