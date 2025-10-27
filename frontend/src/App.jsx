import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CartProvider from './context/CartProvider';
import Layout from './components/common/Layout';
import Home from './pages/Home';
import ShopDetail from './pages/ShopDetail';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import './index.css';
import Login from './pages/Login';
import Register from './pages/Register'
import { AuthProvider, useAuth } from './context/AuthProvider';
import { Navigate } from 'react-router-dom';

// Pages temporaires pour le menu gauche
const Orders = () => (
  <div className="container py-8">
    <h1 className="text-3xl font-bold text-gray-800 mb-4">Mes Commandes</h1>
    <p className="text-gray-600">Page en développement</p>
  </div>
);

const Favorites = () => (
  <div className="container py-8">
    <h1 className="text-3xl font-bold text-gray-800 mb-4">Mes Favoris</h1>
    <p className="text-gray-600">Page en développement</p>
  </div>
);

const Addresses = () => (
  <div className="container py-8">
    <h1 className="text-3xl font-bold text-gray-800 mb-4">Mes Adresses</h1>
    <p className="text-gray-600">Page en développement</p>
  </div>
);

const Payment = () => (
  <div className="container py-8">
    <h1 className="text-3xl font-bold text-gray-800 mb-4">Moyens de Paiement</h1>
    <p className="text-gray-600">Page en développement</p>
  </div>
);

const Help = () => (
  <div className="container py-8">
    <h1 className="text-3xl font-bold text-gray-800 mb-4">Aide</h1>
    <p className="text-gray-600">Page en développement</p>
  </div>
);

const Settings = () => (
  <div className="container py-8">
    <h1 className="text-3xl font-bold text-gray-800 mb-4">Paramètres</h1>
    <p className="text-gray-600">Page en développement</p>
  </div>
);

// Composant ProtectedRoute pour vérifier l'authentification
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          {/* AJOUT DU LAYOUT ICI - il enveloppe toutes les routes */}


          <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
          </Routes>

          <Layout>
            
            <Routes>
              <Route path="/" element={<Home />} />

              
              {/* Routes protégées */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } />
              <Route path="/cart" element={
                <ProtectedRoute>
                  <CartPage />
                </ProtectedRoute>
              } />
              <Route path="/checkout" element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              } />
              <Route path="/orders" element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              } />
              <Route path="/favorites" element={
                <ProtectedRoute>
                  <Favorites />
                </ProtectedRoute>
              } />
              <Route path="/addresses" element={
                <ProtectedRoute>
                  <Addresses />
                </ProtectedRoute>
              } />
              <Route path="/payment" element={
                <ProtectedRoute>
                  <Payment />
                </ProtectedRoute>
              } />
              <Route path="/help" element={
                <ProtectedRoute>
                  <Help />
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } />

              {/* Routes publiques */}
              <Route path="/shop/:id" element={<ShopDetail />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/category/:category" element={<Home />} />
            </Routes>
          </Layout>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;