import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: 'Accueil', href: '/', icon: '🏠' },
    { name: 'Boutiques', href: '/shops', icon: '🏪' },
    { name: 'Produits', href: '/products', icon: '👕' },
    { name: 'Panier', href: '/cart', icon: '🛒' },
    ...(user ? [{ name: 'Tableau de bord', href: '/dashboard', icon: '📊' }] : []),
    { name: 'À propos', href: '/about', icon: 'ℹ️' },
  ];

  const isActiveLink = (href) => {
    return location.pathname === href;
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="lg:hidden fixed bottom-6 right-6 z-50 bg-primary-500 text-white p-4 rounded-full shadow-lg hover:bg-primary-600 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '✕' : '☰'}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:sticky top-0 left-0 h-screen lg:h-auto
        bg-white shadow-xl lg:shadow-none z-40
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        w-64 lg:w-full
      `}>
        <div className="p-6 lg:p-0">
          {/* Logo */}
          <div className="flex items-center space-x-3 mb-8 lg:mb-6">
            <div className="text-2xl">🛍️</div>
            <span className="text-xl font-bold text-primary-600">LocalShop</span>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={`
                  flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-200
                  ${isActiveLink(item.href)
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'
                  }
                `}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* User section */}
          {user && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-3 px-4 py-3">
                <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  {user.email?.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user.email}
                  </p>
                  <p className="text-xs text-gray-500">En ligne</p>
                </div>
              </div>
            </div>
          )}

          {/* CTA Vendeur */}
          <div className="mt-8 p-4 bg-primary-50 rounded-lg">
            <p className="text-sm text-gray-700 mb-3">
              Vous êtes créateur ?
            </p>
            <Link
              to="/vendor-signup"
              onClick={() => setIsOpen(false)}
              className="block w-full bg-primary-500 hover:bg-primary-600 text-white text-center py-2 px-4 rounded-lg font-medium transition-colors text-sm"
            >
              Devenir vendeur
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;