const express = require('express')
const router = express.Router()
const itemController = require('./../Controllers/itemController')
const authController = require('./../Controllers/authController')
const cartController = require('./../Controllers/cartConrtoller')


router
.route('/signup')
.post(authController.signUp)

router
.route('/login')
.post(authController.login)

router
.route('/cart')
.post(cartController.addToCart)

router
.route('/top-cheapest-items')
.get(itemController.cheapestItems, itemController.getAllItems)

router
.route('/')
.get(itemController.getAllItems)
.post(authController.protect, authController.restrictTo('admin'), itemController.addItem)


router
.route('/:id')
.get(itemController.getItem)
.patch(authController.protect, authController.restrictTo('admin'), itemController.updateItem)
.delete(authController.protect, authController.restrictTo('admin'), itemController.deleteItem)




module.exports = router;