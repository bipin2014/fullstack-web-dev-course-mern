const User = require('../models/users');

exports.getUserById = async (req, res, next, id) => {
    try {
        const user = await User.findById(id)
        if (!user) {
            return res.status(400).json({ error: 'No User found' });
        }
        req.user = user;
        next();
    } catch (err) {
        return res.status(400).json({ error: err?.message || 'No User found' });
    }
};

exports.getUser = (req, res) => {
    req.user.hash_password = undefined;
    return res.json(req.user);
}

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        return res.status(400).json({ error: err?.message || 'No User found' });
    }
}

exports.adminUpdateUser = async (req, res) => {
    try {
        const user = await User.findById(req.body.userId)
        user.role = req.body.role;
        user.name = req.body.name;
        const updatedUser = await user.save()

        res.json({ message: 'User Updated Sucessfully', user: updatedUser })
    } catch (err) {
        return res.status(400).json({ error: err?.message || 'No User found' });
    }
}

exports.adminDeleteUser = async (req, res) => {
    try {
        await User.deleteOne({ _id: req.params.deleteUserId })
        res.json({ message: 'User Deleted Sucessfully' })
    } catch (err) {
        return res.status(400).json({ error: err?.message || 'No User found' });
    }
}