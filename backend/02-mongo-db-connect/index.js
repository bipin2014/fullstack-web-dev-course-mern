const express = require('express');
const mongoose = require('mongoose');
const userRoute = require('./routes/users')

const app = express()

const hostname = '127.0.0.1';
const port = 5000;


app.use(express.json())
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb+srv://admin:k5k3CCSIrzI3p0dc@youtubecluster.mt2bkwq.mongodb.net/?retryWrites=true&w=majority')
    .then(res => {
        console.log("Connected to DB Sucessfully");
    }).catch(err => {
        console.log(err);
    })
// k5k3CCSIrzI3p0dc

app.use('/api/users', userRoute)

app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});