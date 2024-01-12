import { useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import { useConsumersContext } from "../hooks/useConsumersContext"
import { GetMenuItems } from '../api/GetMenuItems'

const ConsumerProfileSettings = ({ consumer }) => {
    const { dispatch } = useConsumersContext
    const { user } = useAuthContext()

    // Pull in menu items 
    let menuItems = GetMenuItems().menuItems

    // Update
    const [username, setUsername] = useState(consumer.username)
    const [firstName, setFirstName] = useState(consumer.firstName)
    const [lastName, setLastName] = useState(consumer.lastName)
    const [email, setEmail] = useState(consumer.email)
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])  

    const update = async () => {
        
        if (!user) {
            return
        }

        const c = {username, firstName, lastName, email}

        const response = await fetch('/api/consumers/' + consumer._id, {
            method: 'PATCH',
            body: JSON.stringify(c),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            console.log('consumer updated', json)
            dispatch({type: 'UPDATE_CONSUMER', payload: json})
        }

        closeForm()
    }

    // Hide/unhide form
    const [open, setOpen] = useState(false)

    const openForm = () => {
        setOpen(true)
    }

    const closeForm = () => {
        setOpen(false)
    }

    return (
        <div className="consumer-details">
            {!open && (<>
                <p><strong>Username: </strong>{consumer.username}</p>
                <p><strong>Email: </strong>{consumer.email}</p>
                <p><strong>First Name: </strong>{consumer.firstName}</p>
                <p><strong>Last Name: </strong>{consumer.lastName}</p>
                <p><strong>Favorite Meals: </strong></p>
                {menuItems && menuItems.filter(menuItem => {
                    if (consumer.favorites.includes(menuItem._id)){
                        return menuItem
                    }
                    return false
                }).map((menuItem) => (<p key={menuItem._id}><li>{menuItem.name}</li></p>))}
                <button onClick={openForm}>Edit</button>
            </>)}

            {open && <form onSubmit={update}>
                <label htmlFor="username">Username:</label>
                <input
                    id="username"
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    className={emptyFields.includes('username') ? 'error' : ''}
                />

                <label htmlFor="firstName">First Name:</label>
                <input
                    id="firstName"
                    type="text"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    className={emptyFields.includes('firstName') ? 'error' : ''}
                />

                <label htmlFor="lastName">Last Name:</label>
                <input
                    id="lastName"
                    type="text"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    className={emptyFields.includes('lastName') ? 'error' : ''}
                />
                
                <label htmlFor="email">Email:</label>
                <input
                    id="email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    className={emptyFields.includes('email') ? 'error' : ''}
                />
                
                <button>Save</button>
                {error && <div className="error">{error}</div>}
                <button id="close" onClick={closeForm}>Close</button>  
            </form>}
        </div>
    )
}

export default ConsumerProfileSettings