const express = require('express')
const router = express.Router()
const { addUser, viewUsers, queryUsers, getUserById, updateUser, deleteUser, loginUser } = require('../controllers/users_controller')
const { check } = require('express-validator')

router.param('userId', getUserById)

router.post('/', [
    check('name', 'name cannot be less than 3 and more than 10').isLength({ min: 3, max: 10 }),
    check('age', 'age must be more than 18').isInt({ gt: 18 }),
    check('password', 'phone is not valid').isAlphanumeric(),
], addUser)

router.post('/login', [
    check('id', 'id cannot be less than 3 and more than 10').isLength({ min: 3 }),
    check('password', 'phone is not valid').isAlphanumeric(),
], loginUser)

router.get('/viewusers', viewUsers)
router.get('/queryusers', queryUsers)

router.put('/update/:userId', updateUser)

router.delete('/delete/:userId', deleteUser)
// /users/
module.exports = router