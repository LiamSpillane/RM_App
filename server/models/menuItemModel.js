const mongoose = require('mongoose')

const Schema = mongoose.Schema

const menuItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    ingredients: {
        type: [String],
        required: true
    },
    allergens: {
        type: [String],
        required: true
    },
    calories: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    restaurant: {
        type: String,
        required: true
    }
    // image: {
    //     type: Blob,
    //     required: true
    // },
}, { timestamps: true })

module.exports = mongoose.model('MenuItem', menuItemSchema)