import { useAuthContext } from '../hooks/useAuthContext'
import { useLocation } from 'react-router-dom'
import { GetMenuItems } from '../api/GetMenuItems'


const ConsumerProfile = () => {
    const { user } = useAuthContext()
    const location = useLocation()
    const { consumer } = location.state

    // Pull in menuItems
    let menuItems = GetMenuItems().menuItems

    if (!user) {
        return
    }

    return (
        <div className='consumer-profile'>

            <div className='consumer-header'>
                <h1>{consumer.firstName} {consumer.lastName}</h1>
                <p><strong>@{consumer.username}</strong></p>
            </div>

            <div className='row'>
                <div className='column'>
                    <h2>Personal Info:</h2>
                    <p>{consumer.email}</p>
                    <p>Password: {consumer.password}</p>
                    <p>Favorited Meals:
                    {menuItems && menuItems.filter(menuItem => {
                        if (consumer.favorites.includes(menuItem._id)){
                            return menuItem
                        }
                        return false
                    }).map((menuItem) => (<t key={menuItem._id}><li>{menuItem.name}</li></t>))}
                    </p>
                </div>
                <div className='column'>
                    <h2>Dietary Information:</h2>
                    <p>Price Limit:  {"$" + consumer.price.toFixed(2)}</p>
                    <p>Calorie Range: {consumer.caloriesLower} -- {consumer.caloriesUpper}</p>
                    <p>Allergens: {consumer.allergens.map(a => <li key={a}>{a}</li>)}</p>
                </div>
            </div>
        </div>

    )
}

export default ConsumerProfile