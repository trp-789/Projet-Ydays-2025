import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../hooks/useCart";
import { useDelivery } from "../../context/DeliveryContext";
import DeliveryToggle from "./DeliveryToggle";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const { deliveryMode, deliveryAddress } = useDelivery();
  const navigate = useNavigate();

  // Debug : voir ce que contient user
  console.log("User dans Header:", user);

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = async () => {
    try {
      await logout();
      setIsUserMenuOpen(false);
      setIsMenuOpen(false);
      navigate("/");
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  const getProfileImage = () => {
    // Essayer plusieurs sources d'image
    return user?.user_metadata?.avatar_url || 
           user?.user_metadata?.picture ||
           user?.user_metadata?.avatar ||
           `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.email || 'U')}&background=random`;
  };

  const getUserName = () => {
    return user?.user_metadata?.name ||
           user?.user_metadata?.full_name ||
           user?.user_metadata?.first_name + ' ' + user?.user_metadata?.last_name ||
           user?.email?.split('@')[0] ||
           'Utilisateur';
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <span className="text-2xl font-light tracking-wider text-gray-900">LocalStyle</span>
          </Link>

          {/* Toggle Livraison/Emporter - Desktop */}
          <div className="hidden md:flex flex-1 max-w-xs mx-8">
            <DeliveryToggle />
          </div>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-gray-900 font-light text-lg transition-colors tracking-wide">
              Accueil
            </Link>
            <Link to="/shops" className="text-gray-700 hover:text-gray-900 font-light text-lg transition-colors tracking-wide">
              Boutiques
            </Link>
          </nav>

          {/* Actions Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Adresse */}
            <button
              onClick={() => navigate("/dashboard?section=addresses")}
              className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              <div className="text-left max-w-32 truncate">
                <div className="font-medium text-xs">
                  {deliveryMode === 'delivery' ? 'Livrer à' : 'Récupérer à'}
                </div>
                <div className="text-xs text-gray-500 truncate">
                  {deliveryAddress?.address || '123 Rue de Paris...'}
                </div>
              </div>
            </button>

            {/* Panier */}
            <Link to="/cart" className="relative p-2 text-gray-700 hover:text-gray-900 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* Auth */}
            {user && user.id ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100"
                >
                  <img
                    src={getProfileImage()}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover border border-gray-200"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.email || 'U')}&background=random`;
                    }}
                  />
                  <span className="text-gray-700 font-light text-lg tracking-wide">
                    {getUserName()}
                  </span>
                </button>

                {/* Dropdown utilisateur */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-4 border-b border-gray-100">
                      <div className="flex items-center space-x-3">
                        <img
                          src={getProfileImage()}
                          alt="Profile"
                          className="w-10 h-10 rounded-full object-cover border border-gray-200"
                          onError={(e) => {
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.email || 'U')}&background=random`;
                          }}
                        />
                        <div>
                          <p className="font-medium text-gray-900 text-sm">
                            {getUserName()}
                          </p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-2">
                      <Link
                        to="/dashboard"
                        className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg text-sm"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <span>👤</span>
                        <span>Mon compte</span>
                      </Link>
                      
                      <Link
                        to="/orders"
                        className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg text-sm"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <span>📦</span>
                        <span>Mes commandes</span>
                      </Link>
                      
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 w-full px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg text-left text-sm"
                      >
                        <span>🚪</span>
                        <span>Déconnexion</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-700 hover:text-gray-900 font-light text-lg tracking-wide">
                  Connexion
                </Link>
                <Link
                  to="/register"
                  className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-none font-light tracking-wide transition-colors"
                >
                  S'inscrire
                </Link>
              </div>
            )}
          </div>

          {/* Menu Mobile Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;