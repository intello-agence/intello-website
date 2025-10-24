import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero = ({ t }) => {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Section d'accueil"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-black" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
            </pattern>
            <linearGradient id="fadeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: 'white', stopOpacity: 0 }} />
              <stop offset="50%" style={{ stopColor: 'white', stopOpacity: 0.3 }} />
              <stop offset="100%" style={{ stopColor: 'white', stopOpacity: 0 }} />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          <rect width="100%" height="100%" fill="url(#fadeGradient)" />
        </svg>
        {[...Array(15)].map((_, i) => (
          <div key={i} className="absolute rounded-full bg-white" style={{ width: Math.random() * 4 + 2, height: Math.random() * 4 + 2, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, opacity: Math.random() * 0.3 + 0.1, animation: `gentleFloat ${Math.random() * 20 + 15}s ease-in-out infinite`, animationDelay: `${Math.random() * 5}s` }} />
        ))}
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
          <span className="inline-block" style={{ animation: 'slideUp 1s ease-out forwards', opacity: 0 }}>{t.hero.title1}</span><br />
          <span className="inline-block bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent" style={{ animation: 'slideUp 1s ease-out 0.2s forwards', opacity: 0 }}>{t.hero.title2}</span><br />
          <span className="inline-block" style={{ animation: 'slideUp 1s ease-out 0.4s forwards', opacity: 0 }}>{t.hero.title3}</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto" style={{ animation: 'fadeIn 1s ease-out 0.6s forwards', opacity: 0 }}>{t.hero.subtitle}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center" style={{ animation: 'fadeIn 1s ease-out 0.8s forwards', opacity: 0 }}>
          <a 
            href="#contact"
            className="group px-8 py-4 bg-white text-black rounded-full font-semibold hover:bg-blue-500 hover:text-white transition-all duration-200 flex items-center justify-center gap-2"
            aria-label="Démarrer un projet - aller à la section contact"
          >
            {t.hero.cta1}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
          </a>
          <a 
            href="#services"
            className="px-8 py-4 border-2 border-white rounded-full font-semibold hover:bg-white hover:text-black transition-all duration-200"
            aria-label="Voir nos services"
          >
            {t.hero.cta2}
          </a>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-2"><div className="w-1 h-3 bg-white rounded-full" /></div>
      </div>
    </section>
  );
};

export default Hero;