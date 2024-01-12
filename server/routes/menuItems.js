const express = require('express')
const {
    getMenuItems,
    getMenuItem,
    createMenuItem,
    deleteMenuItem,
    updateMenuItem
} = require('../controllers/menuItemController')

const menuItemRouter = express.Router()

// GET all menuItems
menuItemRouter.get('/', getMenuItems)

// GET a single menuItem
menuItemRouter.get('/:id', getMenuItem)

// POST a new menuItem
menuItemRouter.post('/', createMenuItem)

// DELETE a menuItem
menuItemRouter.delete('/:id', deleteMenuItem)

// PATCH (update) a menuItem
menuItemRouter.patch('/:id', updateMenuItem)

module.exports = menuItemRouter