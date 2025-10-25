import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems = [] } = useCart();
  const itemCount = cartItems.reduce((total, item) => total + (item.quantity || 0), 0);

  return (
    <header className="bg-white shadow-sm border-b border-blue-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-primary-500 text-white p-2 rounded-lg">
              <span className="text-xl">🛍️</span>
            </div>
            <span className="text-2xl font-bold text-primary-600">LocalShop</span>
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
            >
              🏪 Boutiques
            </Link>
            <Link 
              to="/cart" 
              className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 shadow-sm"
            >
              <span>🛒</span>
              <span>Panier</span>
              {itemCount > 0 && (
                <span className="bg-white text-primary-600 px-2 py-1 rounded-full text-xs font-bold">
                  {itemCount}
                </span>
              )}
            </Link>
          </nav>

          {/* Menu Burger Mobile */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden bg-primary-500 text-white p-2 rounded-lg"
          >
            ☰
          </button>
        </div>

        {/* Menu Mobile */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-blue-100 py-4">
            <nav className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-primary-600 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                🏪 Boutiques
              </Link>
              <Link 
                to="/cart" 
                className="bg-primary-500 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-between"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>🛒 Panier</span>
                {itemCount > 0 && (
                  <span className="bg-white text-primary-600 px-2 py-1 rounded-full text-xs font-bold">
                    {itemCount}
                  </span>
                )}
              </Link>



              <Link 
                to="/connexion" 
                className="bg-primary-500 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-between"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>🛒 Panier</span>
                {itemCount > 0 && (
                  <span className="bg-white text-primary-600 px-2 py-1 rounded-full text-xs font-bold">
                    {itemCount}
                  </span>
                )}
              </Link>



            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;