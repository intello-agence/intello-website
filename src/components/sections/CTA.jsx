import React from 'react';
import { ArrowRight } from 'lucide-react';

const CTA = ({ t }) => {
  return (
    <section 
      className="py-32 px-6 relative"
      aria-labelledby="cta-title"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 id="cta-title" className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
          {t.cta.title1}
          <br />
          <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            {t.cta.title2}
          </span>
        </h2>
        <p className="text-xl text-gray-400 mb-12">{t.cta.subtitle}</p>
        <a
          href="#contact"
          className="group px-12 py-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 inline-flex items-center justify-center gap-3"
          aria-label={`${t.cta.button} - Aller à la section contact`}
        >
          {t.cta.button}
          <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
};

export default CTA;