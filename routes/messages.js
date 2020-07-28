const express = require('express');
const messageController = require('../controllers/message.controller');
const checkauth = require('../middlewares/check-auth');

const router = express.Router();

router.post('/send', checkauth, messageController.sendMessage);

module.exports = router;