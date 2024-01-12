import { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useMenuItemsContext } from '../hooks/useMenuItemsContext'
import { GetRestaurants } from '../api/GetRestaurants'

const MenuItemForm = () => {
    const { dispatch } = useMenuItemsContext()
    const { user } = useAuthContext()
    
    const [name, setName] = useState('')
    const [ingredients, setIngredients] = useState('')
    const [allergens, setAllergens] = useState('')
    const [calories, setCalories]  = useState('')
    const [price, setPrice] = useState('')
    const [restaurant, setRestaurant] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in')
            return
        }

        const menuItem = {name, ingredients, allergens, calories, price, restaurant}

        menuItem.ingredients = menuItem.ingredients.split(',')
        menuItem.allergens = menuItem.allergens.split(',')

        if (calories < 0) {
            setError('Please enter a valid value for calories')
            return
        }

        if (price < 0) {
            setError('Please enter a valid value for price')
            return
        }


        const response = await fetch('/api/menuItems', {
            method: 'POST',
            body: JSON.stringify(menuItem),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setName('')
            setIngredients('')
            setAllergens('')
            setCalories('')
            setPrice('')
            setRestaurant('')
            setError(null)
            setEmptyFields([])
            console.log('new menuItem added', json)
            dispatch({type: 'CREATE_MENUITEM', payload: json})
        }
    }

    // pull in restaurants
    let restaurants = GetRestaurants().restaurants

    // hide/unhide form
    const [open, setOpen] = useState(false)

    const openForm = () => {
        setOpen(true)
    }

    const closeForm = () => {
        setOpen(false)
    }

    return (
        <div>
            <button onClick={openForm}>Add New Menu Item</button>
            {open && <form className="create" onSubmit={handleSubmit}>
                <h3>Add a New Menu Item</h3>

                <label htmlFor="name">Item Name:</label>
                <input
                    id="name"
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    className={emptyFields.includes('name') ? 'error' : ''}
                />
                
                <label htmlFor="ingredients">Ingredients:</label>
                <input
                    id="ingredients"
                    type="text"
                    placeholder="Ensure comma-space between ingredients"
                    onChange={(e) => setIngredients(e.target.value)}
                    value={ingredients}
                    className={emptyFields.includes('ingredients') ? 'error' : ''}
                />

                <label htmlFor="allergens">Allergens:</label>
                <input
                    id="allergens"
                    type="text"
                    placeholder="Ensure comma-space between allergens"
                    onChange={(e) => setAllergens(e.target.value)}
                    value={allergens}
                    className={emptyFields.includes('allergens') ? 'error' : ''}
                />

                <label htmlFor="calories">Calories:</label>
                <input
                    id="calories"
                    type="number"
                    onChange={(e) => setCalories(e.target.value)}
                    value={calories}
                    className={emptyFields.includes('calories') ? 'error' : ''}
                />

                <label htmlFor="price">Price:</label>
                <input
                    id="price"
                    type="number"
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                    className={emptyFields.includes('price') ? 'error' : ''}
                />

                <label htmlFor="restaurant">Restaurant:</label>
                <select
                    id="restaurant"
                    onChange={(e) => setRestaurant(e.target.value)}
                    value={restaurant}
                    className={emptyFields.includes('restaurant') ? 'error' : ''}
                >
                    <option value={''}>Select</option>
                    {restaurants.map(r => <option key={r._id} value={r._id}>{r.name}</option>)}
                </select>

                <button>Add Menu Item</button>
                {error && <div className="error">{error}</div>}
                <button id="close" onClick={closeForm}>Close</button>
            </form>}
        </div>
    )
}

export default MenuItemForm