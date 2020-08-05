const { body, validationResult } = require('express-validator');

const sendMessage = [
    body('sessionId').isInt(),
];

const messageValidationFormatter = validationResult.withDefaults({
    formatter: (error) => {
      return {
        key: error.param,
        message: error.msg,
    };
    }
  });

module.exports = {
    sendMessage: sendMessage,
    messageValidationFormatter: messageValidationFormatter
}