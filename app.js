const express = require('express');
const router = require('./Routes/itemRoute')
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/ecommerce', router);


module.exports = app;