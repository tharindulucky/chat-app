const express = require('express');
const sessionController = require('../controllers/session.controller');
const checkauth = require('../middlewares/check-auth');

const router = express.Router();

router.post('/create', checkauth, sessionController.createSession);

module.exports = router;