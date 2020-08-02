const { body, validationResult } = require('express-validator');

const sendMessage = [
    body('sessionId').isInt(),
];


module.exports = {
    sendMessage: sendMessage
}