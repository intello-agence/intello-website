import React, { useState, useEffect, lazy, Suspense, useRef } from 'react';
// RETIRÉ : import Lenis from 'lenis'; -> On va l'importer dynamiquement
import { useTranslation } from './hooks/useTranslation';
import { useScrollPosition } from './hooks/useScrollPosition';
import SEO from './components/ui/SEO';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import './styles/animations.css';
import Hero from './components/sections/Hero';
// TechStack est léger et visuellement important, on le garde en statique
import TechStack from './components/sections/TechStack';

// Lazy loads...
const Stats = lazy(() => import('./components/sections/Stats'));
const Services = lazy(() => import('./components/sections/Services'));
const Projects = lazy(() => import('./components/sections/Projects'));
const About = lazy(() => import('./components/sections/About'));
const Process = lazy(() => import('./components/sections/Process'));
const CTA = lazy(() => import('./components/sections/CTA'));
const Contact = lazy(() => import('./components/sections/Contact'));

// --- COMPOSANT DE FOND OPTIMISÉ (VERSION FINAL BOSS) ---
const TechBackground = () => {
  const containerRef = useRef(null);
  const spotlightRef = useRef(null);
  
  // OPTIMISATION : Initialisation immédiate (comme dans Hero.jsx)
  // Évite le re-render inutile au montage sur Desktop
  const [enableEffects, setEnableEffects] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia("(min-width: 1024px)").matches;
    }
    return false;
  });

  useEffect(() => {
    // On ne gère que l'event listener ici, pas l'état initial
    if (enableEffects) {
      const handleMouseMove = (e) => {
        if (!spotlightRef.current) return;
        requestAnimationFrame(() => {
            spotlightRef.current.style.setProperty('--x', `${e.clientX}px`);
            spotlightRef.current.style.setProperty('--y', `${e.clientY}px`);
        });
      };
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [enableEffects]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[-1] h-full w-full bg-[#050505]">
      {/* Grille - CSS pur, très léger */}
      <div className="absolute h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* Spotlight Desktop */}
      {enableEffects && (
        <div 
            ref={spotlightRef}
            className="pointer-events-none absolute -inset-px transition-opacity duration-300"
            style={{
            background: `radial-gradient(600px circle at var(--x, 50%) var(--y, 50%), rgba(255,255,255,0.06), transparent 40%)`
            }} 
        />
      )}
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505/80]"></div>
      
      {/* Grain Desktop Only - Le monstre du LCP sur mobile (désactivé ici) */}
      {enableEffects && (
          <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none select-none" 
               style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
          </div>
      )}
    </div>
  );
};

const IntelloAgency = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollY = useScrollPosition();
  const { t, language, setLanguage } = useTranslation();

  // --- INIT LENIS OPTIMISÉ ---
  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    if (!isDesktop) return;

    let lenisInstance = null;
    let rafId = null;

    import('lenis').then((LenisModule) => {
        const Lenis = LenisModule.default;
        lenisInstance = new Lenis({
            duration: 0.9,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            smoothTouch: false,
            touchMultiplier: 2,
        });

        function raf(time) {
            lenisInstance.raf(time);
            rafId = requestAnimationFrame(raf);
        }
        rafId = requestAnimationFrame(raf);
    });

    return () => {
        if (lenisInstance) lenisInstance.destroy();
        if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  if (!t) return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-white font-mono">
      <div className="w-8 h-8 border-2 border-t-transparent border-white rounded-full animate-spin mb-4"></div>
    </div>
  );

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://intello.dev/#organization",
        "name": "Intello",
        "alternateName": "Intello Agence Digitale",
        "url": "https://intello.dev",
        "logo": "https://intello.dev/logo_intello.png",
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
        "@id": "https://intello.dev/#business",
        "name": "Intello - Agence Digitale",
        "image": "https://intello.dev/logo_intello.png",
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
        "url": "https://intello.dev",
        "telephone": "+221775532804",
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
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
      <SEO
        title="Intello - Agence Développement Web & Mobile au Sénégal | React, Node.js"
        description="Agence digitale sénégalaise experte en développement web, mobile et e-commerce. Création de sites React, applications Node.js, design UI/UX moderne. +50 projets réussis à Dakar. Devis gratuit sous 24h."
        keywords="agence web sénégal, développement web dakar, agence digitale sénégal, création site internet dakar, développement mobile sénégal, react senegal, node.js dakar, agence e-commerce sénégal, design ui ux dakar, développeur web dakar"
        ogTitle="Intello - Agence Web & Mobile N°1 au Sénégal"
        ogDescription="Transformez vos idées en solutions digitales performantes. Développement web, mobile, e-commerce. Expertise React, Node.js, cloud. Basés à Dakar, Sénégal."
        ogImage="/logo_intello.png"
        ogType="website"
        canonical="https://intello.dev"
        schema={schemaData}
      />

      <TechBackground />

      <div className="relative text-white min-h-screen overflow-x-hidden font-sans selection:bg-white/20 selection:text-cyan-300">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-6 focus:left-6 focus:z-[9999] focus:bg-white focus:text-black focus:px-6 focus:py-3 focus:text-sm focus:font-mono focus:tracking-tighter focus:uppercase">
          Skip to content_
        </a>

        <Header 
          scrollY={scrollY}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          language={language}
          setLanguage={setLanguage}
          t={t}
        />

        <main id="main-content" className="relative z-10 flex flex-col gap-0">
          <Hero t={t} />
          <TechStack />
          
          <div className="relative">
             <Suspense fallback={<div className="h-20 w-full"></div>}>
                <Stats t={t} />
             </Suspense>

             <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-12"></div>
             
             <Suspense fallback={<div className="h-40 w-full flex items-center justify-center opacity-20 font-mono text-xs">LOADING_MODULES...</div>}>
                <Services t={t} />
                <Projects t={t} />
                <About t={t} />
                <Process t={t} />
                
                {/* Optimisation "content-auto" pour le bas de page */}
                <div className="content-auto">
                   <CTA t={t} />
                   <Contact t={t} />
                </div>
             </Suspense>
          </div>
        </main>

        <Footer t={t} />
      </div>
    </>
  );
};

export default IntelloAgency;