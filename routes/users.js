const express = require('express');
const userController = require('../controllers/user.controller');
const userValidator = require('../validators/users');

const router = express.Router();

router.post('/signup', userValidator.registerValidation, userController.signUp);
router.post('/login', userValidator.loginValidation, userController.login);

module.exports = router;