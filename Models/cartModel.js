const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    itemID:{
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Item',
       required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
      },
      price: {
        type: Number,
        required: true
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
})



const CartItem = mongoose.model('CartItem', cartSchema);

module.exports = CartItem;