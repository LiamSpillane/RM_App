const MenuItem = require('../models/menuItemModel')
const mongoose = require('mongoose')

// get all menu items
const getMenuItems = async (req, res) => {
    const menuItems = await MenuItem.find({}).sort({createdAt: -1})
    res.status(200).json(menuItems)
}

// get a single menu item
const getMenuItem = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such menu item'})
    }

    const menuItem = await MenuItem.findById(id)

    if (!menuItem) {
        return res.status(404).json({error: 'No such menu item'})
    }

    res.status(200).json(menuItem)
}

// create a new menu item
const createMenuItem = async (req, res) => {
    const { name, ingredients, allergens, calories, price, restaurant } = req.body
    
    let emptyFields = []

    if (!name) {
        emptyFields.push('name')
    }
    if (!ingredients) {
        emptyFields.push('ingredients')
    }
    if (!allergens) {
        emptyFields.push('allergens')
    }
    if (!calories) {
        emptyFields.push('calories')
    }
    if (!price) {
        emptyFields.push('price')
    }
    if (!restaurant) {
        emptyFields.push('restaurant')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all required fields', emptyFields })
    }

    // add doc to db
    try {
        const menuItem = await MenuItem.create({ name, ingredients, allergens, calories, price, restaurant })
        res.status(200).json(menuItem)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete a consumer
const deleteMenuItem = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such menu item'})
    }

    const menuItem = await MenuItem.findOneAndDelete({_id: id})

    if (!menuItem) {
        return res.status(404).json({error: 'No such menu item'})
    }

    res.status(200).json(menuItem)
}

// update a consumer
const updateMenuItem = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such menu item'})
    }

    const menuItem = await MenuItem.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!menuItem) {
        return res.status(404).json({error: 'No such menu item'})
    }

    res.status(200).json(menuItem)
}

module.exports = {
    getMenuItems,
    getMenuItem,
    createMenuItem,
    deleteMenuItem,
    updateMenuItem
}