var express = require('express');
const { isSignedIn, isAuthenticated, isAdmin } = require('../controllers/auth_controller');
const { getUser, getUserById, getAllUsers, adminUpdateUser, adminDeleteUser } = require('../controllers/user_controller');
var router = express.Router();

router.param('userId', getUserById)

router.get('/:userId', isSignedIn, isAuthenticated, getUser)

router.get('/users/:userId', isSignedIn, isAuthenticated, getAllUsers)

router.put('/users/admin/update/:userId', isSignedIn, isAuthenticated, isAdmin, adminUpdateUser)

router.delete('/users/:deleteUserId/:userId', isSignedIn, isAuthenticated, isAdmin, adminDeleteUser)

module.exports = router;