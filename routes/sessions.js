const express = require('express');
const sessionController = require('../controllers/session.controller');
const checkauth = require('../middlewares/check-auth');
const sessionValidator = require('../validators/sessions');

const router = express.Router();

router.post('/create', [checkauth, sessionValidator.createSession], sessionController.createSession);
router.get('/', checkauth, sessionController.getMySessions);
router.get('/:id', checkauth, sessionController.getSession);

module.exports = router;