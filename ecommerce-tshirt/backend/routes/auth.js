const express = require("express");
const router = express.Router()
const { check } = require('express-validator');
const { signup, login } = require("../controllers/auth_controller");

router.post('/signup', [
    check('name', 'name is required').isLength({
        min: 3,
    }),
    check('email', 'email is required').isEmail(),
    check('password', 'Password should be at least 6 character').isLength({
        min: 6,
    })
], signup)

router.post('/login', [
    check('email', 'email is required').isEmail(),
    check('password', 'Password should be at least 6 character').isLength({
        min: 6,
    })
], login)

module.exports = router