import { createContext, useReducer } from 'react'

export const ConsumersContext = createContext()

export const consumersReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CONSUMERS':
            return {
                consumers: action.payload
            }
        case 'GET_CONSUMER':
            return {
                consumers: action.payload
            }
        case 'CREATE_CONSUMER':
            return {
                consumers: [action.payload, ...state.consumers]
            }
        case 'UPDATE_CONSUMER':
            return {
                consumers: [action.payload, ...state.consumers]
            }
        case 'DELETE_CONSUMER':
            return {
                consumers: state.consumers.filter((w) => w._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const ConsumersContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(consumersReducer, {
        consumers: null
    })

    return (
        <ConsumersContext.Provider value={{...state, dispatch}}>
            { children }
        </ConsumersContext.Provider>
    )
}