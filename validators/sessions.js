const { body, validationResult } = require('express-validator');

const createSession = [
    body('email').isEmail().withMessage('Email must be a valid one'),
];


module.exports = {
    createSession: createSession
}