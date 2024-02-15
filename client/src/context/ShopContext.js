import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

// Create context outside of the component
const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const { user } = useAuth();

  const storedCart = user
    ? JSON.parse(localStorage.getItem(`cart_${user._id}`)) || []
    : [];
  const storedFavorites = user
    ? JSON.parse(localStorage.getItem(`favorites_${user._id}`)) || []
    : [];
  const [cartItems, setCartItems] = useState(storedCart);
  const [favorites, setFavorites] = useState(storedFavorites);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`cart_${user._id}`, JSON.stringify(cartItems));
      localStorage.setItem(`favorites_${user._id}`, JSON.stringify(favorites));
    }
  }, [cartItems, favorites, user]);

  const addToCart = (product) => {
    const existingItemIndex = cartItems.findIndex(
      (item) => item._id === product._id
    );

    if (existingItemIndex !== -1) {
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity += 1;
      setCartItems(updatedCart);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (item) => {
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem._id === item._id
    );

    if (existingItemIndex !== -1) {
      const updatedCart = [...cartItems];

      if (updatedCart[existingItemIndex].quantity > 1) {
        updatedCart[existingItemIndex].quantity -= 1;
      } else {
        updatedCart.splice(existingItemIndex, 1);
      }

      setCartItems(updatedCart);
    }
  };

  const clearCart = () => {
    if (user) {
      localStorage.removeItem(`cart_${user._id}`);
    }
    setCartItems([]);
  };

  const addToFavorites = (product) => {
    const existingItemIndex = favorites.findIndex(
      (item) => item._id === product._id
    );

    if (existingItemIndex === -1) {
      setFavorites([...favorites, product]);
    }
  };

  const removeFromFavorites = (product) => {
    const updatedFavorites = favorites.filter(
      (item) => item._id !== product._id
    );
    setFavorites(updatedFavorites);
  };

  const clearFavorites = () => {
    if (user) {
      localStorage.removeItem(`favorites_${user._id}`);
    }
    setFavorites([]);
  };

  const value = {
    cartItems,
    favorites,
    addToCart,
    removeFromCart,
    clearCart,
    addToFavorites,
    removeFromFavorites,
    clearFavorites,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export const useShop = () => {
  // Use the same context created outside of the component
  return useContext(ShopContext);
};
