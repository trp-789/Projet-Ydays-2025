import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const categories = [
    { name: 'Vêtements', icon: '👕', color: 'from-pink-500 to-rose-500' },
    { name: 'Chaussures', icon: '👟', color: 'from-blue-500 to-cyan-500' },
    { name: 'Accessoires', icon: '👜', color: 'from-purple-500 to-indigo-500' },
    { name: 'Sportswear', icon: '🏃‍♂️', color: 'from-green-500 to-emerald-500' }
  ];

  const features = [
    {
      icon: '🚴‍♂️',
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

  const localShops = [
    {
      name: "Boutique Élégance",
      category: "Vêtements",
      rating: "4.8",
      delivery: "25-35 min",
      image: "👗"
    },
    {
      name: "Sneakers & Co",
      category: "Chaussures", 
      rating: "4.9",
      delivery: "20-30 min",
      image: "👟"
    },
    {
      name: "Accessoires Chic",
      category: "Accessoires",
      rating: "4.7",
      delivery: "30-40 min",
      image: "👜"
    }
  ];

  // Animation automatique des slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % categories.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3 text-2xl font-bold text-blue-600">
            <span className="text-3xl">🛍️</span>
            <span>LocalShop</span>
          </div>
          <div className="flex space-x-4">
            <button 
              className="px-6 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105"
              onClick={() => navigate('/login')}
            >
              Connexion
            </button>
            <button 
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              onClick={() => navigate('/register')}
            >
              Inscription
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-28 pb-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 leading-tight mb-6">
            La mode <span className="text-blue-600">locale</span>
            <br />
            <span className="text-4xl md:text-5xl">à portée de main</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Découvrez les boutiques de créateurs près de chez vous. 
            Des pièces uniques, une livraison express, une communauté solidaire.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 text-lg font-semibold shadow-lg"
              onClick={() => navigate('/register')}
            >
              🛍️ Explorer les boutiques
            </button>
            <button 
              className="px-8 py-4 text-blue-600 border-2 border-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105 text-lg font-semibold"
              onClick={() => navigate('/about')}
            >
              ℹ️ En savoir plus
            </button>
          </div>
        </div>

        {/* Categories Slider */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Parcourir par catégorie</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <div
                key={category.name}
                className={`p-6 rounded-2xl text-center cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                  index === currentSlide 
                    ? `bg-gradient-to-r ${category.color} text-white shadow-xl` 
                    : 'bg-white text-gray-800 shadow-md hover:shadow-xl'
                }`}
                onClick={() => setCurrentSlide(index)}
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="text-lg font-semibold">{category.name}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Pourquoi choisir LocalShop ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div 
                key={feature.title}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Local Shops Showcase */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Découvrez nos boutiques locales
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {localShops.map((shop) => (
              <div 
                key={shop.name}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl">{shop.image}</div>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                      ⭐ {shop.rating}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{shop.name}</h3>
                  <p className="text-gray-600 mb-3">{shop.category}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">🚴 {shop.delivery}</span>
                    <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
                      Voir la boutique →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Prêt à découvrir la mode locale ?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Rejoignez notre communauté et soutenez les créateurs de votre région
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 text-lg font-semibold"
              onClick={() => navigate('/register')}
            >
              Créer mon compte gratuitement
            </button>
            
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="text-2xl font-bold text-blue-600 mb-2">50+</div>
            <div className="text-gray-600">Boutiques locales</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="text-2xl font-bold text-blue-600 mb-2">1,000+</div>
            <div className="text-gray-600">Produits uniques</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="text-2xl font-bold text-blue-600 mb-2">30min</div>
            <div className="text-gray-600">Livraison moyenne</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="text-2xl font-bold text-blue-600 mb-2">4.8/5</div>
            <div className="text-gray-600">Satisfaction client</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="text-3xl mb-4">🛍️</div>
          <h3 className="text-2xl font-bold mb-4">LocalShop</h3>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">
            Votre plateforme de shopping local pour découvrir les créateurs près de chez vous
          </p>
          <div className="flex justify-center space-x-6">
            <button className="text-gray-400 hover:text-white transition-colors">
              À propos
            </button>
            <button className="text-gray-400 hover:text-white transition-colors">
              Contact
            </button>
            <button className="text-gray-400 hover:text-white transition-colors">
              Devenir vendeur
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;