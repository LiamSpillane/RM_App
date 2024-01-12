import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    let isAdmin = false
    if (user) {
        isAdmin = user.isAdmin
    }

    const handleClick = () => {
        logout()
    }
    
    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Restaurant Menu App</h1>
                </Link>
                <nav>
                    {isAdmin && (
                        <div className='dropdown'>
                            <button className='dropbtn'>Admin</button>
                            <div className='dropdown-content'>
                                <Link to="/ManageMenuItem">
                                    <h2>Manage Menu Items</h2>
                                </Link>
                                <Link to="/ManageRestaurant">
                                    <h2>Manage Restaurants</h2>
                                </Link>
                                <Link to="/ManageConsumer">
                                    <h2>Manage Consumers</h2>
                                </Link>
                            </div>
                        </div>
                    )}
                    {user && (
                        <div>
                            <div className='dropdown'>
                                <button className="dropbtn">Menu</button>
                                <div className="dropdown-content">
                                    <Link to="/">
                                        <h2>Dashboard</h2>
                                    </Link>
                                    <Link to="/Favorites">
                                        <h2>Favorites</h2>
                                    </Link>
                                    <Link to="/Settings">
                                        <h2>Settings</h2>
                                    </Link>
                                </div>
                            </div>
                            <div>
                                <span>{user.username}</span>
                                <button onClick={handleClick}>Logout</button>
                            </div>
                        </div>
                    )}
                    {!user && (
                        <div>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Signup</Link>                            
                        </div>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Navbar