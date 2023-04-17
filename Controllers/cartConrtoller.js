
const CartItem = require('./../Models/cartModel');

exports.addToCart =  async (req, res, next) => {
    const doc = await CartItem.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  };


