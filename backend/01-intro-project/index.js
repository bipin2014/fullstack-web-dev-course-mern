const express = require('express');

const app = express()

const hostname = '127.0.0.1';
const port = 5000;

app.get('/', (req, res) => {
  console.log(req.headers);
  // res.send('Hello, Welcome to Tech With Bipin Channel')
  res.status(200).json({ message: 'Hello, Welcome to Tech With Bipin Channel' })
})

app.get('/home', (req, res) => {
  console.log(req.headers);
  // res.send('Hello, Welcome to Tech With Bipin Channel')
  res.status(200).json({ message: 'Hello, Welcome to FSWD Express jscourse' })
})

app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

ul5WzXIo6ts9Nl7N