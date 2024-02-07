const express = require('express');
const AuthController = require('../controllers/usersAndTokensController');
const validator = require('../validator');

const router = express.Router();
const isAuthenticated = require('../middlewares/authentication');
const {
    createUser,
    checkEmail,
    userLogin,
    changePassword,
    refreshToken,
    verificationToken,
} = require('../validator/schemas/userSchema');
const isAuthorized = require('../middlewares/authorization');
const { UserRoles } = require('../config/role');

const authController = new AuthController();

/**
 * @swagger
 * /usersAndTokens/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with the provided credentials
 *     tags:
 *       - Users and Tokens
 *     security:
 *       - apiKey: []
 *     requestBody:
 *       description: User data to register
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/createUser'
 *     responses:
 *       xxx:
 *         $ref: '#/components/responses/xxx'
 *
 */
router.post('/register', isAuthenticated(), isAuthorized(UserRoles.ADMIN), validator(createUser), authController.register);


/**
 * @swagger
 * /usersAndTokens/{uuid}:
 *   delete:
 *     summary: Remove a user
 *     parameters:
 *       - in: path
 *         name: uuid
 *         schema:
 *           type: uuid
 *     description: User uuid to remove
 *     tags:
 *       - Users and Tokens
 *     security:
 *       - apiKey: []
 *     responses:
 *       xxx:
 *         $ref: '#/components/responses/xxx'
 *
 */
router.delete('/:uuid', isAuthenticated(), isAuthorized(UserRoles.ADMIN), authController.remove);

/**
 * @swagger
 * /usersAndTokens/confirm-email:
 *   post:
 *     summary: Confirm email for new users.
 *     description: Enable a new user via. email verification
 *     tags:
 *       - Users and Tokens
 *     requestBody:
 *       description: URL Token receivied in Email
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/verificationToken'
 *     responses:
 *       xxx:
 *         $ref: '#/components/responses/xxx'
 * 
 */
router.post('/confirm-email', validator(verificationToken), authController.confirmEmail);

/**
 * @swagger
 * /usersAndTokens/email-exists:
 *   post:
 *     summary: Check if email exists
 *     tags:
 *       - Users and Tokens
 *     requestBody:
 *       description: Email under consideration
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/checkEmail'
 *     responses:
 *       xxx:
 *         $ref: '#/components/responses/xxx'
 *
 */
router.post('/email-exists', validator(checkEmail), authController.checkEmail);

/**
 * @swagger
 * /usersAndTokens/login:
 *   post:
 *     summary: Login to get `accessToken`
 *     tags:
 *       - Users and Tokens
 *     requestBody:
 *       description: Login via. verified email
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/userLogin'
 *     responses:
 *       xxx:
 *         $ref: '#/components/responses/xxx'
 * 
 */
router.post('/login', validator(userLogin), authController.login);

/**
 * @swagger
 * /usersAndTokens/refresh-token:
 *   post:
 *     summary: Use refresh token to get new set of Tokens.
 *     tags:
 *       - Users and Tokens
 *     requestBody:
 *       description: A valid `refreshToken`
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/refreshToken'
 *     responses:
 *       xxx:
 *         $ref: '#/components/responses/xxx'
 *  
 */
router.post('/refresh-token', validator(refreshToken), authController.refreshTokens);

/**
 * @swagger
 * /usersAndTokens/logout:
 *   post:
 *     summary: Session logout
 *     tags:
 *       - Users and Tokens
 *     requestBody:
 *       description: A valid `refreshToken`
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/refreshToken'
 *     responses:
 *       xxx:
 *         $ref: '#/components/responses/xxx'
 *
 */
router.post('/logout', validator(refreshToken), authController.logout);

/**
 * @swagger
 * /usersAndTokens/forgot-password:
 *   post:
 *     summary: Reset password
 *     tags:
 *       - Users and Tokens
 *     requestBody:
 *       description: User's email for which to reset password
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/checkEmail'
 *     responses:
 *       xxx:
 *         $ref: '#/components/responses/xxx'
 *
 */
router.post('/forgot-password', authController.resetPassword);

/**
 * @swagger
 * /usersAndTokens/forgot-password-confirmed:
 *   post:
 *     summary: Confirm password reset
 *     tags:
 *       - Users and Tokens
 *     requestBody:
 *       description: URL Token receivied in Email
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/verificationToken'
 *     responses:
 *       xxx:
 *         $ref: '#/components/responses/xxx'
 *
 */
router.post('/forgot-password-confirmed', authController.confirmResetPassword);

/**
 * @swagger
 * /usersAndTokens/change-password:
 *   post:
 *     summary: Change current password
 *     security:
 *       - apiKey: []
 *     tags:
 *       - Users and Tokens
 *     requestBody:
 *       description: New credentials
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/changePassword'
 *     responses:
 *       xxx:
 *         $ref: '#/components/responses/xxx'
 *
 */
router.post('/change-password', isAuthenticated(), validator(changePassword), authController.changePassword);

module.exports = router;
