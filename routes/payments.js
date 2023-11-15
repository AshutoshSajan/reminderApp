const express = require('express');
const validatorMiddleware = require('../utils/validator-middleware');
const paymentsController = require('../controllers/payments');
const authMiddleware = require('../utils/auth-middleware');

const router = express.Router();

// to save files locally or on cloudinary
// const upload = require('../utils/multer.config');

router.get('/', authMiddleware.verifyMentor, paymentsController.listPayments);

router.post(
  '/',
  // upload.single("screenshot"), // to save files locally using multer
  validatorMiddleware.mustHaveFields(['amount'], 'payment'),
  paymentsController.createPayment,
);

router.get('/:id', authMiddleware.verifyMentor, paymentsController.showPayment);

router.put(
  '/:id',
  authMiddleware.verifyMentor,
  validatorMiddleware.mustHaveFields(['amount'], 'payment'),
  paymentsController.updatePayment,
);

router.delete(
  '/:id',
  authMiddleware.verifyMentor,
  paymentsController.deletePayment,
);

module.exports = router;
