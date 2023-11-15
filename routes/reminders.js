const express = require('express');
const validatorMiddleware = require('../utils/validator-middleware');
const remindersController = require('../controllers/reminders');

const router = express.Router();

router.get('/', remindersController.listReminders);

router.post(
  '/',
  validatorMiddleware.mustHaveFields(['amount'], 'reminder'),
  remindersController.createReminder,
);

router.get('/:id', remindersController.showReminder);

router.put(
  '/:id',
  validatorMiddleware.mustHaveFields(['amount'], 'reminder'),
  remindersController.updateReminder,
);

router.delete('/:id', remindersController.deleteReminder);

module.exports = router;
