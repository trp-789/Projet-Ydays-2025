import React, { useReducer, useState, useRef, useEffect } from 'react';
import { CartContext } from './CartContext';

// Reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }]
      };
    }

    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    }

    case 'UPDATE_QUANTITY': {
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    }

    case 'CLEAR_CART': {
      return {
        ...state,
        items: []
      };
    }

    default:
      return state;
  }
};

// Provider avec value obligatoire
const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  const [notification, setNotification] = useState({ visible: false, text: '' });
  const notifTimeout = useRef(null);

  const addItem = (product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
    // Affiche une notification courte
    setNotification({ visible: true, text: 'Ajouté au panier' });
    if (notifTimeout.current) clearTimeout(notifTimeout.current);
    notifTimeout.current = setTimeout(() => {
      setNotification({ visible: false, text: '' });
      notifTimeout.current = null;
    }, 2000);
  };

  const removeItem = (productId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeItem(productId);
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
    }
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getCartTotal = () => {
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // L'objet value est OBLIGATOIRE pour Context.Provider
  const value = {
    cartItems: state.items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getCartTotal
  };

  return (
    <CartContext.Provider value={value}>
      {children}

      {/* Notification simple affichée par le provider */}
      {notification.visible && (
        <div className="fixed right-4 bottom-6 z-50">
          <div className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg">
            {notification.text}
          </div>
        </div>
      )}
    </CartContext.Provider>
  );
};

// Export uniquement le composant Provider
export default CartProvider;