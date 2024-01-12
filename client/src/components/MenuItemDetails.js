import { useState } from "react"
import { Link } from "react-router-dom"
import { useMenuItemsContext } from "../hooks/useMenuItemsContext"
import { useAuthContext } from "../hooks/useAuthContext"
import { GetRestaurants } from "../api/GetRestaurants"

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow"

const MenuItemDetails = ({ menuItem, adminView }) => {
    const { dispatch } = useMenuItemsContext()
    const { user } = useAuthContext()

    // Delete
    const handleDelete = async () => {
        if (!user) {
            return
        }
        
        const response = await fetch('/api/menuItems/' + menuItem._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_MENUITEM', payload: json})
        }
    }

    // Update
    const [name, setName] = useState(menuItem.name)
    const [ingredients, setIngredients] = useState(menuItem.ingredients)
    const [allergens, setAllergens] = useState(menuItem.allergens)
    const [calories, setCalories] = useState(menuItem.calories)
    const [price, setPrice] = useState(menuItem.price)
    const [restaurant, setRestaurant] = useState(menuItem.restaurant)
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const update = async (e) => {
        e.preventDefault()
        const mi = {name, ingredients, allergens, calories, price, restaurant}

        mi.ingredients = mi.ingredients.toString().split(',')
        mi.allergens = mi.allergens.toString().split(',')

        if (calories < 0) {
            setError('Please enter a valid value for calories')
            return
        }

        if (price < 0) {
            setError('Please enter a valid value for price')
            return
        }

        window.location.reload()

        const response = await fetch('/api/menuItems/' + menuItem._id, {
            method: 'PATCH',
            body: JSON.stringify(mi),
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
            console.log('menuItem updated', json)
            dispatch({type: 'UPDATE_MENUITEM', payload: json})
        }

        closeForm()
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
        <div className="menuItem-details">
            {!open && (<>
            <Link to={`/ManageMenuItem/${menuItem.name}`} className='link' state={{menuItem: menuItem}}><strong><h4>{menuItem.name}</h4></strong></Link>
                <p><strong>Ingredients:</strong></p>
                <ul>{menuItem.ingredients.map(i => <li key={i}>{i}</li>)}</ul>
                <p><strong>Allergens:</strong></p>
                <ul>{menuItem.allergens.map(a => <li key={a}>{a}</li>)}</ul>
                <p><strong>Calories: </strong>{menuItem.calories}</p>
                <p><strong>Price: </strong>{"$" + menuItem.price.toFixed(2)}</p>
                
                {restaurants && restaurants.filter(restaurant=> {
                    if (menuItem.restaurant === restaurant._id) {
                        return restaurant
                    } return false
                }).map((restaurant) =>  (
                    <p key={restaurant._id}><strong>Restaurant: </strong>{restaurant.name}</p>
                ))}

                <p>{formatDistanceToNow(new Date(menuItem.createdAt), { addSuffix: true })}</p>
                {adminView &&(<>
                    <div className="parent">
                        <button className="material-symbols-outlined" onClick={openForm}>Edit</button>
                        <button className="material-symbols-outlined" onClick={handleDelete}>delete</button>
                    </div>

                </>)}
            </>)}

            {open && <form onSubmit={update}>
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

                <button>Save</button>
                {error && <div className="error">{error}</div>}
                <button id="close" onClick={closeForm}>Close</button>
            </form>}
        </div>
    )
}

export default MenuItemDetails