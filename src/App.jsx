import React, { useState, useEffect, lazy, Suspense, useRef } from 'react';
import Lenis from 'lenis'; 
import { useTranslation } from './hooks/useTranslation';
import { useScrollPosition } from './hooks/useScrollPosition';
import SEO from './components/ui/SEO';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import './styles/animations.css';
import Hero from './components/sections/Hero';

// Lazy loads...
const Stats = lazy(() => import('./components/sections/Stats'));
const Services = lazy(() => import('./components/sections/Services'));
const Projects = lazy(() => import('./components/sections/Projects'));
const About = lazy(() => import('./components/sections/About'));
const Process = lazy(() => import('./components/sections/Process'));
const CTA = lazy(() => import('./components/sections/CTA'));
const Contact = lazy(() => import('./components/sections/Contact'));

// --- COMPOSANT DE FOND "MATRIX / TECH" OPTIMISÉ ---
// Modification : Plus de props mouseX/mouseY. Il gère sa propre logique via Refs pour éviter les re-renders.
const TechBackground = () => {
  const containerRef = useRef(null);
  const spotlightRef = useRef(null);

  useEffect(() => {
    // ✅ OPTIMISATION CRITIQUE : Détection stricte du mobile/tactile
    // Si on est sur mobile, on n'attache même pas l'écouteur d'événement.
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 1024;
    
    if (isTouchDevice) return;

    const handleMouseMove = (e) => {
      if (!spotlightRef.current) return;
      
      // ✅ PERFORMANCE : Manipulation directe du DOM via CSS Variables.
      // Cela ne déclenche AUCUN re-render React (le composant ne se recharge pas).
      // C'est le GPU qui gère le visuel, le CPU reste au repos.
      spotlightRef.current.style.setProperty('--x', `${e.clientX}px`);
      spotlightRef.current.style.setProperty('--y', `${e.clientY}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[-1] h-full w-full bg-[#050505]">
      {/* Grille */}
      <div className="absolute h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* Spotlight : Caché sur mobile (hidden) et affiché sur Desktop (lg:block)
          Utilise les variables CSS --x et --y injectées par le JS sans re-render */}
      <div 
        ref={spotlightRef}
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 hidden lg:block"
        style={{
          background: `radial-gradient(600px circle at var(--x, 50%) var(--y, 50%), rgba(255,255,255,0.06), transparent 40%)`
        }} 
      />
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505/80]"></div>
      
      {/* Grain (Texture) */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none select-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>
    </div>
  );
};

const IntelloAgency = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollY = useScrollPosition();
  const { t, language, setLanguage } = useTranslation();
  
  // ✅ OPTIMISATION : Suppression complète du State "mouse" ici.
  // Cela empêche l'application entière de se redessiner à chaque pixel de mouvement de souris.

  // --- INIT LENIS (SMOOTH SCROLL) OPTIMISÉ ---
  useEffect(() => {
    // ✅ OPTIMISATION : Désactivation de Lenis sur mobile (< 768px).
    // Le scroll natif mobile est plus performant et économise la batterie/CPU.
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) return;

    const lenis = new Lenis({
      duration: 0.9, // Plus réactif
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false, // Important: false pour éviter les conflits tactiles
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!t) return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-white font-mono">
      <div className="w-8 h-8 border-2 border-t-transparent border-white rounded-full animate-spin mb-4"></div>
      <p className="text-xs tracking-widest opacity-50 animate-pulse">INITIALIZING SYSTEM...</p>
    </div>
  );

  // ✅ JSON-LD COMPLET CONSERVÉ
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

      {/* Background Tech séparé - ne reçoit plus de props */}
      <TechBackground />

      <div className="relative text-white min-h-screen overflow-x-hidden font-sans selection:bg-white/20 selection:text-cyan-300">
        
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-6 focus:left-6 focus:z-[9999] focus:bg-white focus:text-black focus:px-6 focus:py-3 focus:text-sm focus:font-mono focus:tracking-tighter focus:uppercase"
        >
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
          
          <Suspense fallback={<div className="h-40 w-full flex items-center justify-center opacity-20 font-mono text-xs">LOADING_MODULES...</div>}>
            <div className="relative">
               <Stats t={t} />
               <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-12"></div>
               <Services t={t} />
               <Projects t={t} />
               <About t={t} />
               <Process t={t} />
               <CTA t={t} />
               <Contact t={t} />
            </div>
          </Suspense>
        </main>

        <Footer t={t} />
      </div>
    </>
  );
};

export default IntelloAgency;