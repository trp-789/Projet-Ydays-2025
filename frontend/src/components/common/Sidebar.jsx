import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { cartItems = [] } = useCart();
  const itemCount = cartItems.reduce((total, item) => total + (item.quantity || 0), 0);

  const categories = [
    { name: 'Toutes les boutiques', icon: '🏪', path: '/' },
    { name: 'Vêtements', icon: '👕', path: '/category/vetements' },
    { name: 'Chaussures', icon: '👟', path: '/category/chaussures' },
    { name: 'Accessoires', icon: '👜', path: '/category/accessoires' },
    { name: 'Manteaux', icon: '🧥', path: '/category/manteaux' },
    { name: 'Pulls', icon: '🧶', path: '/category/pulls' },
    { name: 'Jeans', icon: '👖', path: '/category/jeans' },
    { name: 'Robes', icon: '👗', path: '/category/robes' },
    { name: 'Sportswear', icon: '🏃', path: '/category/sportswear' }
  ];

  const userMenu = [
    { name: 'Mes Commandes', icon: '📦', path: '/orders' },
    { name: 'Mes Favoris', icon: '❤️', path: '/favorites' },
    { name: 'Mes Adresses', icon: '🏠', path: '/addresses' },
    { name: 'Paiement', icon: '💳', path: '/payment' },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:z-auto
      `}>
        
        {/* Header */}
        <div className="bg-primary-500 text-white p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="bg-white text-primary-500 p-2 rounded-lg">
                <span className="text-xl">👤</span>
              </div>
              <div>
                <p className="font-semibold">Bonjour !</p>
                <p className="text-primary-100 text-sm">Connectez-vous</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="md:hidden text-white hover:text-primary-200"
            >
              ✕
            </button>
          </div>

          {/* Panier rapide */}
          <Link 
            to="/cart" 
            className="bg-white text-primary-600 rounded-lg p-3 flex items-center justify-between font-medium"
            onClick={onClose}
          >
            <span>🛒 Voir mon panier</span>
            {itemCount > 0 && (
              <span className="bg-primary-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                {itemCount} articles
              </span>
            )}
          </Link>
        </div>

        {/* Contenu */}
        <div className="h-[calc(100vh-200px)] overflow-y-auto">
          {/* Menu utilisateur */}
          <div className="p-4 border-b border-blue-50">
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">MON COMPTE</h3>
            <nav className="space-y-1">
              {userMenu.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? 'bg-primary-50 text-primary-600 border-r-2 border-primary-500'
                      : 'text-gray-700 hover:bg-blue-50'
                  }`}
                  onClick={onClose}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Catégories */}
          <div className="p-4">
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">CATÉGORIES</h3>
            <nav className="space-y-1">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  to={category.path}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    location.pathname === category.path
                      ? 'bg-primary-50 text-primary-600 border-r-2 border-primary-500'
                      : 'text-gray-700 hover:bg-blue-50'
                  }`}
                  onClick={onClose}
                >
                  <span className="text-lg">{category.icon}</span>
                  <span className="font-medium">{category.name}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-blue-50">
          <button className="flex items-center space-x-3 px-3 py-2 text-gray-500 hover:text-gray-700 w-full text-left">
            <span className="text-lg">❓</span>
            <span className="font-medium">Aide & Support</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;