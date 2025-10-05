const express = require('express');
const router = express.Router();

const userController = require('../controllers/UserController');
const adminMiddleware = require('../middlewares/adminMiddleware');

router.get('/', adminMiddleware, userController.getUserList);
router.delete('/', adminMiddleware, userController.deleteUserByEmail);

module.exports = router;
