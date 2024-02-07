const express = require('express');
const { createCustomer, updateCustomer } = require('../validator/schemas/customerSchema');
const CustomerController = require('../controllers/customerController');
const isAuthenticated = require('../middlewares/authentication');
const isAuthorized = require('../middlewares/authorization');
const validator = require('../validator/index');
const { UserRoles } = require('../config/role');

const router = express.Router();
const customerController = new CustomerController();

router.post('/register', isAuthenticated(), isAuthorized(UserRoles.ADMIN, UserRoles.STAFF), validator(createCustomer), customerController.register);
router.get('/list', isAuthenticated(), isAuthorized(UserRoles.ADMIN, UserRoles.STAFF), customerController.list);
router.patch('/:uuid', isAuthenticated(), isAuthorized(UserRoles.ADMIN, UserRoles.STAFF), validator(updateCustomer), customerController.update);
router.get('/:uuid', isAuthenticated(), isAuthorized(UserRoles.ADMIN, UserRoles.STAFF), customerController.get);
router.delete('/:uuid', isAuthenticated(), isAuthorized(UserRoles.ADMIN), customerController.delete);

module.exports = router;