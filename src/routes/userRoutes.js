const express = require('express');
const router = express.Router();

const userController = require('../controllers/UserController');
const adminMiddleware = require('../middlewares/adminMiddleware');

router.get('/', userController.getUserList);
router.delete('/', userController.deleteUserByEmail);

module.exports = router;
