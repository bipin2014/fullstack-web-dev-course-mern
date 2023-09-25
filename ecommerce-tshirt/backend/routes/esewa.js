var express = require('express');
var router = express.Router();

const { verifyPayment } = require('../controllers/esewa');
const { getOrderForPayment } = require('../controllers/order_controller');
const { createPayment } = require('../controllers/payment_controller');

router.post(
    '/verify-payment',
    verifyPayment,
    getOrderForPayment,
    createPayment
);




module.exports = router;