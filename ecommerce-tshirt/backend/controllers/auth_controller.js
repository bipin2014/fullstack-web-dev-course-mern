const User = require('../models/users');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg,
        });
    }
    try {
        const user = new User(req.body);
        const createdUser = await user.save()
        res.json({ message: 'Signup success', _id: createdUser._id });
    } catch (err) {
        console.log(err);
        return res
            .status(400)
            .json({ error: err.message || 'Not Able to Save in Database' });
    }
}

exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg,
        });
    }
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).exec()
        if (!user) {
            return res.status(400).json({ error: 'User Not Found' })
        }
        if (!user.authenticate(password)) {
            return res.status(400).json({ error: 'Email or Password Invalid' })
        }

        //jwt generate
        const token = jwt.sign({
            _id: user._id,
            exp: Math.floor(Date.now() / 1000) + 864000
        }, process.env.SECRET)

        user.hash_password = undefined

        res.json({ message: 'Login Success', token, user })

    } catch (err) {
        console.log(err);
        return res
            .status(400)
            .json({ error: err.message || 'Not Able to Save in Database' });
    }
}