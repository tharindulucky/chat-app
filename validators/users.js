const express = require('express')
const bodyParser = require('body-parser')
const { body, validationResult } = require('express-validator');

const registerValidation = [
    body('name').isLength({min:3, max: 30}).withMessage('Name must be between 3 and 30 chars long'),
    body('email').isEmail().withMessage('Email must be a valid one'),
    body('password').isLength({min:6, max: undefined}).withMessage('Password must be at least 10 chars long'),
];

const loginValidation = [
    body('email').isEmail().withMessage('Email must be a valid one'),
];

module.exports = {
    registerValidation: registerValidation,
    loginValidation: loginValidation
}