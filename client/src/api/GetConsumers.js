import { useConsumersContext } from '../hooks/useConsumersContext'
import { useEffect } from 'react'

// GET ALL CONSUMERS
export const GetConsumers = () => {
    const {consumers, dispatch} = useConsumersContext()

    useEffect(() => {
        const fetchConsumers = async () => {
            const response = await fetch('/api/consumers')
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_CONSUMERS', payload: json})
            }
        }

        fetchConsumers()
    }, [dispatch])
    
    return { consumers };
}