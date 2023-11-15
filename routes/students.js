const express = require('express');
const validatorMiddleware = require('../utils/validator-middleware');
const studentsController = require('../controllers/students');

const router = express.Router();

router.get('/', studentsController.listStudents);

router.post(
  '/',
  validatorMiddleware.mustHaveFields(
    ['name', 'email', 'phoneNumber'],
    'student',
  ),
  validatorMiddleware.isValidEmail('email', 'student'),
  studentsController.createStudent,
);

router.get('/:id', studentsController.showStudent);

router.put(
  '/:id',
  validatorMiddleware.mustHaveFields(
    ['name', 'email', 'phoneNumber'],
    'student',
  ),
  studentsController.updateStudent,
);

router.delete('/:id', studentsController.deleteStudent);

module.exports = router;
