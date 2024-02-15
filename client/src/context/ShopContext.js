import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

// Create context outside of the component
const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Update stored cart and favorites data when user changes
    if (user) {
      const storedCart =
        JSON.parse(localStorage.getItem(`cart_${user._id}`)) || [];
      const storedFavorites =
        JSON.parse(localStorage.getItem(`favorites_${user._id}`)) || [];
      setCartItems(storedCart);
      setFavorites(storedFavorites);
    }
  }, [user]);

  const updateCartLocalStorage = (cart) => {
    if (user) {
      localStorage.setItem(`cart_${user._id}`, JSON.stringify(cart));
    }
  };

  const updateFavoritesLocalStorage = (favorites) => {
    if (user) {
      localStorage.setItem(`favorites_${user._id}`, JSON.stringify(favorites));
    }
  };

  const addToCart = (product) => {
    const existingItemIndex = cartItems.findIndex(
      (item) => item._id === product._id
    );

    if (existingItemIndex !== -1) {
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity += 1;
      setCartItems(updatedCart);
      updateCartLocalStorage(updatedCart);
    } else {
      const updatedCart = [...cartItems, { ...product, quantity: 1 }];
      setCartItems(updatedCart);
      updateCartLocalStorage(updatedCart);
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
      updateCartLocalStorage(updatedCart);
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
      const updatedFavorites = [...favorites, product];
      setFavorites(updatedFavorites);
      updateFavoritesLocalStorage(updatedFavorites);
    }
  };

  const removeFromFavorites = (product) => {
    const updatedFavorites = favorites.filter(
      (item) => item._id !== product._id
    );
    setFavorites(updatedFavorites);
    updateFavoritesLocalStorage(updatedFavorites);
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
