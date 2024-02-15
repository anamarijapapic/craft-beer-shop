import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Home from './components/common/Home';
import CustomNavbar from './components/common/Navbar';
import Cart from './components/common/Cart';
import RegisterForm from './components/auth/RegisterForm';
import LoginForm from './components/auth/LoginForm';
import Breweries from './components/breweries/Breweries';
import BreweryDetails from './components/breweries/BreweryDetails';
import CreateBrewery from './components/breweries/CreateBrewery';
import EditBrewery from './components/breweries/EditBrewery';
import Beers from './components/beers/Beers';
import BeerDetails from './components/beers/BeerDetails';
import CreateBeer from './components/beers/CreateBeer';
import EditBeer from './components/beers/EditBeer';
import Users from './components/users/Users';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  return user ? children : <Navigate to="/login" />;
};

function App() {
  const { user } = useAuth();
  return (
    <BrowserRouter>
      {user && <CustomNavbar />}
      <Routes>
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        {/* Breweries */}
        <Route
          path="/breweries"
          element={
            <PrivateRoute>
              <Breweries />
            </PrivateRoute>
          }
        />
        <Route
          path="/breweries/:id"
          element={
            <PrivateRoute>
              <BreweryDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/breweries/create"
          element={
            <PrivateRoute>
              <CreateBrewery />
            </PrivateRoute>
          }
        />
        <Route
          path="/breweries/edit/:id"
          element={
            <PrivateRoute>
              <EditBrewery />
            </PrivateRoute>
          }
        />

        {/* Beers */}
        <Route
          path="/beers"
          element={
            <PrivateRoute>
              <Beers />
            </PrivateRoute>
          }
        />
        <Route
          path="/beers/:id"
          element={
            <PrivateRoute>
              <BeerDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="beers/create"
          element={
            <PrivateRoute>
              <CreateBeer />
            </PrivateRoute>
          }
        />
        <Route
          path="/beers/edit/:id"
          element={
            <PrivateRoute>
              <EditBeer />
            </PrivateRoute>
          }
        />

        {/* Users */}
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <Users />
            </PrivateRoute>
          }
        />

        {/* Cart */}
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
