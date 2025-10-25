// src/components/layout/HeaderMini.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useScrollPosition } from '../../hooks/useScrollPosition';

const HeaderMini = () => {
  const scrollY = useScrollPosition();

  return (
    <nav 
      className="fixed top-0 w-full z-40 transition-all duration-300" 
      style={{ 
        backgroundColor: scrollY > 50 ? 'rgba(0,0,0,0.95)' : 'rgba(0,0,0,0.8)', 
        backdropFilter: 'blur(10px)',
        borderBottom: scrollY > 50 ? '1px solid rgba(55,65,81,0.3)' : '1px solid transparent'
      }}
      aria-label="Navigation principale"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo avec image + texte */}
        <Link 
          to="/" 
          className="flex items-center gap-3 group"
          aria-label="Retour à l'accueil Intello"
        >
          <img 
            src="/logo_intello.png" 
            alt="Logo Intello" 
            className="w-12 h-12 rounded-full border-2 border-blue-500 object-cover bg-white group-hover:scale-105 transition-transform" 
          />
          <div className="hidden sm:block">
            <div className="text-lg font-extrabold text-white leading-tight">Intello</div>
          </div>
        </Link>
        
        {/* Bouton Contact (switch langue supprimé) */}
        <Link
          to="/contact"
          className="px-5 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-full font-semibold text-sm transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg"
          aria-label="Aller à la page contact"
        >
          💬 Contact
        </Link>
      </div>
    </nav>
  );
};

export default HeaderMini;