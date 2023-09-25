var express = require('express');
const { isSignedIn, isAuthenticated, isAdmin } = require('../controllers/auth_controller');
const { getUserById } = require('../controllers/user_controller');
const { getCartById, getAllUserCarts, deleteCart, addToCart, createOrUpdateCart } = require('../controllers/cart_controller');
var router = express.Router();

router.param('userId', getUserById)
router.param('cartId', getCartById)

router.get('/:userId', isSignedIn, isAuthenticated, getAllUserCarts)

router.post('/addToCart/:userId', isSignedIn, isAuthenticated, addToCart)

router.post('/:userId', isSignedIn, isAuthenticated, createOrUpdateCart)

router.delete('/:cartId/:userId', isSignedIn, isAuthenticated, deleteCart)

module.exports = router;