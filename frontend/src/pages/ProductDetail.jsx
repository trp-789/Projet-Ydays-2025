import React from 'react';
import { useParams } from 'react-router-dom';
import { useShop } from '../hooks/useShop';
import ProductList from '../products/ProductList';
import LoadingSpinner from '../components/LoadingSpinner';

const ShopDetail = () => {
  const { id } = useParams();
  const { shop, loading, error } = useShop(id);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error">Erreur: {error}</div>;
  if (!shop) return <div>Boutique non trouvée</div>;

  return (
    <div className="shop-detail-page">
      {/* En-tête de la boutique */}
      <div className="shop-header">
        <div className="shop-cover">
          <img src={shop.image} alt={shop.name} className="cover-image" />
        </div>
        
        <div className="shop-info-header">
          <h1 className="shop-title">{shop.name}</h1>
          <p className="shop-category">{shop.category}</p>
          
          <div className="shop-meta">
            <div className="meta-item">
              <span className="star">⭐</span>
              <span>{shop.rating}</span>
            </div>
            <div className="meta-item">
              <span>🕒 {shop.delivery_time}</span>
            </div>
            <div className="meta-item">
              <span>🚴 {shop.delivery_fee}</span>
            </div>
            <div className="meta-item">
              <span>💰 Min. {shop.minimum_order}€</span>
            </div>
          </div>

          <p className="shop-description">{shop.description}</p>
        </div>
      </div>

      {/* Produits */}
      <div className="products-section">
        <div className="container">
          <h2 className="section-title">Menu</h2>
          <ProductList products={shop.products || []} />
        </div>
      </div>
    </div>
  );
};

export default ShopDetail;