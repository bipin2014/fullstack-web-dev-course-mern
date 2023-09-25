const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const brandRoute = require('./routes/brand');
const productRoute = require('./routes/product');
const uploadFileRoute = require('./routes/upload-file');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
const esewaRoute = require('./routes/esewa');

const app = express()
var cors = require('cors');

const hostname = '127.0.0.1';
const port = 5000;


app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.options('*', cors());

mongoose.connect('mongodb+srv://admin:k5k3CCSIrzI3p0dc@youtubecluster.mt2bkwq.mongodb.net/?retryWrites=true&w=majority')
    .then(res => {
        console.log("Connected to DB Sucessfully");
    }).catch(err => {
        console.log(err);
    })
// k5k3CCSIrzI3p0dc

app.use('/api/users', authRoute);
app.use('/api/users', userRoute);
app.use('/api/brands', brandRoute);
app.use('/api/products', productRoute);
app.use('/api/upload-files', uploadFileRoute);
app.use('/api/carts', cartRoute);
app.use('/api/orders', orderRoute);
app.use('/api/esewa', esewaRoute);

app.use(`/api/uploads`, express.static('uploads'));

app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});