const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        source: {
            type: String,
            required: true,
            enum: ['esewa'],
            default: 'esewa',
        },
        source_payment_id: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
            default: 0,
        },
        order: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            unique: true,
        },
    },
    {
        timestamps: true,
    }
);


module.exports = mongoose.model('Payment', paymentSchema);;
