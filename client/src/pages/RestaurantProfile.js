import { useAuthContext } from '../hooks/useAuthContext'
import { useLocation } from 'react-router-dom'
import { GetMenuItems } from '../api/GetMenuItems'
import { GetConsumer } from '../api/GetConsumer'
import Favorites from '../components/Favorites'

const RestaurantProfile = () => {
    const { user } = useAuthContext()
    const location = useLocation()
    const { restaurant } = location.state

    let isAdmin = false;
    let isUser = true;

    if (user) {
        isAdmin = user.isAdmin
        isUser = !(user.isAdmin) //not needed but fun :)
    }

    if (!user) {
        return
    }

    let menuItems = GetMenuItems().menuItems
    let consumer = GetConsumer().consumer

    return (    
        <div className='res-profile'>
            <div className='res-header'>
                <h1>{restaurant.name}</h1>
            </div>

            <div className='row'>
                <div className='column'>
                    <h2>Menu: </h2>
                    {menuItems && consumer && menuItems.filter(menuItem => {
                        if (menuItem.restaurant !== restaurant._id) {
                            return false
                        }
                        if (menuItem.allergens.some(allergen => consumer.allergens.map(a => a.toLowerCase().trim()).includes(allergen.toLowerCase().trim()))) {
                            if (menuItem.allergens[0] !== '' && consumer.allergens[0] !== '')
                            {
                                return false
                            }
                        }
                        if (menuItem.calories > consumer.caloriesUpper || menuItem.calories < consumer.caloriesLower || menuItem.price >consumer.price){
                            return false
                        }
                        return menuItem
                    }).map((menuItem) => (
                        <Favorites key={menuItem._id} menuItem={menuItem} adminView={isAdmin} favoritesView={isUser}/>
                    ))}
                </div>
                <div className='column'>
                    <h2>Restaurant Information:</h2>
                    <p>Location: {restaurant.location}</p>
                    <p>Cuisine Type: {restaurant.cuisineType}</p>
                </div>
            </div>
        </div>
    )
}

export default RestaurantProfile