import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

const CartPage = () => {
  const { cartItems, updateQuantity, removeItem, getCartTotal, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-16">
        <div className="bg-white rounded-2xl shadow-md p-12 text-center max-w-md w-full">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold mb-2">Votre panier est vide</h2>
          <p className="text-gray-600 mb-6">Ajoutez des produits depuis les boutiques</p>
          <Link to="/" className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
            Découvrir les boutiques
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Votre panier</h1>
          <button onClick={clearCart} className="text-sm px-3 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100">Tout vider</button>
        </div>

        <div className="space-y-4">
          {cartItems.map(item => (
            <div key={item.id} className="bg-white rounded-2xl shadow-sm p-4 flex items-center gap-4">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />

              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-lg truncate">{item.name}</h4>
                <p className="text-gray-500">{item.price}€</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  aria-label={`Retirer une unité de ${item.name}`}
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-lg font-medium"
                >
                  −
                </button>

                <div className="px-4 py-2 border rounded-md text-sm bg-gray-50">{item.quantity}</div>

                <button
                  aria-label={`Ajouter une unité de ${item.name}`}
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-lg font-medium"
                >
                  +
                </button>
              </div>

              <div className="flex flex-col items-end gap-2">
                <div className="text-lg font-bold">{(item.price * item.quantity).toFixed(2)}€</div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-sm px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-white rounded-2xl shadow-sm p-6 flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between w-64">
              <span className="text-gray-600">Sous-total</span>
              <span className="font-medium">{getCartTotal().toFixed(2)}€</span>
            </div>
            <div className="flex items-center justify-between w-64">
              <span className="text-gray-600">Frais de livraison</span>
              <span className="font-medium">2.50€</span>
            </div>
            <div className="flex items-center justify-between w-64 text-xl font-bold">
              <span>Total</span>
              <span>{(getCartTotal() + 2.50).toFixed(2)}€</span>
            </div>
          </div>

          <button className="px-6 py-3 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700">Commander • {(getCartTotal() + 2.50).toFixed(2)}€</button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;