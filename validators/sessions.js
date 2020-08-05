const { body, validationResult } = require('express-validator');

const createSession = [
    body('email').isEmail().withMessage('Email must be a valid one'),
];

const sessionValidationFormatter = validationResult.withDefaults({
    formatter: (error) => {
      return {
        key: error.param,
        message: error.msg,
    };
    }
  });

module.exports = {
    createSession: createSession,
    sessionValidationFormatter: sessionValidationFormatter
}