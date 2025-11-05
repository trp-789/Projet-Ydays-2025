import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useDelivery } from '../context/DeliveryContext';
import ShopList from '../components/shops/ShopList';
import { useShops } from '../hooks/useShops';
import LoadingSpinner from '../components/common/LoadingSpinner';
import SearchBar from '../components/common/SearchBar';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { deliveryMode, deliveryAddress } = useDelivery();
  const { user, loading: authLoading } = useAuth();
  
  const { shops, loading: shopsLoading, error } = useShops(selectedCategory, deliveryMode);

  const categories = [
    'Toutes',
    'Prêt-à-porter',
    'Accessoires',
    'Chaussures',
    'Maroquinerie',
    'Bijoux',
    'Vintage',
    'Créations uniques'
  ];

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50 pt-20">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 pt-20">
      <div className="text-center">
        <div className="text-6xl mb-4">😔</div>
        <h2 className="text-2xl font-bold text-blue-900 mb-4">Erreur de chargement</h2>
        <p className="text-blue-600 max-w-md">{error}</p>
      </div>
    </div>
  );

  return (
    <div className="home-page bg-blue-50 min-h-screen pt-20">
      {/* Hero Section - Dégradé avec VOS bleus */}
      <section className="bg-gradient-to-br from-blue-800 to-blue-900 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          {/* Logo et titre */}
          <div className=" flex justify-center items-center mb-6">
            <img 
              src="/localstyle.png" 
              alt="LocalStyle" 
              className="h-16 w-16 mr-3 rounded-xl"
            />
            <h1 className="text-4xl md:text-5xl font-bold">LocalStyle</h1>
          </div>

          {/* Message de bienvenue */}
          {user && user.id ? (
            <>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                Bonjour {user.user_metadata?.name || user.email?.split('@')[0] || 'Utilisateur'} 👋
              </h2>
              <p className="text-blue-200 text-lg mb-8 max-w-2xl mx-auto">
                {deliveryMode === 'delivery' 
                  ? 'Découvrez les créations locales livrées chez vous'
                  : 'Explorez les boutiques près de chez vous'
                }
              </p>
            </>
          ) : (
            <>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                {deliveryMode === 'delivery' ? 'Livraison rapide' : 'Retrait en boutique'}
              </h2>
              <p className="text-blue-200 text-lg mb-8 max-w-2xl mx-auto">
                {deliveryMode === 'delivery' 
                  ? 'Vos articles préférés des créateurs locaux, livrés en 30 minutes'
                  : 'Commandez en ligne et récupérez dans votre boutique favorite'
                }
              </p>
            </>
          )}
          
          {/* Barre de recherche */}
          <div className="max-w-2xl mx-auto mb-8">
            <SearchBar 
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder={
                deliveryMode === 'delivery' 
                  ? "Rechercher une boutique, un produit..." 
                  : "Rechercher une boutique près de chez vous..."
              }
              className="bg-white bg-opacity-90 backdrop-blur-sm"
            />
          </div>

          {/* Boutons d'action */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/shops" 
              className="inline-flex items-center bg-white text-blue-700 hover:bg-blue-100 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <span className="mr-2">🛍️</span>
              Explorer les boutiques
            </Link>
            
            {user && user.id ? (
              <Link 
                to="/dashboard" 
                className="inline-flex items-center border-2 border-white text-white hover:bg-white hover:text-blue-700 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200"
              >
                <span className="mr-2">👤</span>
                Mon compte
              </Link>
            ) : (
              <Link 
                to="/login" 
                className="inline-flex items-center border-2 border-white text-white hover:bg-white hover:text-blue-700 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200"
              >
                <span className="mr-2">🔐</span>
                Se connecter
              </Link>
            )}
          </div>

          {/* Indicateur de mode de livraison */}
          <div className="mt-8 flex justify-center">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-6 py-3">
              <div className="flex items-center space-x-2 text-sm">
                <span className={deliveryMode === 'delivery' ? 'text-green-400' : 'text-yellow-400'}>
                  {deliveryMode === 'delivery' ? '🚗' : '🏪'}
                </span>
                <span className="text-white">
                  {deliveryMode === 'delivery' ? 'Mode livraison' : 'Mode retrait'}
                </span>
                <span className="text-blue-300">•</span>
                <span className="text-white text-opacity-80">
                  {deliveryAddress?.address || 'Sélectionnez une adresse'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catégories */}
      <section className="py-8 bg-white border-b border-blue-200">
        <div className="container mx-auto px-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4 text-center">
            Parcourir par catégorie
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category === 'Toutes' ? null : category)}
                className={`px-5 py-3 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === (category === 'Toutes' ? null : category)
                    ? 'bg-blue-700 text-white shadow-md'
                    : 'bg-blue-100 text-blue-800 hover:bg-blue-200 hover:shadow-sm'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Boutiques */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-blue-900 mb-3">
              {selectedCategory 
                ? `Boutiques ${selectedCategory}`
                : 'Boutiques à découvrir'
              }
            </h2>
            <p className="text-blue-700 text-lg">
              {deliveryMode === 'delivery' 
                ? 'Livraison disponible dans votre zone'
                : 'Retrait disponible en boutique'
              }
            </p>
          </div>

          {shopsLoading ? (
            <div className="flex justify-center items-center py-16">
              <div className="text-center">
                <LoadingSpinner size="large" />
                <p className="text-blue-600 mt-4">Chargement des boutiques...</p>
              </div>
            </div>
          ) : shops && shops.length > 0 ? (
            <ShopList shops={shops} deliveryMode={deliveryMode} />
          ) : (
            <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-blue-200">
              <div className="text-6xl mb-4">
                {deliveryMode === 'delivery' ? '🚗' : '🏪'}
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-3">
                Aucune boutique trouvée
              </h3>
              <p className="text-blue-600 mb-6 max-w-md mx-auto">
                {deliveryMode === 'delivery'
                  ? 'Aucune boutique ne livre dans votre zone pour le moment'
                  : 'Aucune boutique avec retrait disponible près de chez vous'
                }
              </p>
              {(selectedCategory || searchQuery) && (
                <button 
                  onClick={() => {
                    setSelectedCategory(null);
                    setSearchQuery('');
                  }}
                  className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
                >
                  Voir toutes les boutiques
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Section CTA pour non-connectés */}
      {!user && (
        <section className="py-16 bg-blue-800 text-white">
          <div className="container mx-auto px-6 text-center">
            <div className="flex justify-center items-center mb-6">
              <img 
                src="/localstyle.png" 
                alt="LocalStyle" 
                className="h-12 w-12 mr-3"
              />
              <h2 className="text-3xl font-bold">Rejoignez LocalStyle</h2>
            </div>
            <p className="text-blue-200 text-lg mb-8 max-w-2xl mx-auto">
              Créez un compte gratuitement pour enregistrer vos adresses, suivre vos commandes 
              et découvrir des boutiques personnalisées selon vos goûts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/register" 
                className="bg-white text-blue-700 hover:bg-blue-100 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200"
              >
                Créer un compte gratuit
              </Link>
              <Link 
                to="/login" 
                className="border-2 border-white text-white hover:bg-white hover:text-blue-700 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200"
              >
                Se connecter
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="text-center p-4">
                <div className="text-2xl mb-2">🚀</div>
                <h4 className="font-semibold mb-2">Livraison rapide</h4>
                <p className="text-blue-300 text-sm">Recevez vos articles en 30 minutes</p>
              </div>
              <div className="text-center p-4">
                <div className="text-2xl mb-2">💎</div>
                <h4 className="font-semibold mb-2">Produits uniques</h4>
                <p className="text-blue-300 text-sm">Découvrez des créations locales exclusives</p>
              </div>
              <div className="text-center p-4">
                <div className="text-2xl mb-2">🛡️</div>
                <h4 className="font-semibold mb-2">Paiement sécurisé</h4>
                <p className="text-blue-300 text-sm">Transactions 100% sécurisées</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Section avant-footer */}
      <section className="py-12 bg-white border-t border-blue-200">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold text-blue-900 mb-4">
            Prêt à découvrir votre prochaine trouvaille ?
          </h3>
          <p className="text-blue-700 mb-6 max-w-2xl mx-auto">
            Des centaines de créateurs locaux n'attendent que vous. 
            Soutenez l'économie de votre région tout en vous faisant plaisir.
          </p>
          <Link 
            to="/shops" 
            className="inline-flex items-center bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200"
          >
            <span className="mr-2">🎯</span>
            Commencer à shopper
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;