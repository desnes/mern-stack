const mongoose = require('mongoose')

const Schema = mongoose.Schema

const stockSchema = new Schema({
    symbol: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    purchaseDate: {
        type: Date,
        required: true
    },
    pricePerShare: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    purchasePrice: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Stock', stockSchema)
    

