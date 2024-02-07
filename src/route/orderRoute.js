const express = require('express');
const isAuthenticated = require('../middlewares/authentication');
const isAuthorized = require('../middlewares/authorization');
const validator = require('../validator/index');
const { UserRoles } = require('../config/role');
const OrderController = require('../controllers/orderController');
const { createOrder } = require('../validator/schemas/orderSchema');

const router = express.Router();
const orderController = new OrderController();

router.post('/register', isAuthenticated(), isAuthorized(UserRoles.ADMIN, UserRoles.STAFF), validator(createOrder), orderController.register);
router.get('/list', isAuthenticated(), isAuthorized(UserRoles.ADMIN, UserRoles.STAFF), orderController.list);
router.patch('/:uuid', isAuthenticated(), isAuthorized(UserRoles.ADMIN, UserRoles.STAFF), validator(createOrder), orderController.update);
router.get('/:uuid', isAuthenticated(), isAuthorized(UserRoles.ADMIN, UserRoles.STAFF), orderController.get);
router.delete('/:uuid', isAuthenticated(), isAuthorized(UserRoles.ADMIN), orderController.delete);

module.exports = router;