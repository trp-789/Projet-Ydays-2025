import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../hooks/useCart";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <span className="text-2xl font-light tracking-wider text-gray-900">StyleLocal</span>
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-12">
            <Link to="/" className="text-gray-700 hover:text-gray-900 font-light text-lg transition-colors tracking-wide">
              Accueil
            </Link>
            <Link to="/boutiques" className="text-gray-700 hover:text-gray-900 font-light text-lg transition-colors tracking-wide">
              Boutiques
            </Link>
            <Link to="/createurs" className="text-gray-700 hover:text-gray-900 font-light text-lg transition-colors tracking-wide">
              Créateurs
            </Link>
            <Link to="/a-propos" className="text-gray-700 hover:text-gray-900 font-light text-lg transition-colors tracking-wide">
              À propos
            </Link>
          </nav>

          {/* Actions Desktop */}
          <div className="hidden md:flex items-center space-x-6">
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

            {/* Auth - Seulement connexion/inscription pour les non-connectés */}
            {user ? (
              <div className="flex items-center space-x-6">
                <Link to="/dashboard" className="text-gray-700 hover:text-gray-900 font-light text-lg tracking-wide">
                  Mon compte
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-6">
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

        {/* Menu Mobile */}
        {isMenuOpen && (
          <div className="md:hidden py-6 border-t border-gray-200 bg-white">
            <nav className="flex flex-col space-y-6">
              <Link to="/" className="text-gray-700 hover:text-gray-900 font-light text-lg py-2" onClick={() => setIsMenuOpen(false)}>
                Accueil
              </Link>
              <Link to="/boutiques" className="text-gray-700 hover:text-gray-900 font-light text-lg py-2" onClick={() => setIsMenuOpen(false)}>
                Boutiques
              </Link>
              <Link to="/createurs" className="text-gray-700 hover:text-gray-900 font-light text-lg py-2" onClick={() => setIsMenuOpen(false)}>
                Créateurs
              </Link>
              <Link to="/a-propos" className="text-gray-700 hover:text-gray-900 font-light text-lg py-2" onClick={() => setIsMenuOpen(false)}>
                À propos
              </Link>
              
              <div className="pt-6 border-t border-gray-200 space-y-4">
                <Link to="/cart" className="flex items-center text-gray-700 hover:text-gray-900 font-light text-lg py-2" onClick={() => setIsMenuOpen(false)}>
                  Panier
                  {cartItemsCount > 0 && (
                    <span className="ml-2 bg-gray-900 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemsCount}
                    </span>
                  )}
                </Link>
                
                {user ? (
                  <Link to="/dashboard" className="block text-gray-700 hover:text-gray-900 font-light text-lg py-2" onClick={() => setIsMenuOpen(false)}>
                    Mon compte
                  </Link>
                ) : (
                  <>
                    <Link to="/login" className="block text-gray-700 hover:text-gray-900 font-light text-lg py-2" onClick={() => setIsMenuOpen(false)}>
                      Connexion
                    </Link>
                    <Link to="/register" className="block text-gray-700 hover:text-gray-900 font-light text-lg py-2" onClick={() => setIsMenuOpen(false)}>
                      S'inscrire
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;