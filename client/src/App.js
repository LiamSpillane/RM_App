import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

// pages and components
import Navbar from './components/Navbar';
import ManageMenuItem from './pages/ManageMenuItems';
import ManageRestaurant from './pages/ManageRestaurants';
import ManageConsumer from './pages/ManageConsumers';
import ConsumerDash from './pages/ConsumerDash';
import ConsumerMeals from './pages/ConsumerMeals';
import ConsumerSettings from './pages/ConsumerSettings';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';

import ConsumerProfile from './pages/ConsumerProfile'; //It gives error that affects nothing 
import MenuItemProfile from './pages/MenuItemProfile';
import RestaurantProfile from './pages/RestaurantProfile';

// css imports
import './css/index.css';
import './css/Navbar.css'
import './css/ManageMenuItems.css';
import './css/ManageRestaurants.css';
import './css/ManageConsumers.css';
import './css/ConsumerProfile.css';
import './css/MenuItemProfile.css';
import './css/RestaurantProfile.css';

export function App() {
    const { user } = useAuthContext()

    const [token, setToken] = useState(null)

    useEffect(() => {
        if (localStorage.getItem("user") === null) {
            setToken(false)
        } else {
            setToken(true)
        }
    }, [])

    let isAdmin = false
    if (user) {
        isAdmin = user.isAdmin
    }

    return (
        <div className="App">
            {token !== null &&
                <BrowserRouter>
                    <Navbar />
                    <div className="pages">
                        <Routes>
                            {/* Admin Pages */}
                            <Route
                                exact path="/ManageMenuItem"
                                element={user && isAdmin ? <ManageMenuItem /> : <Navigate to="/login" />}
                            />
                            <Route
                                exact path="/ManageRestaurant"
                                element={user && isAdmin ? <ManageRestaurant /> : <Navigate to="/login" />}
                            />
                            <Route
                                exact path="/ManageConsumer"
                                element={user && isAdmin ? <ManageConsumer /> : <Navigate to="/login" />}
                            />


                            {/* Individual Pages */}
                            <Route
                                path="/ManageConsumer/:username"
                                element={user ? <ConsumerProfile /> : <Navigate to="/ManageConsumer"/>}
                            />

                            <Route
                                path="/ManageMenuItem/:name"  
                                element={user ? <MenuItemProfile /> : <Navigate to="/ManageMenuItem"/>}
                            />

                            <Route
                                path="/ManageRestaurant/:name"  
                                element={user ? <RestaurantProfile /> : <Navigate to="/ManageRestaurant"/>}
                            />

                            {/* Consumer Pages */}
                            <Route
                                exact path="/Favorites"
                                element={user ? <ConsumerMeals /> : <Navigate to="/login" />}
                            />
                            <Route
                                exact path="/Settings"
                                element={user ? <ConsumerSettings /> : <Navigate to="/login" />}
                            />

                            {/* Generic Pages */}
                            <Route
                                exact path="/"
                                element={user ? <ConsumerDash /> : <Navigate to="/login" />}
                            />
                            <Route
                                exact path="/login"
                                element={!user ? <Login /> : <Navigate to="/" />}
                            />
                            <Route
                                exact path="/signup"
                                element={!user ? <Signup /> : <Navigate to="/" />}
                            />
                            <Route
                                path="*"
                                element={<NotFound />}
                            />
                        </Routes>
                    </div>
                </BrowserRouter>
            }
        </div>
    )
}

export default App;