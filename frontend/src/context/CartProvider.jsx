import React, { useReducer, useState, useRef, useEffect } from 'react';
import { CartContext } from './CartContext';
import { supabase } from '../lib/supabaseClient';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

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

  // LocalStorage fallback
  const LOCAL_KEY = 'ydays_cart_local';

  const loadLocal = () => {
    try {
      const raw = localStorage.getItem(LOCAL_KEY)
      if (!raw) return []
      return JSON.parse(raw)
    } catch (e) {
      return []
    }
  }

  const saveLocal = (items) => {
    try {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(items))
    } catch (e) {}
  }

  // Load local cart on mount
  useEffect(() => {
    const local = loadLocal()
    if (local && local.length) {
      // initialize state with local items
      local.forEach(it => dispatch({ type: 'ADD_ITEM', payload: it }))
    }
  }, [])

  // Auth sync: merge local cart on sign-in and load server cart
  useEffect(() => {
    const subscription = supabase.auth.onAuthStateChange(async (event, session) => {
      try {
        if (event === 'SIGNED_IN' && session?.access_token) {
          const token = session.access_token
          const local = loadLocal()
          // send merge request if local has items
          if (local && local.length) {
            await fetch(`${API_BASE}/cart/merge`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
              },
              body: JSON.stringify({ items: local.map(i => ({ product_id: i.id, quantity: i.quantity })) })
            })
            // clear local after merge
            localStorage.removeItem(LOCAL_KEY)
          }

          // load server cart
          const resp = await fetch(`${API_BASE}/cart`, { headers: { Authorization: `Bearer ${token}` } })
          if (resp.ok) {
            const { items } = await resp.json()
            // Map server items to front-end shape: id = product_id
            dispatch({ type: 'CLEAR_CART' })
            items.forEach(it => {
              dispatch({ type: 'ADD_ITEM', payload: { id: it.product_id, price: Number(it.unit_price), name: it.product_name, image: it.product_image } })
              // then set correct quantity
              dispatch({ type: 'UPDATE_QUANTITY', payload: { id: it.product_id, quantity: it.quantity } })
            })
          }
        }

        if (event === 'SIGNED_OUT') {
          // persist current state to localStorage
          saveLocal(state.items)
        }
      } catch (e) {
        console.error('Cart sync error', e)
      }
    })

    return () => subscription?.data?.subscription?.unsubscribe && subscription.data.subscription.unsubscribe()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.items])

  // Auto-save to server when user is signed in (debounced)
  useEffect(() => {
    let timeout
    const save = async () => {
      try {
        const { data: session } = await supabase.auth.getSession()
        const token = session?.access_token
        if (!token) return

        const payload = state.items.map(i => ({ product_id: i.id, quantity: i.quantity }))
        await fetch(`${API_BASE}/cart`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ items: payload })
        })
      } catch (e) {
        console.error('Failed to save cart', e)
      }
    }

    // debounce
    timeout = setTimeout(save, 800)
    // also persist locally for guests
    saveLocal(state.items)

    return () => clearTimeout(timeout)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.items])

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