// components/common/Layout.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  const location = useLocation();
  
  // Liste des pages SANS header/footer
  const noLayoutPages = ['/login', '/register', '/admin', '/checkout/confirmation'];
  const shouldShowLayout = !noLayoutPages.includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header conditionnel */}
      {shouldShowLayout && <Header />}
      
      {/* Contenu principal */}
      <main className={shouldShowLayout ? "flex-1" : "min-h-screen"}>
        {children}
      </main>
      
      {/* Footer conditionnel */}
      {shouldShowLayout && <Footer />}
    </div>
  );
};

export default Layout;