const validator = require('validator');

const validatorMiddleware = {
  mustHaveFields(fieldNames, nestedObj = null) {
    return function (req, res, next) {
      for (let i = 0; i < fieldNames.length; i += 1) {
        const fieldName = nestedObj
          ? req.body[nestedObj][fieldNames[i]]
          : req.body[fieldNames[i]];

        if (fieldName === null || fieldName === undefined) {
          return res
            .status(400)
            .json({ error: fieldNames.join(', ').concat(' are must.') });
        }
      }

      return next();
    };
  },

  isValidEmail(email, nestedObj = null) {
    return function (req, res, next) {
      const emailField = nestedObj
        ? req.body[nestedObj][email]
        : req.body[email];

      if (!validator.isEmail(emailField)) {
        return res.status(400).json({ error: 'Email is invalid.' });
      }

      return next();
    };
  },
};

module.exports = validatorMiddleware;
