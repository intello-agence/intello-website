// src/components/layout/FooterLight.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const FooterLight = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="border-t border-gray-800 py-8 px-6 bg-black"
      aria-label="Pied de page"
    >
      <div className="max-w-7xl mx-auto text-center">
        {/* Logo */}
        <Link 
          to="/" 
          className="inline-block mb-4"
          aria-label="Retour à l'accueil Intello"
        >
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent hover:from-blue-400 hover:to-purple-400 transition-all duration-200">
            Intello
          </div>
        </Link>

        {/* Copyright */}
        <p className="text-gray-400 text-sm">
          © {currentYear} Intello. Conçu par <strong className="text-white">Intello</strong>.
        </p>

        {/* Liens rapides optionnels (discrets) */}
        <div className="mt-4 flex justify-center gap-6 text-xs text-gray-500">
          <Link 
            to="/portfolio" 
            className="hover:text-blue-400 transition-colors"
            aria-label="Voir notre portfolio"
          >
            Portfolio
          </Link>
          <Link 
            to="/contact" 
            className="hover:text-blue-400 transition-colors"
            aria-label="Nous contacter"
          >
            Contact
          </Link>
          <a 
            href="mailto:intellopjsn@gmail.com"
            className="hover:text-blue-400 transition-colors"
            aria-label="Envoyer un email à intellopjsn@gmail.com"
          >
            intellopjsn@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
};

export default FooterLight;