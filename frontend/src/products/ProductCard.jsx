import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

const ProductCard = ({ product }) => {
  const { addItem } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault(); // Empêche la navigation
    e.stopPropagation(); // Empêche la propagation du clic
    addItem(product);
  };

  return (
    <Link 
      to={`/product/${product.id}`} 
      className="block group"
    >
      <div className="product-card bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer">
        {/* Image avec overlay au survol */}
        <div className="relative overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
          
          {/* Bouton ajouter au panier */}
          <button
            onClick={handleAddToCart}
            className="absolute bottom-4 right-4 bg-white hover:bg-gray-100 text-gray-900 px-4 py-2 rounded-full font-medium shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 flex items-center space-x-2"
          >
            <span>🛒</span>
            <span>Ajouter</span>
          </button>
        </div>

        {/* Informations produit */}
        <div className="p-4">
          <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
            {product.name}
          </h4>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="text-lg font-bold text-purple-600">
              {product.price}€
            </div>
            
            {/* Badge livraison */}
            <div className="flex items-center space-x-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
              <span>🚗</span>
              <span>30min</span>
            </div>
          </div>

          {/* Boutique */}
          {product.shop && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs">
                  🏪
                </div>
                <span className="text-xs text-gray-500">{product.shop.name}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;