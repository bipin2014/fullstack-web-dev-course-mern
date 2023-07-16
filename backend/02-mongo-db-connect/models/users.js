const mongoose = require('mongoose')
const { Schema } = mongoose
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: Number,
    hash_password: {
        type: String,
        required: true
    }
})

userSchema.virtual('password').set(function (plainpassword) {
    const salt = bcrypt.genSaltSync()
    const hassedpass = bcrypt.hashSync(plainpassword, salt)
    this.hash_password = hassedpass
})

userSchema.virtual('firstname').get(function () {
    return this.name.split(' ')[0]
})

userSchema.methods = {
    authenticate: function (plainpassword) {
        return bcrypt.compareSync(plainpassword, this.hash_password)
    }
}

module.exports = mongoose.model('User', userSchema)