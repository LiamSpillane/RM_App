const express = require('express')
const {
    loginUser,
    signupUser,
    getConsumers,
    getConsumer,
    createConsumer,
    deleteConsumer,
    updateConsumer
} = require('../controllers/consumerController')

const consumerRouter = express.Router()

/* USER AUTHENTICATION */
// LOGIN user
consumerRouter.post('/login', loginUser)

// SIGNUP user
consumerRouter.post('/signup', signupUser)

// GET all consumers
consumerRouter.get('/', getConsumers)

// GET a single consumer
consumerRouter.get('/:id', getConsumer)

// POST a new consumer
consumerRouter.post('/', createConsumer)

// DELETE a consumer
consumerRouter.delete('/:id', deleteConsumer)

// PATCH (update) a consumer
consumerRouter.patch('/:id', updateConsumer)

module.exports = consumerRouter