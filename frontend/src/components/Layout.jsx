import React, { useState } from 'react';
import Header from './common/Header';
import Sidebar from './common/Sidebar';
import Footer from './common/Footer';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      <Header />
      
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
        />
        
        {/* Bouton menu mobile */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden fixed bottom-6 right-6 bg-primary-500 text-white p-4 rounded-full shadow-lg z-30"
        >
          ☰
        </button>

        {/* Contenu principal */}
        <main className="flex-1 md:ml-0">
          {children}
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default Layout;