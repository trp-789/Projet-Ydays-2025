import React from 'react';
import { useParams } from 'react-router-dom';
import { useShop } from '../hooks/useShop'; // Correction : useShop au lieu de useShops
import ProductList from '../components/products/ProductList';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ShopDetail = () => {
  const { id } = useParams();
  const { shop, loading, error } = useShop(id); // Correction : useShop au lieu de useShops

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error">Erreur: {error}</div>;
  if (!shop) return <div>Boutique non trouvée</div>;

  return (
    <div className="shop-detail">
      <div className="shop-header">
        <div className="container">
          <img src={shop.image} alt={shop.name} className="shop-header-image" />
          <div className="shop-info">
            <h1>{shop.name}</h1>
            <p className="shop-category">{shop.category}</p>
            <p className="shop-description">{shop.description}</p>
            <div className="shop-meta">
              <span className="rating">⭐ {shop.rating}</span>
              <span className="delivery-time">🕒 {shop.delivery_time}</span>
              <span className="delivery-fee">🚴 {shop.delivery_fee}</span>
              <span className="min-order">💰 Min. {shop.minimum_order}€</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container">
        <h2>Produits</h2>
        <ProductList products={shop.products || []} />
      </div>
    </div>
  );
};

export default ShopDetail;