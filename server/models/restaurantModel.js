const mongoose = require('mongoose')

const Schema = mongoose.Schema

const restaurantSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    // image: {
    //     type: Blob,
    //     require: true
    // },
    cuisineType: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Restaurant', restaurantSchema)