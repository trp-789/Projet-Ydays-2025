import React, { useState } from 'react';
import ShopList from '../components/shops/ShopList';
import { useShops } from '../hooks/useShops';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { shops, loading, error } = useShops(selectedCategory);

  const categories = [
    'Toutes',
    'Vêtements',
    'Chaussures',
    'Accessoires',
    'Manteaux',
    'Pulls',
    'Jeans',
    'Robes',
    'Sportswear'
  ];

  const localAdvantages = [
    {
      icon: '🚴',
      title: 'Livraison Express',
      description: 'Recevez vos articles en 30-45 minutes'
    },
    {
      icon: '❤️',
      title: 'Commerce Local',
      description: 'Soutenez les créateurs de votre ville'
    },
    {
      icon: '🎨',
      title: 'Pièces Uniques',
      description: 'Des créations exclusives et originales'
    },
    {
      icon: '🌱',
      title: 'Éco-responsable',
      description: 'Une mode durable et locale'
    }
  ];

  if (error) return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center text-red-500 bg-red-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Erreur de chargement</h2>
        <p>{error}</p>
      </div>
    </div>
  );

  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-500 to-primary-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            🛍️ Mode Locale, Style Global
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-95 max-w-2xl mx-auto">
            Découvrez les boutiques de mode indépendantes près de chez vous. 
            Des pièces uniques, une livraison rapide, une communauté solidaire.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <button className="bg-white text-primary-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105">
              Explorer les boutiques
            </button>
            <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-600 px-6 py-3 rounded-lg font-semibold transition-all duration-200">
              Devenir vendeur
            </button>
          </div>
        </div>
      </div>

      {/* Avantages */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Pourquoi choisir LocalShop ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {localAdvantages.map((advantage, index) => (
              <div key={index} className="text-center p-6 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors duration-200">
                <div className="text-4xl mb-4">{advantage.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{advantage.title}</h3>
                <p className="text-gray-600">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Catégories */}
      <div className="bg-blue-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">
            Parcourir par catégorie
          </h2>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            Trouvez exactement ce que vous cherchez parmi nos créateurs locaux
          </p>
          <div className="flex justify-center flex-wrap gap-3">
            {categories.map(category => (
              <button
                key={category}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === (category === 'Toutes' ? null : category) 
                    ? 'bg-primary-500 text-white shadow-lg' 
                    : 'bg-white text-gray-700 hover:bg-primary-100 hover:text-primary-600 border border-blue-200'
                }`}
                onClick={() => setSelectedCategory(category === 'Toutes' ? null : category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Boutiques */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              {selectedCategory ? `Boutiques ${selectedCategory}` : 'Nos Boutiques Locales'}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Découvrez les talents de votre région. Chaque achat soutient un créateur indépendant.
            </p>
          </div>
          
          {loading ? (
            <LoadingSpinner />
          ) : shops && shops.length > 0 ? (
            <ShopList shops={shops} />
          ) : (
            <div className="text-center py-12 bg-white rounded-xl border border-blue-200">
              <div className="text-6xl mb-4">🏪</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Aucune boutique trouvée
              </h3>
              <p className="text-gray-500 mb-6">
                {selectedCategory 
                  ? `Aucune boutique ${selectedCategory.toLowerCase()} n'est disponible pour le moment.`
                  : 'Aucune boutique locale disponible pour le moment.'
                }
              </p>
              <button 
                onClick={() => setSelectedCategory(null)}
                className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Voir toutes les boutiques
              </button>
            </div>
          )}
        </div>
      </div>

      {/* CTA Vendeurs */}
      <div className="bg-primary-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Vous êtes créateur ?</h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Rejoignez notre plateforme et augmentez votre visibilité. Vendez vos créations à votre communauté locale avec une livraison rapide.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <button className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              Inscrire ma boutique
            </button>
            <button className="bg-white text-primary-600 hover:bg-blue-100 px-6 py-3 rounded-lg font-semibold transition-colors border border-primary-300">
              En savoir plus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;