const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    category: {
        type: String,
        required: [true, 'please add a category']
    },
    item: {
        type: String,
        required: [true, 'please add aN ITEM']
    },
    price: {
        type: Number,
        required: [true, 'please add a price']
    },
    description:{
        type: String,
        required: [true, 'please add a description']
    }
})

itemSchema.index({category: 'text', item: 'text' })

const Item = new mongoose.model('Item', itemSchema)
module.exports = Item;