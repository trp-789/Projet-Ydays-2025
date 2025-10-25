import React from 'react';
import { useCart } from '../../hooks/useCart'; // IMPORT CORRIGÉ

const ProductCard = ({ product }) => {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(product);
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-info">
        <h4>{product.name}</h4>
        <p className="product-description">{product.description}</p>
        <div className="product-price">{product.price}€</div>
        <button className="btn-primary" onClick={handleAddToCart}>
          Ajouter au panier
        </button>
      </div>
    </div>
  );
};

export default ProductCard;