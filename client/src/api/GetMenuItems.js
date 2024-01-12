import { useMenuItemsContext } from '../hooks/useMenuItemsContext'
import { useEffect } from 'react'

// GET ALL MENUITEMS
export const GetMenuItems = () => {
    const {menuItems, dispatch} = useMenuItemsContext()

    useEffect(() => {
        const fetchMenuItems = async () => {
            const response = await fetch('/api/menuItems')
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_MENUITEMS', payload: json})
            }
        }

        fetchMenuItems()
    }, [dispatch])
    
    return { menuItems };
}