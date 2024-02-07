const express = require('express');
const AuthController = require('../controllers/authController');
const validator = require('../validator');

const router = express.Router();
const isAuthenticated = require('../middlewares/authentication');
const {
    createUser,
    checkEmail,
    userLogin,
    changePassword,
} = require('../validator/schemas/userSchema');

const authController = new AuthController();

router.post('/register', validator(createUser), authController.register);
router.post('/confirm-email', authController.confirmEmail);
router.post('/email-exists', validator(checkEmail), authController.checkEmail);
router.post('/login', validator(userLogin), authController.login);
router.post('/refresh-token', authController.refreshTokens);
router.post('/logout', authController.logout);
router.post('/forgot-password', authController.resetPassword);
router.post('/forgot-password-confirmed', authController.confirmResetPassword);

router.put('/change-password', isAuthenticated(), validator(changePassword), authController.changePassword);

module.exports = router;
