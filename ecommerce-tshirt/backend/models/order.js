const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        payment_method: {
            type: String,
            required: true,
            default: 'esewa'
        },
        amount: {
            type: Number,
            required: true
        },
        products: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    default: 1
                }
            }
        ],
        status: {
            type: String,
            required: true,
            enum: ['created', 'paid and processing', 'shipping', 'delivered'],
            default: 'created',
        },
        address: String,
    },
    {
        timestamps: true,
    }
);


module.exports = mongoose.model('Order', orderSchema);;
