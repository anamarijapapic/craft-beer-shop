var express = require('express');
var router = express.Router();
const authController = require('../controllers/auth');
const requireAuth = require('../middleware/requireAuth');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', requireAuth, authController.logout);

module.exports = router;
