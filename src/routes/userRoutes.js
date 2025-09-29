const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const adminKeyMiddleware = require('../middlewares/adminKey');

router.get('/', userController.getUserList);
router.delete('/', userController.deleteUserByEmail);

module.exports = router;
