import { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { GetRestaurants } from '../api/GetRestaurants'
import RestaurantDetails from '../components/RestaurantDetails'

const ConsumerDash = () => {
    const { user } = useAuthContext()
    const [query, setQuery] = useState('')
    const [cuisineType, setCuisineType] = useState('all')
    const [location, setLocation] = useState('all')

    let restaurants = GetRestaurants().restaurants

    if (!user) {
        return
    }

    return (
        <div className="consumerDash">
            <h1>Dashboard</h1>
            <p>Click on a Restaurant to view its menu</p>
            <input placeholder="Search for Restaurant by Name..." onChange={event => setQuery(event.target.value)}/>
            <h4>Search Filters</h4>
            <h5>Cuisine Type</h5>
            <select
                name="cuisineType"
                id="cuisineType"
                onChange={event => setCuisineType(event.target.selectedOptions[0].value)}
            >
                <option value="all">All</option>
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

            <h5>Location</h5>
            <select
                name="location"
                id="location"
                onChange={event => setLocation(event.target.selectedOptions[0].value)}
            >
                <option value="all">All</option>
                <option value="commons">Commons 1</option>
                <option value="jfl">Library</option>
                <option value="montview">Montview</option>
                <option value="north">North</option>
                <option value="other">Other</option>
            </select>

            {restaurants && restaurants.filter(restaurant => {
                if (query === '') {
                    if (restaurant.cuisineType !== cuisineType && cuisineType !== 'all') {
                        return false
                    }
                    if (restaurant.location !== location && location !== 'all') {
                        return false
                    }
                    return restaurant
                }
                else if (restaurant.name.toLowerCase().includes(query.toLowerCase())) {
                    return restaurant
                }
                return false
            }).map((restaurant) => (
                <RestaurantDetails key={restaurant._id} restaurant={restaurant} adminView={false} />
            ))}
        </div>
    )
}

export default ConsumerDash