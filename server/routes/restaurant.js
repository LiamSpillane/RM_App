const express = require('express')
const {
    createRestaurant,
    getRestaurant,
    getRestaurants,
    deleteRestaurant,
    updateRestaurant
} = require('../controllers/restaurantController')

const restaurantRouter = express.Router()

// GET all restaurants
restaurantRouter.get('/', getRestaurants)

// GET a single restaurant
restaurantRouter.get('/:id', getRestaurant)

// POST a new restaurant
restaurantRouter.post('/', createRestaurant)

// DELETE a restaurant
restaurantRouter.delete('/:id', deleteRestaurant)

// PATCH (update) a restaurant
restaurantRouter.patch('/:id', updateRestaurant)

module.exports = restaurantRouter