import { useConsumersContext } from '../hooks/useConsumersContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { useEffect } from 'react'

// GET CURRENT CONSUMER
export const GetConsumer = () => {
    const {consumers: consumer, dispatch} = useConsumersContext()
    const { user } = useAuthContext()
    const id = user.id

    useEffect(() => {
        const fetchConsumer = async () => {
            const response = await fetch('/api/consumers/' + id)
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'GET_CONSUMER', payload: json})
            }
        }

        fetchConsumer()
    }, [id, dispatch])

    return { consumer }
}