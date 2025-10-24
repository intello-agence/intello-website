import React from 'react';
import { ArrowRight } from 'lucide-react';
import { servicesData } from '../../data/services';

const Services = ({ t }) => {
  return (
    <section 
      id="services" 
      className="py-32 px-6 relative"
      aria-labelledby="services-title"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 id="services-title" className="text-5xl md:text-6xl font-bold mb-6">
            {t.services.title} <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">{t.services.titleHighlight}</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">{t.services.subtitle}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8" role="list">
          {servicesData.map((service, i) => {
            const IconComponent = service.icon;
            const title = t[service.titleKey.split('.')[0]][service.titleKey.split('.')[1]][service.titleKey.split('.')[2]];
            const description = t[service.descriptionKey.split('.')[0]][service.descriptionKey.split('.')[1]][service.descriptionKey.split('.')[2]];
            
            return (
              <article 
                key={i} 
                className="group relative p-8 rounded-3xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-gray-600 transition-all duration-200 cursor-pointer overflow-hidden" 
                style={{ animation: `fadeInUp 0.8s ease-out ${i * 0.1}s forwards`, opacity: 0 }}
                role="listitem"
                tabIndex="0"
                aria-label={`${title}: ${description}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} aria-hidden="true" />
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${service.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`} aria-hidden="true">
                  <IconComponent className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-400 transition-colors duration-300">
                  {title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {description}
                </p>
                <div className="mt-6 flex items-center text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true">
                  <span className="mr-2">{t.services.learnMore}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;