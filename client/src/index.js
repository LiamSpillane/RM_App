import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { ConsumersContextProvider } from './context/ConsumerContext';
import { MenuItemsContextProvider } from './context/MenuItemContext';
import { RestaurantsContextProvider } from './context/RestaurantContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ConsumersContextProvider>
        <MenuItemsContextProvider>
          <RestaurantsContextProvider>
            <App />
          </RestaurantsContextProvider>
        </MenuItemsContextProvider>
      </ConsumersContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);