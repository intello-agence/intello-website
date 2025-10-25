import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { useTranslation } from './hooks/useTranslation';
import { useMousePosition } from './hooks/useMousePosition';
import { useScrollPosition } from './hooks/useScrollPosition';
import SEO from './components/ui/SEO';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import './styles/animations.css';
import Hero from './components/sections/Hero';

const Stats = lazy(() => import('./components/sections/Stats'));
const Services = lazy(() => import('./components/sections/Services'));
const Projects = lazy(() => import('./components/sections/Projects'));
const About = lazy(() => import('./components/sections/About'));
const Process = lazy(() => import('./components/sections/Process'));
const CTA = lazy(() => import('./components/sections/CTA'));
const Contact = lazy(() => import('./components/sections/Contact'));

const IntelloAgency = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollY = useScrollPosition();
  const mousePosition = useMousePosition();
  const { t, language, setLanguage } = useTranslation();
  const cursorRef = useRef(null);

  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.style.left = `${mousePosition.x}px`;
      cursorRef.current.style.top = `${mousePosition.y}px`;
    }
  }, [mousePosition]);

  if (!t) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Chargement...</div>;

  // ✅ NOUVEAU : JSON-LD combiné (Organization + LocalBusiness)
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://intello.sn/#organization",
        "name": "Intello",
        "alternateName": "Intello Agence Digitale",
        "url": "https://intello.sn",
        "logo": "https://intello.sn/logo_intello.png",
        "description": "Agence de développement web et mobile au Sénégal spécialisée en React, Node.js, design UI/UX et solutions cloud.",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Dakar",
          "addressCountry": "SN"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+221-77-553-28-04",
          "contactType": "Customer Service",
          "areaServed": "SN",
          "availableLanguage": ["fr", "en"]
        },
        "sameAs": [
          "https://linkedin.com/company/intello-agency",
          "https://github.com/intello-agency"
        ],
        "founder": {
          "@type": "Person",
          "name": "Patrick Junior Samba Ntadi"
        },
        "foundingDate": "2022",
        "keywords": "développement web, application mobile, e-commerce, React, Node.js, UI/UX design, Sénégal, Dakar"
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://intello.sn/#business",
        "name": "Intello - Agence Digitale",
        "image": "https://intello.sn/logo_intello.png",
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Dakar",
          "addressCountry": "Sénégal"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 14.6937,
          "longitude": -17.4441
        },
        "url": "https://intello.sn",
        "telephone": "+221775532804",
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday"
          ],
          "opens": "09:00",
          "closes": "18:00"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "28"
        }
      }
    ]
  };

  return (
    <>
      {/* ===== SEO META TAGS - HOMEPAGE ===== */}
      <SEO
        title="Intello - Agence Développement Web & Mobile au Sénégal | React, Node.js"
        description="Agence digitale sénégalaise experte en développement web, mobile et e-commerce. Création de sites React, applications Node.js, design UI/UX moderne. +50 projets réussis à Dakar. Devis gratuit sous 24h."
        keywords="agence web sénégal, développement web dakar, agence digitale sénégal, création site internet dakar, développement mobile sénégal, react senegal, node.js dakar, agence e-commerce sénégal, design ui ux dakar, développeur web dakar"
        ogTitle="Intello - Agence Web & Mobile N°1 au Sénégal"
        ogDescription="Transformez vos idées en solutions digitales performantes. Développement web, mobile, e-commerce. Expertise React, Node.js, cloud. Basés à Dakar, Sénégal."
        ogImage="/logo_intello.png"
        ogType="website"
        canonical="https://intello.sn"
        schema={schemaData}
      />

      <div className="bg-black text-white min-h-screen overflow-x-hidden">
        <div ref={cursorRef} className="fixed w-4 h-4 bg-white rounded-full pointer-events-none z-50 mix-blend-difference" style={{ transform: 'translate(-50%, -50%)', transition: 'left 0.05s ease-out, top 0.05s ease-out' }} />

        {/* Skip Link */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded-md focus:font-semibold"
        >
          {language === 'fr' ? 'Aller au contenu principal' : 'Skip to main content'}
        </a>

        <Header 
          scrollY={scrollY}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          language={language}
          setLanguage={setLanguage}
          t={t}
        />

        <Hero t={t} />
        
        <main id="main-content">
          <Suspense fallback={<div className="py-20 text-center text-gray-400">Chargement...</div>}>
            <Stats t={t} />
            <Services t={t} />
            <Projects t={t} />
            <About t={t} />
            <Process t={t} />
            <CTA t={t} />
            <Contact t={t} />
          </Suspense>
        </main>

        <Footer t={t} />
      </div>
    </>
  );
};

export default IntelloAgency;