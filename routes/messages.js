const express = require('express');
const messageController = require('../controllers/message.controller');
const checkauth = require('../middlewares/check-auth');
const messageValidator = require('../validators/messages');

const router = express.Router();

router.post('/send', [checkauth, messageValidator.sendMessage], messageController.sendMessage);

module.exports = router;