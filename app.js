const express = require('express');
const router = require('./authroutes')
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/authapi', router);


module.exports = app;