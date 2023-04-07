const express = require('express')
const router = express.Router()
const authController = require('./authController')

router
.route('/')
.get(authController.demo)

router
.route('/signup')
.post(authController.signUp)

router
.route('/login')
.post(authController.login)




module.exports = router;