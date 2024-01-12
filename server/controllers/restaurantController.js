const Restaurant = require('../models/restaurantModel')
const mongoose = require('mongoose')

// get all restaurants
const getRestaurants = async (req, res) => {
    const restaurants = await Restaurant.find({}).sort({createdAt: -1})
    res.status(200).json(restaurants)
}

//get a single restaurant
const getRestaurant = async (req, res) => {
    cosnt = { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such restaurant'})
    }

    const restaurant = await Restaurant.findById(id)

    if (!restaurant) {
        return res.status(404).json({error: 'No such restaurant'})
    }

    res.status(200).json(restaurant)
}


// create new restaurant
const createRestaurant = async (req, res) => {
    const {name, location, cuisineType} = req.body

    let emptyFields = []

    if (!name) {
        emptyFields.push('name')
    }
    if (!location) {
        emptyFields.push('location')
    }
    if (!cuisineType) {
        emptyFields.push('cuisineType')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all required fields', emptyFields })
    }

    // add doc to database
    try {
        const restaurant = await Restaurant.create({name, location, cuisineType})
        res.status(200).json(restaurant)
    } catch (error) {
        response.status(400).json({error: error.message})
    }
}

//delete a restaurant
const deleteRestaurant = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such restaurant'})
    }

    const restaurant = await Restaurant.findOneAndDelete({_id: id})

    if (!restaurant) {
        return res.status(404).json({error: 'No such restaurant'})
    }

    res.status(200).json(restaurant)
}

//update a restaurant
const updateRestaurant = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such restaurant'})
    }

    const restaurant = await Restaurant.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!restaurant) {
        return res.status(404).json({error: 'No such restaurant'})
    }

    res.status(200).json(restaurant)
}

module.exports = {
    getRestaurants,
    getRestaurant,
    createRestaurant,
    deleteRestaurant,
    updateRestaurant
}