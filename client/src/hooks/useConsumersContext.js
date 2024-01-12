import { ConsumersContext } from '../context/ConsumerContext'
import { useContext } from 'react'

export const useConsumersContext = () => {
    const context = useContext(ConsumersContext)

    if (!context) {
        throw Error('useConsumersContext must be used inside a ConsumersContextProvider')
    }

    return context
}