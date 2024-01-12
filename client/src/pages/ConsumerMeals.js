import { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { GetMenuItems } from '../api/GetMenuItems'
import { GetConsumer } from '../api/GetConsumer'
import Favorites from '../components/Favorites'

const ConsumerMeals = () => {
    const { user } = useAuthContext()
    const [query, setQuery] = useState('')
    

    if (!user) {
        return
    }

    let menuItem = GetMenuItems().menuItems
    let consumer = GetConsumer().consumer
    let favorites = []
    if (consumer) {
        favorites = consumer.favorites
    }

    return (
        <div className="consumerDash">
            <h1>Favorites</h1>
            <input placeholder="Search for Menu Items by Name..." onChange={event => setQuery(event.target.value)}/>
           
            {menuItem && menuItem.filter(menuItem => {
                if (favorites.includes(menuItem._id)) {
                    if (query === "" || menuItem.name.toLowerCase().includes(query.toLowerCase())) {
                        return menuItem
                   }
                }
                return false
            }).map((menuItem) => (
                <Favorites key={menuItem._id} menuItem={menuItem} adminView={false} favoritesView={true} />
            ))}
        </div>
    )
}

export default ConsumerMeals