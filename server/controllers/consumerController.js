const Consumer = require('../models/consumerModel')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

/* USER AUTHENTICATION */
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// login user
const loginUser = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await Consumer.login(email, password)
        const isAdmin = user.isAdmin
        const id = user._id
        const username = user.username

        // create a token
        const token = createToken(user._id)

        res.status(200).json({id, username, email, token, isAdmin})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// signup user
const signupUser = async (req, res) => {
    const {username, password, firstName, lastName, email} = req.body

    try {
        const user = await Consumer.signup(username, password, firstName, lastName, email)

        // create a token
        const token = createToken(user._id)

        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// get all consumers
const getConsumers = async (req, res) => {
    const consumers = await Consumer.find({}).sort({createdAt: -1})
    res.status(200).json(consumers)
}

// get a single consumer
const getConsumer = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such consumer'})
    }

    const consumer = await Consumer.findById(id)

    if (!consumer) {
        return res.status(404).json({error: 'No such consumer'})
    }

    res.status(200).json(consumer)
}

// create a new consumer
const createConsumer = async (req, res) => {
    const { username, password, firstName, lastName, email, allergens, caloriesUpper, caloriesLower, price, favorites, isAdmin } = req.body
    
    let emptyFields = []

    if (!username) {
        emptyFields.push('username')
    }
    if (!password) {
        emptyFields.push('password')
    }
    if (!firstName) {
        emptyFields.push('firstName')
    }
    if (!lastName) {
        emptyFields.push('lastName')
    }
    if (!email) {
        emptyFields.push('email')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all required fields', emptyFields })
    }

    // add doc to db
    try {
        const consumer = await Consumer.create({ username, password, firstName, lastName, email, allergens, caloriesUpper, caloriesLower, price, favorites, isAdmin, })
        res.status(200).json(consumer)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete a consumer
const deleteConsumer = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such consumer'})
    }

    const consumer = await Consumer.findOneAndDelete({_id: id})

    if (!consumer) {
        return res.status(404).json({error: 'No such consumer'})
    }

    res.status(200).json(consumer)
}

// update a consumer
const updateConsumer = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such consumer'})
    }

    const consumer = await Consumer.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!consumer) {
        return res.status(404).json({error: 'No such consumer'})
    }

    res.status(200).json(consumer)
}

module.exports = {
    loginUser,
    signupUser,
    getConsumers,
    getConsumer,
    createConsumer,
    deleteConsumer,
    updateConsumer
}