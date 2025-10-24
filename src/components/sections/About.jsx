import React from 'react';
import { Zap, Target, Users, Smartphone } from 'lucide-react';
import { founderData, valuesData, whyIntelloData } from '../../data/founder';
import OptimizedImage from '../ui/OptimizedImage';

const About = ({ t }) => {
  const icons = { Zap, Target, Users, Smartphone };

  return (
    <section 
      id="à propos" 
      className="py-32 px-6 relative overflow-hidden"
      aria-labelledby="about-title"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-blue-900/10" aria-hidden="true" />
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-20">
          <h2 id="about-title" className="text-5xl md:text-6xl font-bold mb-6">
            {t.about.title} <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">{t.about.titleHighlight}</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">{t.about.subtitle}</p>
        </div>

        {/* Notre Histoire */}
        <div className="max-w-4xl mx-auto mb-24">
          <article 
            className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-3xl p-8 md:p-12"
            aria-labelledby="story-title"
          >
            <h3 id="story-title" className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {t.about.story.title}
            </h3>
            <div className="text-gray-300 space-y-4 leading-relaxed text-lg">
              <p>{t.about.story.p1}</p>
              <p>{t.about.story.p2}</p>
              <p>{t.about.story.p3}</p>
            </div>
          </article>
        </div>

        {/* Nos Valeurs */}
        <div className="mb-24">
          <h3 id="values-title" className="text-4xl font-bold text-center mb-16">
            {t.about.values.title} <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">{t.about.values.titleHighlight}</span>
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" role="list" aria-labelledby="values-title">
            {valuesData.map((value, i) => {
              const IconComponent = icons[value.icon];
              return (
                <article 
                  key={i} 
                  className="group relative p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-gray-600 transition-all duration-200"
                  role="listitem"
                >
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${value.gradient} mb-4 group-hover:scale-110 transition-transform duration-200`} aria-hidden="true">
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">{t.about.values[`value${i + 1}`].title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{t.about.values[`value${i + 1}`].desc}</p>
                </article>
              );
            })}
          </div>
        </div>

        {/* Fondateur */}
        <div className="mb-24">
          <h3 id="founder-title" className="text-4xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">{t.about.founder.title}</span>
          </h3>
          <div className="max-w-3xl mx-auto">
            <article 
              className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-3xl p-8 md:p-12 relative overflow-hidden"
              aria-labelledby="founder-title"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" aria-hidden="true" />
              <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
                <div className="relative group">
                  <div className="w-48 h-48 rounded-2xl overflow-hidden">
                    <OptimizedImage 
                      src={founderData.image} 
                      alt={`Photo de ${t.about.founder.name}, ${t.about.founder.role}`}
                      className="w-full h-full"
                      width={192}
                      height={192}
                    />
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h4 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {t.about.founder.name}
                  </h4>
                  <p className="text-blue-400 text-lg mb-4">{t.about.founder.role}</p>
                  <div className="space-y-3 text-gray-300 leading-relaxed">
                    <p>{t.about.founder.bio1}</p>
                    <p>{t.about.founder.bio2}</p>
                    <p>{t.about.founder.bio3}</p>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-2 justify-center md:justify-start" role="list" aria-label="Technologies maîtrisées">
                    {founderData.technologies.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full text-sm text-blue-300" role="listitem">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>

        {/* Pourquoi Intello */}
        <div className="max-w-4xl mx-auto">
          <h3 id="why-title" className="text-4xl font-bold text-center mb-12">
            {t.about.why.title} <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">{t.about.why.titleHighlight}</span>
          </h3>
          <div className="grid md:grid-cols-2 gap-6" role="list" aria-labelledby="why-title">
            {whyIntelloData.map((item, i) => (
              <article 
                key={i} 
                className="p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-blue-500/50 transition-all duration-200"
                role="listitem"
              >
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mt-2 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <h4 className="text-xl font-bold mb-2 text-white">{t.about.why[`reason${i + 1}`].title}</h4>
                    <p className="text-gray-400 leading-relaxed">{t.about.why[`reason${i + 1}`].desc}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Location */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-900 to-black border border-gray-800 rounded-full">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" aria-hidden="true" />
            <span className="text-gray-300">📍 {t.about.location}</span>
            <span className="text-gray-500" aria-hidden="true">|</span>
            <span className="text-gray-400">🗣️ {t.about.languages}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;