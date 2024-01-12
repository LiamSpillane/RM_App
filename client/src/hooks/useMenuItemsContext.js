import { MenuItemsContext } from '../context/MenuItemContext'
import { useContext } from 'react'

export const useMenuItemsContext = () => {
    const context = useContext(MenuItemsContext)

    if (!context) {
        throw Error('useMenuItemsContext must be used inside a MenuItemsContextProvider')
    }

    return context
}