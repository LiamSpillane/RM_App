import { useState } from 'react'
import { useSignup } from '../hooks/useSignup'
import { useLogout } from '../hooks/useLogout'
import { useLogin } from '../hooks/useLogin'

const Signup = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const {signup, error, isLoading} = useSignup()
    const {login} = useLogin()
    const {logout} = useLogout()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(username, password, firstName, lastName, email)
        
        logout()
        login(email, password)
    }

    return (
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Sign up</h3>

            <label>Username:</label>
            <input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
            />

            <label>Password:</label>
            <input 
                type="password"
                placeholder='8+ characters, including at least 1 uppercase, lowercase, number, and special character.'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />

            <label>First Name:</label>
            <input
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
            />

            <label>Last Name:</label>
            <input
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
            />

            <label>Email:</label>
            <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />

            <button disabled={isLoading}>Sign up</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Signup