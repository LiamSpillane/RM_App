import { useAuthContext } from './useAuthContext'
import { useConsumersContext } from './useConsumersContext'

export const useLogout = () => {
    const { dispatch: authDispatch } = useAuthContext()
    const { dispatch: consumersDispatch } = useConsumersContext()
    
    const logout = () => {
        // remove user from storage
        localStorage.removeItem('user')

        // dispatch logout action
        authDispatch({type: 'LOGOUT'})
        consumersDispatch({type: 'SET_CONSUMERS', payload: null})
    }

    return {logout}
}