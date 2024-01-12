require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const consumerRoutes = require('./routes/consumers')
const restaurantRoutes = require('./routes/restaurant')
const menuItemRoutes = require('./routes/menuItems')

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/consumers', consumerRoutes)
app.use('/api/restaurants', restaurantRoutes)
app.use('/api/menuItems', menuItemRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })