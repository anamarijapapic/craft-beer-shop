var express = require('express');
var router = express.Router();
const userController = require('../controllers/users');
const requireAuth = require('../middleware/requireAuth');

router.use(requireAuth);

router.get('/', userController.getUsers);
router.get('/:id', userController.getUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
