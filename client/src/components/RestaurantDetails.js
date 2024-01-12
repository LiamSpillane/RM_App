import { useRestaurantsContext } from "../hooks/useRestaurantsContext"
import { useAuthContext } from "../hooks/useAuthContext"
import { Link } from "react-router-dom"
import { useState } from "react"

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const RestaurantDetails = ({ restaurant, adminView }) => {
    const { dispatch } = useRestaurantsContext()
    const { user } = useAuthContext()

    // Delete
    const handleClick = async () => {
        if (!user) {
            return
        }

        const response = await fetch('/api/restaurants/' + restaurant._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_RESTAURANT', payload: json})
        }
    }

    // Update
    const [name, setName] = useState(restaurant.name)
    const [location, setLocation] = useState(restaurant.location)
    const [cuisineType, setCuisineType] = useState(restaurant.cuisineType)
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const update = async () => {
        const r = {name, location, cuisineType}

        const response = await fetch('/api/restaurants/' + restaurant._id, {
            method: 'PATCH',
            body: JSON.stringify(r),
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
            console.log('restaurant updated', json)
            dispatch({type: 'UPDATE_RESTAURANT', payload: json})
        }

        closeForm()
    }

    // Hide/unhide form
    const [open, setOpen] = useState(false)

    const openForm = () => {
        setOpen(true)
    }

    const closeForm = () => {
        setOpen(false)
    }

    return (
        <div className="restaurant-details">
            {!open &&(<>
            <Link to={`/ManageRestaurant/${restaurant.name}`} className='link' state={{restaurant: restaurant}}><strong><h4>{restaurant.name}</h4></strong></Link>
                <p><strong>Location: </strong>{restaurant.location}</p>
                <p><strong>Cuisine Type: </strong>{restaurant.cuisineType}</p>
                <p>{formatDistanceToNow(new Date(restaurant.createdAt), { addSuffix: true })}</p>
                {adminView &&(<>
                    <button className="material-symbols-outlined" onClick={openForm}>Edit</button>
                    <button className="material-symbols-outlined" onClick={handleClick}>delete</button>
                </>)}
            </>)}

            {open && <form onSubmit={update}>
                <label htmlFor="name">Restaurant Name:</label>
                <input
                    id="name"
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    className={emptyFields.includes('name') ? 'error' : ''}
                />

                <label htmlFor="location">Location:</label>
                <select
                    id="location"
                    onChange={(e) => setLocation(e.target.value)}
                    value={location}
                    className={emptyFields.includes('location') ? 'error' : ''}
                >
                    <option value="commons">Commons 1</option>
                    <option value="jfl">Library</option>
                    <option value="montview">Montview</option>
                    <option value="north">North</option>
                    <option value="other">Other</option>
                </select>

                <label htmlFor="cuisineType">Cuisine Type:</label>
                <select
                    id="cuisineType"
                    onChange={(e) => setCuisineType(e.target.value)}
                    value={cuisineType}
                    className={emptyFields.includes('cuisineType') ? 'error' : ''}
                >
                    <option value={null}>Select</option>
                    <option value="asian">Asian</option>
                    <option value="breakfast">Breakfast</option>
                    <option value="burgers">Burgers</option>
                    <option value="chicken">Chicken</option>
                    <option value="drinks">Drinks</option>
                    <option value="mediterranean">Mediterranean</option>
                    <option value="mexican">Mexican</option>
                    <option value="other">Other</option>
                    <option value="pizza">Pizza</option>
                    <option value="salads">Salads</option>
                    <option value="sandwiches">Sandwiches</option>
                </select>

                <button>Save</button>
                {error && <div className="error">{error}</div>}
                <button id="close" onClick={closeForm}>Close</button>
            </form>}
        </div>
    )
}

export default RestaurantDetails