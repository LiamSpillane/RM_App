import { useRestaurantsContext } from '../hooks/useRestaurantsContext'
import { useEffect } from 'react'

// GET ALL RESTAURANTS
export const GetRestaurants = () => {
    const {restaurants, dispatch} = useRestaurantsContext()

    useEffect(() => {
        const fetchRestaurants = async () => {
            const response = await fetch('/api/restaurants')
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_RESTAURANTS', payload: json})
            }
        }

        fetchRestaurants()
    }, [dispatch])
    
    return { restaurants };
}