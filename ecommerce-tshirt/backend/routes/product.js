var express = require('express');
const { isSignedIn, isAuthenticated, isAdmin } = require('../controllers/auth_controller');
const { getUserById, adminUpdateUser, adminDeleteUser } = require('../controllers/user_controller');
const { getProductById, getAllProducts, createProduct, updateProduct, deleteProduct } = require('../controllers/product_controller');
var router = express.Router();

router.param('userId', getUserById)
router.param('productId', getProductById)

router.get('/', getAllProducts)
router.get('/:userId', isSignedIn, isAuthenticated, getAllProducts)

router.post('/create/:userId', isSignedIn, isAuthenticated, isAdmin, createProduct)

router.put('/:productId/:userId', isSignedIn, isAuthenticated, isAdmin, updateProduct)

router.delete('/:productId/:userId', isSignedIn, isAuthenticated, isAdmin, deleteProduct)

module.exports = router;