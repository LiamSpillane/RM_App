import { useAuthContext } from '../hooks/useAuthContext'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { GetRestaurants } from '../api/GetRestaurants'


const MenuItemProfile = () => {
    const { user } = useAuthContext()
    const location = useLocation()
    const { menuItem } = location.state

// get restaurant info 
let restaurants = GetRestaurants().restaurants

    if (!user) {
        return
    }

    return (    
        <div className='item-profile'>

            <div className='item-header'>
                <h1>{menuItem.name}</h1>                
                {restaurants && restaurants.filter(restaurant => {
                    if (menuItem.restaurant === restaurant._id) {
                        return restaurant
                    }
                    return false
                }).map((restaurant) => (
                    <Link to={`/ManageRestaurant/${restaurant.name}`} className='link' state={{restaurant: restaurant}} key={restaurant._id}><strong><p>{restaurant.name}</p></strong></Link>
                ))}
            </div>

            <div className='row'>
                {/* <div className='column'>
                    <h2>Maybe Picture:</h2>
                </div> */}

                <div className='column'>
                    <h2>Food Information:</h2>
                    <p>Price: {"$" + menuItem.price.toFixed(2)}</p>
                    <p>Calories: {menuItem.calories}</p>
                    <p>Ingredients: {menuItem.ingredients.map(i => <li key={i}>{i}</li>)}</p>
                    <p>Allergens: {menuItem.allergens.map(a => <li key={a}>{a}</li>)}</p>
                </div>
            </div>
        </div>
    )
}

export default MenuItemProfile