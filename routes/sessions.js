const express = require('express');
const sessionController = require('../controllers/session.controller');
const checkauth = require('../middlewares/check-auth');

const router = express.Router();

router.post('/create', checkauth, sessionController.createSession);
router.get('/', checkauth, sessionController.getMySessions);
router.get('/:id', checkauth, sessionController.getSession);

module.exports = router;