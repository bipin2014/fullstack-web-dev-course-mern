var express = require('express');
const { isSignedIn, isAuthenticated, isAdmin } = require('../controllers/auth_controller');
const { getUserById, adminUpdateUser, adminDeleteUser } = require('../controllers/user_controller');
const { getBrandById, getAllBrands, createBrand, updateBrand, deleteBrand } = require('../controllers/brand_controller');
var router = express.Router();

router.param('userId', getUserById)
router.param('brandId', getBrandById)

router.get('/:userId', isSignedIn, isAuthenticated, getAllBrands)

router.post('/create/:userId', isSignedIn, isAuthenticated, isAdmin, createBrand)

router.put('/:brandId/:userId', isSignedIn, isAuthenticated, isAdmin, updateBrand)

router.delete('/:brandId/:userId', isSignedIn, isAuthenticated, isAdmin, deleteBrand)

module.exports = router;