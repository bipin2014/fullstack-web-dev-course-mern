var express = require('express');
const { isSignedIn, isAuthenticated, isAdmin } = require('../controllers/auth_controller');
const { getUserById } = require('../controllers/user_controller');
const { getOrderById, getAllOrders, createOrder, updateOrder, deleteOrder } = require('../controllers/order_controller');
var router = express.Router();

router.param('userId', getUserById);
router.param('orderId', getOrderById);

router.get(
    '/:userId',
    isSignedIn,
    isAuthenticated,
    getAllOrders
);

router.post(
    '/create/:userId',
    isSignedIn,
    isAuthenticated,
    createOrder
);

router.put(
    '/:orderId/:userId',
    isSignedIn,
    isAuthenticated,
    isAdmin,
    updateOrder
);

router.delete(
    '/:orderId/:userId',
    isSignedIn,
    isAuthenticated,
    isAdmin,
    deleteOrder
);


module.exports = router;