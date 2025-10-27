import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ShopList from '../components/shops/ShopList';
import { useShops } from '../hooks/useShops';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { shops, loading, error } = useShops(selectedCategory);

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

  const features = [
    {
      icon: '🚗',
      title: 'Livraison Express',
      description: 'Recevez vos articles en 30-45 minutes'
    },
    {
      icon: '📍',
      title: 'Boutiques Locales',
      description: 'Découvrez les créateurs près de chez vous'
    },
    {
      icon: '🛍️',
      title: 'Essayer à Domicile',
      description: 'Commandez plusieurs tailles, gardez ce qui vous plaît'
    },
    {
      icon: '💳',
      title: 'Paiement Sécurisé',
      description: 'Paiement en ligne simple et sécurisé'
    }
  ];

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="text-6xl mb-4">😔</div>
        <h2 className="text-2xl font-medium mb-4">Erreur de chargement</h2>
        <p className="text-gray-600 max-w-md">{error}</p>
      </div>
    </div>
  );

  return (
    <div className="home-page bg-white">
      {/* Hero Section - Mode + Livraison */}
      <section className="relative bg-gradient-to-br from-purple-600 to-blue-600 text-white py-16 md:py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              StyleLocal
              <span className="block text-yellow-300 mt-2">Livrée en 30min</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 leading-relaxed text-purple-100">
              Découvrez les créateurs de votre région et recevez vos articles en livraison express. 
              
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                to="/boutiques" 
                className="inline-flex items-center bg-yellow-400 hover:bg-yellow-300 text-purple-900 px-8 py-4 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                🛍️ Commander maintenant
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link 
                to="/comment-ca-marche" 
                className="inline-flex items-center border-2 border-white text-white hover:bg-white hover:text-purple-600 px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                📱 Voir l'appli
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* Fonctionnalités Uber Eats-like */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Mode locale, livrée instantanément
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Toute la magie de LocalStyle appliquée à la mode de créateurs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-2xl hover:shadow-md transition-all duration-300">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Comment ça marche ?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Parcourir</h3>
              <p className="text-gray-600">Découvrez les boutiques et créateurs près de chez vous</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Commander</h3>
              <p className="text-gray-600">Choisissez vos articles et validez votre commande</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Recevoir</h3>
              <p className="text-gray-600">Livraison express en 30-45 minutes à votre porte</p>
            </div>
          </div>
        </div>
      </section>

      {/* Catégories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Parcourir les boutiques
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Filtrez par type de produits pour trouver exactement ce que vous cherchez
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category === 'Toutes' ? null : category)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === (category === 'Toutes' ? null : category)
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-purple-100 hover:text-purple-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Boutiques avec livraison */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {selectedCategory ? 
                `Boutiques ${selectedCategory} - Livraison disponible` 
                : 'Boutiques avec livraison express'
              }
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {selectedCategory ? 
                `Commandez ${selectedCategory.toLowerCase()} et recevez en 30 minutes`
                : 'Toutes ces boutiques proposent la livraison rapide dans votre zone'
              }
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <LoadingSpinner />
            </div>
          ) : shops && shops.length > 0 ? (
            <div>
              <ShopList shops={shops} />
              <div className="text-center mt-8">
                <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                  🚗 Livraison disponible dans votre zone
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
              <div className="text-6xl mb-6">🏪</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                Aucune boutique trouvée
              </h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                {selectedCategory 
                  ? `Aucune boutique ${selectedCategory.toLowerCase()} avec livraison dans votre zone.`
                  : 'Aucune boutique avec livraison disponible pour le moment.'
                }
              </p>
              {selectedCategory && (
                <button 
                  onClick={() => setSelectedCategory(null)}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300"
                >
                  Voir toutes les boutiques
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* CTA Créateurs */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Vous êtes créateur ?
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Rejoignez notre plateforme et proposez la livraison express à vos clients. 
              Augmentez vos ventes avec notre réseau de livraison.
            </p>
            <Link 
              to="/creer-boutique"
              className="inline-flex items-center bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              🏪 Ajouter ma boutique
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>




      {/* CTA Télécharger l'app */}
      <section className="py-16 bg-gradient-to-r from-purple-700 to-blue-700 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Téléchargez l'application
            </h2>
            <p className="text-lg mb-8 text-purple-100 leading-relaxed max-w-2xl mx-auto">
              Commandez en un clic, suivez votre livreur en temps réel, et recevez vos articles mode en moins de 30 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="inline-flex items-center bg-black hover:bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300">
                <span className="text-2xl mr-3">📱</span>
                <div className="text-left">
                  <div className="text-xs">Télécharger sur</div>
                  <div className="text-lg">App Store</div>
                </div>
              </button>
              <button className="inline-flex items-center bg-black hover:bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300">
                <span className="text-2xl mr-3">🤖</span>
                <div className="text-left">
                  <div className="text-xs">Disponible sur</div>
                  <div className="text-lg">Google Play</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>







    </div>
  );
};

export default Home;