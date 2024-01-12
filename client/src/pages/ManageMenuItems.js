import { useState } from 'react'
import MenuItemDetails from '../components/MenuItemDetails'
import MenuItemForm from '../components/MenuItemForm'
import { GetMenuItems } from '../api/GetMenuItems'

const ManageMenuItem = () => {
    const [query, setQuery] = useState("")

    let menuItems = GetMenuItems().menuItems
    
    return (
        <div className="manageMenuItems">
            <h2>Menu Items</h2>
            <input placeholder="Enter Item..." onChange={event => setQuery(event.target.value)}/>
            <MenuItemForm />
            {menuItems && menuItems.filter(menuItem => {
                if (query === '') {
                    return menuItem
                }
                else if (menuItem.name.toLowerCase().includes(query.toLowerCase())) {
                    return menuItem
                }
                return false
            }).map((menuItem) => (
                <MenuItemDetails key={menuItem._id} menuItem={menuItem} adminView={true}/>
            ))}
        </div>        
    )
}

export default ManageMenuItem