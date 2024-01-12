import { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useRestaurantsContext } from '../hooks/useRestaurantsContext'

const RestaurantForm = () => {
    const { dispatch } = useRestaurantsContext()
    const { user } = useAuthContext()
    
    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const [cuisineType, setCuisineType] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in')
            return
        }

        const restaurant = {name, location, cuisineType}
        
        const response = await fetch('/api/restaurants', {
            method: 'POST',
            body: JSON.stringify(restaurant),
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
            setLocation('')
            setCuisineType('')
            setError(null)
            setEmptyFields([])
            console.log('new restaurant added', json)
            dispatch({type: 'CREATE_RESTAURANT', payload: json})
        }
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
        <div>
            <button onClick={openForm}>Add New Restaurant</button>
            {open && <form className="create" onSubmit={handleSubmit}>
                <h3>Add a New Restaurant</h3>

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
                    <option value={null}>Select</option>
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

                <button>Add Restaurant</button>
                {error && <div className="error">{error}</div>}
                <button id="close" onClick={closeForm}>Close</button>
            </form>}
        </div>
    )
}

export default RestaurantForm