const User = require('../models/users')
const { validationResult } = require('express-validator')

exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec().then(user => {
        req.user = user
        next()
    }).catch(err => {
        return req.status(400).json({ error: err.message })
    })
}

exports.addUser = (req, res) => {
    console.log(req.body);
    // res.send('Hello, Welcome to Tech With Bipin Channel')
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({ error: errors.array() })
    }

    const user = new User(req.body)
    user.save().then(createduser => {
        console.log('User Created ' + createduser._id);
        res.status(200).json({ message: 'User Created', user: createduser, firstname: createduser.firstname })
    }).catch(err => {
        console.log(err);
    })

}
exports.loginUser = async (req, res) => {
    console.log(req.body);
    // res.send('Hello, Welcome to Tech With Bipin Channel')
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({ error: errors.array() })
    }
    const { id, password } = req.body;
    try {
        const user = await User.findById(id).exec()
        if (!user) {
            return res.status(400).json({ error: 'User Not Found' })
        }

        if (!user.authenticate(password)) {
            return res.status(400).json({ error: 'User Id/password Invalid' })
        }

        res.json({ message: 'Login Success', user })

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }

}


exports.viewUsers = (req, res) => {
    console.log(req.headers);
    // res.send('Hello, Welcome to Tech With Bipin Channel')
    User.find({}).exec().then(users => {
        res.status(200).json(users)
    }).catch(err => {
        return res.status(400).json({ message: err.message })
    })
}

exports.queryUsers = (req, res) => {

    const param = req.query
    console.log(param);
    User.find({ age: { $gte: param.age } }).exec().then(users => {
        res.status(200).json(users)
    }).catch(err => {
        return res.status(400).json({ message: err.message })
    })
}

exports.updateUser = async (req, res) => {
    console.log(req.body);

    const user = req.user

    user.name = req.body.name
    user.age = req.body.age

    try {
        const savedUser = await user.save()
        res.json({ message: "user updated", user: savedUser })
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }

}

exports.deleteUser = async (req, res) => {

    const user = req.user

    try {
        const deletedUser = await User.deleteOne({ _id: user._id })
        res.json({ message: "user deleted", user: deletedUser })
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }

}