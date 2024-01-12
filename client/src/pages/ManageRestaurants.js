import { useState } from 'react'
import RestaurantDetails from '../components/RestaurantDetails'
import RestaurantForm from '../components/RestaurantForm'
import { GetRestaurants } from '../api/GetRestaurants'

const ManageRestaurant = () => {
    const [query, setQuery] = useState("")

    let restaurants = GetRestaurants().restaurants
    
    return (
        <div className="manageRestuarants">
            <h2>Restaurants</h2>
            <input placeholder="Enter Restaurant..." onChange={event => setQuery(event.target.value)}/>
            <RestaurantForm />
            {restaurants && restaurants.filter(restaurant => {
                if (query === '') {
                    return restaurant
                }
                else if (restaurant.name.toLowerCase().includes(query.toLowerCase())) {
                    return restaurant
                }
                return false
            }).map((restaurant) => (
                <RestaurantDetails key={restaurant._id} restaurant={restaurant} adminView={true}/>
            ))}
        </div>
    )
}

export default ManageRestaurant