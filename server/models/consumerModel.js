const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const consumerSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    // profilePicture: {
    //     type: Blob,
    //     required: true
    // },
    email: {
        type: String,
        required: true
    },
    allergens: {
        type: [String],
        required: true
    },
    caloriesUpper: {
        type: Number,
        required: true
    },
    caloriesLower: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    favorites: {
        type: [String],
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    }
}, { timestamps: true })

// static signup method
consumerSchema.statics.signup = async function(username, password, firstName, lastName, email) {
    // validation
    if (!email || !password) {
        throw Error('All fields must be filled')
    }

    if (!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }

    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
    }
    
    const exists = await this.findOne({ email })

    if (exists) {
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    // default values
    const allergens = ['']
    const caloriesUpper = 2000
    const caloriesLower = 0
    const price = 50
    const favorites = ['']
    const isAdmin = false

    const user = await this.create({ username, password: hash, firstName, lastName, email, allergens, caloriesUpper, caloriesLower, price, favorites, isAdmin })

    return user
}

// static login method
consumerSchema.statics.login = async function(email, password) {
    if (!email || !password) {
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({ email })

    if (!user) {
        throw Error('Incorrect email')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('Incorrect password')
    }

    return user
}

module.exports = mongoose.model('Consumer', consumerSchema)