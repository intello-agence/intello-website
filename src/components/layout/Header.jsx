import React, { useEffect, useRef } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = ({ scrollY, isMenuOpen, setIsMenuOpen, language, setLanguage, t }) => {
  const menuRef = useRef(null);

  // Fermer menu avec Escape + Focus trap
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (e) => {
      // Escape ferme le menu
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }

      // Tab: garder le focus dans le menu
      if (e.key === 'Tab') {
        if (!menuRef.current) return;
        
        const focusableElements = menuRef.current.querySelectorAll(
          'a[href], button:not([disabled])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          // Shift+Tab sur premier élément → revenir au dernier
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          // Tab sur dernier élément → revenir au premier
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen, setIsMenuOpen]);

  // Focus sur premier élément à l'ouverture
  useEffect(() => {
    if (isMenuOpen && menuRef.current) {
      const firstLink = menuRef.current.querySelector('a, button');
      firstLink?.focus();
    }
  }, [isMenuOpen]);

  return (
    <>
      <nav className="fixed top-0 w-full z-40 transition-all duration-300" style={{ backgroundColor: scrollY > 50 ? 'rgba(0,0,0,0.9)' : 'transparent', backdropFilter: scrollY > 50 ? 'blur(10px)' : 'none' }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#" className="text-2xl font-bold tracking-tight group">
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-200">
              Intello
            </span>
          </a>
          
          <div className="hidden md:flex items-center space-x-8 text-sm">
            {Object.entries(t.nav).map(([key, item]) => (
              key === 'projects'
                ? <Link key={key} to="/portfolio" className="hover:text-blue-400 transition-colors duration-150 relative group">{item}<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-200" /></Link>
                : <a key={key} href={`#${item.toLowerCase()}`} className="hover:text-blue-400 transition-colors duration-150 relative group">{item}<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-200" /></a>
            ))}
            
            <button 
              onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')} 
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-700 hover:border-blue-500 transition-all duration-200 group"
              aria-label={language === 'fr' ? 'Changer la langue en anglais' : 'Switch language to French'}
            >
              <Globe className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
              <span className="text-xl">{language === 'fr' ? '🇫🇷' : '🇬🇧'}</span>
              <span className="font-semibold">{language.toUpperCase()}</span>
            </button>
          </div>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="md:hidden"
            aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div 
          ref={menuRef}
          className="md:hidden fixed inset-0 z-50 bg-black pt-20"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navigation"
        >
          <nav className="flex flex-col items-center space-y-6 text-2xl">
            {Object.entries(t.nav).map(([key, item]) => (
              key === 'projects'
                ? <Link key={key} to="/portfolio" onClick={() => setIsMenuOpen(false)} className="hover:text-blue-400 transition-colors">{item}</Link>
                : <a key={key} href={`#${item.toLowerCase()}`} onClick={() => setIsMenuOpen(false)} className="hover:text-blue-400 transition-colors">{item}</a>
            ))}
            <button 
              onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')} 
              className="px-6 py-3 border border-gray-700 rounded-full"
              aria-label={language === 'fr' ? 'Changer la langue en anglais' : 'Switch language to French'}
            >
              {language === 'fr' ? '🇬🇧 EN' : '🇫🇷 FR'}
            </button>
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;