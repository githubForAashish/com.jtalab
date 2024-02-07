const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const UserDao = require('../dao/userDao');
const responseHandler = require('../helper/responseHandler');
const logger = require('../config/logger');
const { UserStatus } = require('../config/constant');

class UserService {
    constructor() {
        this.userDao = new UserDao();
    }

    /**
     * Create a user
     * @param {Object} userBody
     * @returns {Object}
     */
    createUser = async (userBody) => {
        try {
            let message = 'Successfully Registered the account! Please Verify your email.';
            if (await this.userDao.isEmailExists(userBody.email)) {
                return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Email already taken');
            }

            let userData = await this.userDao.create({
                ...userBody,
                email: userBody.email.toLowerCase(),
                password: bcrypt.hashSync(userBody.password),
                uuid: uuidv4(),
                status: UserStatus.VERIFICATION_PENDING,
                email_verified: false,
                role: userBody.role,
            });

            if (!userData) {
                message = 'Registration Failed!';
                return responseHandler.returnError(httpStatus.BAD_REQUEST, message);
            }

            userData = userData.toJSON();
            delete userData.password;
            delete userData.id;

            return responseHandler.returnSuccess(httpStatus.CREATED, message, userData);
        } catch (e) {
            logger.error(e);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Something went wrong!');
        }
    };

    /**
     * Confirm email verification for a user
     * @param {Object} user
     * @returns {Object}
     */
    completeUserEmailVerification = async (user) => {
        return this.userDao.updateWhere(
            { email_verified: true, status: UserStatus.ENABLED },
            { uuid: user.uuid },
        );
    };

    /**
     * Get user
     * @param {String} email
     * @returns {Object}
     */

    isEmailExists = async (email) => {
        const message = 'Email found!';
        if (!(await this.userDao.isEmailExists(email))) {
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Email not Found!!');
        }
        return responseHandler.returnSuccess(httpStatus.OK, message);
    };

    getUserByUuid = async (uuid) => {
        return this.userDao.findByUuid(uuid);
    };

    getUserByEmail = async (email) => {
        return this.userDao.findByEmail(email);
    };

    changePassword = async (data, uuid) => {
        let message = 'Login Successful';
        let statusCode = httpStatus.OK;
        let user = await this.userDao.findByUuid(uuid);

        if (!user) {
            return responseHandler.returnError(httpStatus.NOT_FOUND, 'User Not found!');
        }

        if (data.password !== data.confirm_password) {
            return responseHandler.returnError(
                httpStatus.BAD_REQUEST,
                'Confirm password not matched',
            );
        }

        const isPasswordValid = await bcrypt.compare(data.old_password, user.password);
        user = user.toJSON();
        delete user.password;
        if (!isPasswordValid) {
            statusCode = httpStatus.BAD_REQUEST;
            message = 'Wrong old Password!';
            return responseHandler.returnError(statusCode, message);
        }
        const updateUser = await this.userDao.updateWhere(
            { password: bcrypt.hashSync(data.password, 8) },
            { uuid },
        );

        if (updateUser) {
            return responseHandler.returnSuccess(
                httpStatus.OK,
                'Password updated Successfully!',
                {},
            );
        }

        return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Password Update Failed!');
    };
}

module.exports = UserService;
