import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Smartphone, ShoppingCart, Layers } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import SEO from '../components/ui/SEO';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { useScrollPosition } from '../hooks/useScrollPosition';

const ServicesPage = () => {
  const { t, language, setLanguage } = useTranslation();
  const scrollY = useScrollPosition();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  if (!t) return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
    </div>
  );

  const services = [
    {
      id: 'websites',
      icon: Globe,
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'ecommerce',
      icon: ShoppingCart,
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      id: 'webapps',
      icon: Layers,
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      id: 'mobile',
      icon: Smartphone,
      gradient: 'from-orange-500 to-red-500',
    },
  ];

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Web and Mobile Development",
    "provider": {
      "@type": "Organization",
      "name": "Intello",
      "url": "https://intello.dev"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Senegal"
    },
    "description": t.servicesPage.meta.description
  };

  return (
    <>
      <SEO
        title={t.servicesPage.meta.title}
        description={t.servicesPage.meta.description}
        canonical="https://intello.dev/services"
        schema={schemaData}
      />

      <div className="min-h-screen bg-[#050505] text-white">
        <Header
          scrollY={scrollY}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          language={language}
          setLanguage={setLanguage}
          t={t}
        />

        <main className="pt-24 pb-20 px-6">
          <div className="max-w-7xl mx-auto">
            
            {/* Hero Section */}
            <div className="text-center mb-20">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {t.servicesPage.title}{' '}
                <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                  {t.servicesPage.titleHighlight}
                </span>
              </h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                {t.servicesPage.subtitle}
              </p>
            </div>

            {/* Services Grid */}
            <div className="grid gap-12 md:gap-16">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                const serviceData = t.servicesPage.services[service.id];
                const isEven = index % 2 === 0;

                return (
                  <article
                    key={service.id}
                    className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12 items-center`}
                  >
                    {/* Icon & Visual */}
                    <div className="w-full lg:w-1/3 flex justify-center">
                      <div className={`p-8 rounded-3xl bg-gradient-to-br ${service.gradient} shadow-2xl`}>
                        <IconComponent className="w-20 h-20 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="w-full lg:w-2/3 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
                      <h2 className="text-3xl md:text-4xl font-bold">
                        {serviceData.title}
                      </h2>
                      
                      <p className="text-lg text-gray-300 leading-relaxed">
                        {serviceData.description}
                      </p>

                      {/* Benefits List */}
                      {/* w-fit + mx-auto : La boîte s'adapte à la largeur du texte et se centre */}
                      {/* lg:w-full + lg:mx-0 : Sur PC, on reprend toute la largeur et on aligne à gauche */}
                      <ul className="space-y-3 w-full max-w-sm mx-auto lg:max-w-none lg:mx-0 text-left">
                        {serviceData.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="mt-1.5 w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                            <span className="text-gray-400">{benefit}</span>
                          </li>
                        ))}
                      </ul>                      

                      {/* CTA */}
                      <Link
                        to={`/contact?service=${service.id}`}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold hover:opacity-90 transition-opacity group"
                      >
                        {t.servicesPage.cta}
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>                   
                  </article>
                );
              })}
            </div>

            {/* Bottom CTA */}
            <div className="mt-24 text-center p-12 rounded-3xl bg-gradient-to-br from-gray-900 to-black border border-gray-800">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t.servicesPage.bottomCta.title}
              </h2>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                {t.servicesPage.bottomCta.subtitle}
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-colors"
              >
                {t.servicesPage.bottomCta.button}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

          </div>
        </main>

        <Footer t={t} />
      </div>
    </>
  );
};

export default ServicesPage;