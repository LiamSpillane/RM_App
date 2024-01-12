import { useState } from "react"
import { useConsumersContext } from "../hooks/useConsumersContext"
import { useAuthContext } from "../hooks/useAuthContext"
import { Link } from "react-router-dom"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { GetMenuItems } from '../api/GetMenuItems'


const ConsumerDetails = ({ consumer }) => {
    const { dispatch } = useConsumersContext()
    const { user } = useAuthContext()

    // Pull in menuItems
    let menuItems = GetMenuItems().menuItems

    // Delete
    const handleClick = async () => {
        if (!user) {
            return
        }

        const response = await fetch('/api/consumers/' + consumer._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_CONSUMER', payload: json})
        }
    }

    // Update
    const [username, setUsername] = useState(consumer.username)
    const [firstName, setFirstName] = useState(consumer.firstName)
    const [lastName, setLastName] = useState(consumer.lastName)
    const [email, setEmail] = useState(consumer.email)
    const [allergens, setAllergens] = useState(consumer.allergens)
    const [caloriesUpper, setCaloriesUpper] = useState(consumer.caloriesUpper)
    const [caloriesLower, setCaloriesLower] = useState(consumer.caloriesLower)
    const [price, setPrice] = useState(consumer.price)
    const [favorites, setFavorites] = useState(consumer.favorites)
    const [isAdmin, setIsAdmin] = useState(consumer.isAdmin)
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])  

    const update = async (e) => {
        e.preventDefault()
        const c = {username, firstName, lastName, email, allergens, caloriesUpper, caloriesLower, price, favorites, isAdmin}

        c.allergens = c.allergens.toString().split(',')
        c.favorites = c.favorites.toString().split(',')

        if (caloriesUpper < 0) {
            setError('Please enter a valid value for calories upper limit')
            return
        }

        if (caloriesLower < 0) {
            setError('Please enter a valid value for calories lower limit')
            return
        }

        if (caloriesUpper < caloriesLower) {
            setError('Your calories upper limit may not be lower than your calories lower limit')
            return
        }

        if (price < 0) {
            setError('Please enter a valid value for price limit')
            return
        }

        window.location.reload()

        const response = await fetch('/api/consumers/' + consumer._id, {
            method: 'PATCH',
            body: JSON.stringify(c),
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
            console.log('consumer updated', json)
            dispatch({type: 'UPDATE_CONSUMER', payload: json})
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
        <div className="consumer-details">
            {!open && (<>
            <Link to={`/ManageConsumer/${consumer.username}`} className='link' state={{consumer: consumer}}><strong><h4>{consumer.username}</h4></strong></Link>
                <p><strong>Password: </strong>{consumer.password}</p>
                <p><strong>First Name: </strong>{consumer.firstName}</p>
                <p><strong>Last Name: </strong>{consumer.lastName}</p>
                <p><strong>Email: </strong>{consumer.email}</p>
                <p><strong>Allergens: </strong></p>
                <ul>{consumer.allergens.map(a => <li key={a}>{a}</li>)}</ul>
                <p><strong>Calories Upper Limit: </strong>{consumer.caloriesUpper}</p>
                <p><strong>Calories Lower Limit: </strong>{consumer.caloriesLower}</p>
                <p><strong>Price Limit: </strong>{"$" + consumer.price.toFixed(2)}</p>
                <p><strong>Favorite Meals: </strong></p>
                {menuItems && menuItems.filter(menuItem => {
                    if (consumer.favorites.includes(menuItem._id)){
                        return menuItem
                    }
                    return false
                }).map((menuItem) => (<p key={menuItem._id}><li>{menuItem.name}</li></p>))}
                <p><strong>Is Admin: </strong>{String(consumer.isAdmin)}</p>
                <p>{formatDistanceToNow(new Date(consumer.createdAt), { addSuffix: true })}</p>
                <button className="material-symbols-outlined" onClick={openForm}>Edit</button>
                <button className="material-symbols-outlined" onClick={handleClick}>delete</button>
            </>)}

            {open && <form onSubmit={update}>
                <label htmlFor="username">Username:</label>
                <input
                    id="username"
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    className={emptyFields.includes('username') ? 'error' : ''}
                />

                <label htmlFor="firstName">First Name:</label>
                <input
                    id="firstName"
                    type="text"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    className={emptyFields.includes('firstName') ? 'error' : ''}
                />

                <label htmlFor="lastName">Last Name:</label>
                <input
                    id="lastName"
                    type="text"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    className={emptyFields.includes('lastName') ? 'error' : ''}
                />
                
                <label htmlFor="email">Email:</label>
                <input
                    id="email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    className={emptyFields.includes('email') ? 'error' : ''}
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
                
                <label htmlFor="caloriesUpper">Calories Upper Limit:</label>
                <input
                    id="caloriesUpper"
                    type="number"
                    onChange={(e) => setCaloriesUpper(e.target.value)}
                    value={caloriesUpper}
                    className={emptyFields.includes('caloriesUpper') ? 'error' : ''}
                />
                
                <label htmlFor="caloriesLower">Calories Lower Limit:</label>
                <input
                    id="caloriesLower"
                    type="number"
                    onChange={(e) => setCaloriesLower(e.target.value)}
                    value={caloriesLower}
                    className={emptyFields.includes('caloriesLower') ? 'error' : ''}
                />
                
                <label htmlFor="price">Price Limit:</label>
                <input
                    id="price"
                    type="number"
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                    className={emptyFields.includes('price') ? 'error' : ''}
                />

                <label htmlFor="favorites">Favorite Meals:</label>
                <input
                    id="favorites"
                    type="text"
                    placeholder="Ensure comma-space between allergens"
                    onChange={(e) => setFavorites(e.target.value)}
                    value={favorites}
                    className={emptyFields.includes('favorites') ? 'error' : ''}
                />

                <label htmlFor="isAdmin">Is Admin:</label>
                <select
                    id="isAdmin"
                    onChange={(e) => setIsAdmin(e.target.value)}
                    value={isAdmin}
                    className={emptyFields.includes('isAdmin') ? 'error' : ''}
                >
                    <option value="true">True</option>
                    <option value="false">False</option>
                </select>
                
                <button>Save</button>
                {error && <div className="error">{error}</div>}
                <button id="close" onClick={closeForm}>Close</button>    
            </form>}
        </div>
    )
}

export default ConsumerDetails