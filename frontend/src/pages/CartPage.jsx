import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

const CartPage = () => {
  const { cartItems, updateQuantity, removeItem, getCartTotal, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="empty-cart">
            <div className="empty-icon">🛒</div>
            <h2>Votre panier est vide</h2>
            <p>Ajoutez des produits depuis les boutiques</p>
            <Link to="/" className="btn-primary">
              Découvrir les boutiques
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-header">
          <h1>Votre panier</h1>
          <button onClick={clearCart} className="clear-cart">
            Tout vider
          </button>
        </div>

        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="item-image" />
              
              <div className="item-info">
                <h4 className="item-name">{item.name}</h4>
                <p className="item-price">{item.price}€</p>
              </div>

              <div className="quantity-controls">
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="quantity-btn"
                >
                  -
                </button>
                <span className="quantity">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="quantity-btn"
                >
                  +
                </button>
              </div>

              <button 
                onClick={() => removeItem(item.id)}
                className="remove-btn"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <div className="cart-footer">
          <div className="cart-total">
            <div className="total-line">
              <span>Sous-total</span>
              <span>{getCartTotal().toFixed(2)}€</span>
            </div>
            <div className="total-line">
              <span>Frais de livraison</span>
              <span>2.50€</span>
            </div>
            <div className="total-line total">
              <span>Total</span>
              <span>{(getCartTotal() + 2.50).toFixed(2)}€</span>
            </div>
          </div>

          <button className="checkout-btn">
            Commander • {(getCartTotal() + 2.50).toFixed(2)}€
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;