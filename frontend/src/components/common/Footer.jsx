import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-primary-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-white text-primary-600 p-1 rounded">
                <span>🛍️</span>
              </div>
              <h3 className="text-xl font-bold">LocalShop</h3>
            </div>
            <p className="text-primary-200">
              Soutenons les créateurs de mode locaux ensemble
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2 text-primary-200">
              <li><a href="/" className="hover:text-white transition-colors">Accueil</a></li>
              <li><a href="/category/vetements" className="hover:text-white transition-colors">Vêtements</a></li>
              <li><a href="/category/chaussures" className="hover:text-white transition-colors">Chaussures</a></li>
              <li><a href="/category/accessoires" className="hover:text-white transition-colors">Accessoires</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-primary-200">
              <li>📧 contact@localshop.fr</li>
              <li>📞 01 23 45 67 89</li>
              <li>📍 Paris, France</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Livraison</h4>
            <ul className="space-y-2 text-primary-200">
              <li>🚴 Livraison express 30-45min</li>
              <li>📦 Zone de livraison: 10km</li>
              <li>💰 Retours gratuits sous 30 jours</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-700 mt-8 pt-6 text-center text-primary-300">
          <p>&copy; 2024 LocalShop. Tous droits réservés. Mode locale, impact global.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;