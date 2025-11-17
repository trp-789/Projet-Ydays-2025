import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useDelivery } from '../context/DeliveryContext';
import { useShops } from '../hooks/useShops';
import LoadingSpinner from '../components/LoadingSpinner';
import SearchBar from '../components/SearchBar';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import heroImage from '/localstyle.png';

const MotionLink = motion(Link);

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isHovering, setIsHovering] = useState(false);
  const { deliveryMode } = useDelivery();
  const { user, loading: authLoading } = useAuth();
  const { shops, loading: shopsLoading, error } = useShops(selectedCategory, deliveryMode);

  // Mouse interactions
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-200, 200], [5, -5]);
  const rotateY = useTransform(mouseX, [-200, 200], [-5, 5]);

  const categories = [
    'Toutes',
    'Streetwear',
    'Sneakers',
    'Accessoires',
    'Bijoux',
    'Vintage',
    'Créations uniques'
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-5xl mb-4">😔</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Erreur de chargement</h2>
          <p className="text-gray-600 max-w-md mx-auto text-base">{error}</p>
        </motion.div>
      </div>
    );
  }

  const filteredShops = shops?.filter(shop => 
    shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shop.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50 font-sans">
      {/* Hero Section */}
      <section 
        className="relative py-16 flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Hero Image - Reduced size */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ rotateX, rotateY }}
          transition={{ type: "spring", damping: 30, stiffness: 100 }}
        >
          <motion.img
            src={heroImage}
            alt="LocalStyle - Streetwear Local"
            className="w-4/5 h-4/5 object-contain opacity-25"
            animate={{ 
              scale: isHovering ? 1.03 : 1,
            }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>

        {/* Hero Content */}
        <motion.div
          className="relative z-20 text-center px-6 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1
            className="text-5xl md:text-6xl font-black text-white mb-6"
          >
            LocalStyle
          </motion.h1>
          
          <motion.h2
            className="text-xl md:text-2xl font-semibold text-white/90 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {user?(
               `Salut ${user.user_metadata?.display_name || user.email?.split('@')[0]} 👋`
            )  : ('Streetwear Local & Authentique')}
          </motion.h2>

          <motion.p
            className="text-white/80 text-lg mb-8 max-w-lg mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {user
              ? deliveryMode === 'delivery'
                ? 'Découvre les créateurs streetwear qui livrent chez toi'
                : 'Explore les shops urbains près de chez toi'
              : 'Découvre les créateurs indépendants et leurs pièces uniques'}
          </motion.p>

          {/* Search Bar */}
          <motion.div
            className="max-w-lg mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Rechercher un shop, une marque ou un style..."
              className="bg-white/20 backdrop-blur-lg border border-white/30 text-white placeholder-white/70 rounded-xl text-base"
            />
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-wrap justify-center gap-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <MotionLink
              to="/shops"
              whileHover={{ 
                scale: 1.05,
                y: -2,
              }}
              whileTap={{ scale: 0.98 }}
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-base transition-all shadow-lg hover:shadow-xl"
            >
              🚀 Explorer les shops
            </MotionLink>

            {user ? (
              <MotionLink
                to="/compte_user"
                whileHover={{ 
                  scale: 1.05,
                  y: -2,
                  backgroundColor: "rgba(255,255,255,0.15)"
                }}
                whileTap={{ scale: 0.98 }}
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-base transition-all"
              >
                👤 Mon compte
              </MotionLink>
            ) : (
              <MotionLink
                to="/login"
                whileHover={{ 
                  scale: 1.05,
                  y: -2,
                  backgroundColor: "rgba(255,255,255,0.15)"
                }}
                whileTap={{ scale: 0.98 }}
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-base transition-all"
              >
                🔑 Se connecter
              </MotionLink>
            )}
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Pourquoi choisir LocalStyle ?</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              La plateforme qui révolutionne votre shopping streetwear en connectant directement avec les créateurs locaux.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div 
              className="text-center p-6"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Authenticité</h3>
              <p className="text-gray-600">
                Des pièces uniques et limitées directement des créateurs de votre région.
              </p>
            </motion.div>

            <motion.div 
              className="text-center p-6"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Rapidité</h3>
              <p className="text-gray-600">
                Livraison express et retrait en boutique selon vos préférences.
              </p>
            </motion.div>

            <motion.div 
              className="text-center p-6"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💎</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Exclusivité</h3>
              <p className="text-gray-600">
                Accès à des collections qui ne sont pas disponibles dans les grandes enseignes.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-gray-50 border-y border-gray-200">
        <div className="container mx-auto px-6">
          <motion.h3
            className="text-2xl font-bold text-gray-900 mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Parcourir par style
          </motion.h3>
          
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category === 'Toutes' ? null : category)}
                whileHover={{ 
                  scale: 1.08,
                  y: -2,
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`px-6 py-3 rounded-xl font-semibold text-base transition-all ${
                  selectedCategory === (category === 'Toutes' ? null : category)
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-400 hover:bg-blue-50 shadow-sm'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Shops Section - Max 4 articles */}
      <section className="py-16 bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {selectedCategory ? `Shops ${selectedCategory}` : 'Shops à découvrir'}
            </h2>
            <p className="text-gray-600 text-lg">
              Découvre les dernières créations locales
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {shopsLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-center items-center py-16"
              >
                <LoadingSpinner size="large" />
              </motion.div>
            ) : filteredShops && filteredShops.length > 0 ? (
              <motion.div
                key="shops-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
              >
                {filteredShops.slice(0, 4).map((shop, index) => (
                  <motion.div
                    key={shop.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ 
                      scale: 1.05, 
                      y: -5,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                    }}
                    className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden cursor-pointer group"
                  >
                    <Link to={`/shop/${shop.id}`}>
                      <div className="h-48 w-full overflow-hidden relative">
                        <motion.img
                          src={shop.image || heroImage}
                          alt={shop.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      </div>
                      <div className="p-5">
                        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                          {shop.name}
                        </h3>
                        <p className="text-gray-600 text-base mb-3 capitalize">
                          {shop.category}
                        </p>
                        <div className="flex justify-between items-center">
                          <p className="text-blue-600 font-semibold text-base">
                            {shop.distance ? `${shop.distance} km` : '📍 Local'}
                          </p>
                          <motion.span
                            whileHover={{ scale: 1.2 }}
                            className="text-xl font-bold"
                          >
                            →
                          </motion.span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="no-shops"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-lg max-w-2xl mx-auto"
              >
                <div className="text-6xl mb-6">🔍</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Aucun shop trouvé
                </h3>
                <p className="text-gray-600 mb-8 text-lg">
                  Essaie une autre catégorie ou modifie ta recherche.
                </p>
                {(selectedCategory || searchQuery) && (
                  <motion.button
                    onClick={() => {
                      setSelectedCategory(null);
                      setSearchQuery('');
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
                  >
                    Voir tous les shops
                  </motion.button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-gray-600">Créateurs locaux</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-3xl font-bold text-purple-600 mb-2">500+</div>
              <div className="text-gray-600">Pièces uniques</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-3xl font-bold text-cyan-600 mb-2">10+</div>
              <div className="text-gray-600">Villes couvertes</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-3xl font-bold text-gray-600 mb-2">24h</div>
              <div className="text-gray-600">Livraison express</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CREATEURS Section */}
      <section className="py-20 bg-gradient-to-br from-blue-100 to-blue-200 border-t border-blue-300 text-center">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-blue-900 mb-6">
            Les créateurs locaux qui font le style 💙
          </h3>
          <p className="text-blue-700 max-w-2xl mx-auto mb-10">
            Soutiens les artisans et designers urbains de ta région.
          </p>

          <div className="mt-14 bg-blue-700 text-white rounded-2xl shadow-lg p-10 max-w-3xl mx-auto">
            <h4 className="text-2xl font-semibold mb-3">
              Tu veux exposer ton style ?
            </h4>
            <p className="text-blue-100 mb-6">
              Rejoins LocalStyle et fais découvrir tes créations à la communauté.  
              Gère ton shop et ta visibilité facilement.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/merchant/register"
                className="bg-white text-blue-700 hover:bg-blue-100 px-8 py-4 rounded-lg font-semibold text-lg transition-all"
              >
                🚀 Devenir créateur partenaire
              </Link>              
            </div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default Home;