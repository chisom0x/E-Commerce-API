const Item = require('./../Models/itemModel')
const ApiFeatures = require('./../utils/apiFeatures')


exports.getAllItems = async (req, res) => {
    const features = new ApiFeatures(Item.find(), req.query).filter()
    const items = await features.query
    res.json({
        data: {
            items
        }
        
    })
}
exports.addItem = async (req, res) => {
    const newitem = await Item.create(req.body)
        res.status(200).json({
            message: 'successful',
            data: 
                newitem
            
        })
}
exports.updateItem = async (req, res) => {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json({
        message: 'succesfull',
        data: {
            item
        }
    })
}
exports.deleteItem = async (req, res) => {
    const item = await Item.findByIdAndDelete(req.params.id, req.body)
    res.status(200).json({
        message: 'item deleted successfully',
    })
}
exports.getItem = async (req, res) => {
    const item = await Item.findById(req.params.id)
    res.status(200).json({
        data: {
            item
        }
    })
}
exports.cheapestItems = async (req, res, next) => {
    const limit = req.query.limit || 10
    const items = await Item.find().sort({price: 1}).limit(parseInt(limit))
    next()
}

