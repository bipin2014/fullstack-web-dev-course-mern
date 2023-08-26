const mongoose = require("mongoose");
const { Schema } = mongoose

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    discounted_price: {
        type: Number,
        required: true,
        default: 0
    },
    image: String,
    sizes: [String],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
    }

})


module.exports = mongoose.model('Product', productSchema)