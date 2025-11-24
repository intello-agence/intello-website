import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Code2, Terminal } from 'lucide-react';

const Hero = ({ t }) => {
  // ✅ OPTIMISATION CRITIQUE #1 : Lazy Initialization
  // On vérifie la taille de l'écran AVANT le premier rendu.
  // Cela évite que le mobile charge d'abord la version Desktop (lourde) pour ensuite changer.
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });

  useEffect(() => {
    // Debounce simple pour éviter de spammer le resize
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth < 768);
      }, 150);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // Composants conditionnels : Sur mobile, on utilise des balises HTML natives instantanées
  const MotionDiv = isMobile ? 'div' : motion.div;
  const MotionP = isMobile ? 'p' : motion.p;
  const MotionSpan = isMobile ? 'span' : motion.span;

  // Variantes Desktop uniquement
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.05,
        delayChildren: 0.1
      } 
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 } // Plus doux
    }
  };

  return (
    <section 
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20"
      aria-label="Interface d'accueil"
    >
      {/* --- DÉCOR TECHNIQUE (HUD) --- */}
      {/* Optimisation : pointer-events-none et structure simplifiée */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {/* CSS pur pour cacher sur mobile (hidden md:block) = 0 JS calculation */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-white/5 hidden md:block"></div>
        <div className="absolute right-6 top-0 bottom-0 w-px bg-white/5 hidden md:block"></div>
        
        <div className="absolute top-32 left-10 font-mono text-[10px] text-white/20 tracking-widest hidden md:block">
          SYS.VER.2025.1
        </div>
        <div className="absolute bottom-10 right-10 font-mono text-[10px] text-white/20 tracking-widest hidden md:flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500/50 rounded-full animate-pulse"></div>
          <span>SYSTEM_READY</span>
        </div>
        
        {/* Croix simplifiées : SVG est souvent plus léger que 4 divs séparées pour le layout engine */}
        <div className="hidden md:block">
            <div className="absolute top-24 left-6 w-4 h-px bg-white/20"></div>
            <div className="absolute top-24 right-6 w-4 h-px bg-white/20"></div>
            <div className="absolute bottom-6 left-6 w-4 h-px bg-white/20"></div>
            <div className="absolute bottom-6 right-6 w-4 h-px bg-white/20"></div>
        </div>
      </div>

      {/* --- CONTENU PRINCIPAL --- */}
      {/* will-change-transform aide le navigateur à préparer le rendu */}
      <div className="relative z-10 w-full max-w-6xl px-6 md:px-12 will-change-transform">
        
        {/* Badge "Disponible" */}
        <MotionDiv 
          {...(!isMobile && {
            initial: { opacity: 0, y: -10 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.1 }
          })}
          className="flex justify-center mb-8"
        >
          {/* Optimisation : Suppression du backdrop-blur sur mobile (très coûteux) */}
          <div className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 md:backdrop-blur-sm flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="hidden md:inline-flex animate-ping absolute h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="text-xs font-mono text-cyan-300 tracking-wider uppercase">
              {t.hero.status || "Available for new projects"}
            </span>
          </div>
        </MotionDiv>

        {/* Gros Titre */}
        <MotionDiv 
          {...(!isMobile && {
            variants: containerVariants,
            initial: "hidden",
            animate: "visible"
          })}
          className="text-center"
        >
          <MotionP 
            {...(!isMobile && { variants: itemVariants })} 
            className="font-mono text-sm md:text-base text-white/40 mb-4 tracking-[0.2em] uppercase"
          >
            {t.hero.subtitle_prefix || "Architecting the Future"}
          </MotionP>

          {/* ✅ OPTIMISATION LCP : Titre prioritaire */}
          {/* Sur mobile, on évite les gradients text-transparent complexes qui retardent le rendu du texte */}
          <h1 className="font-extrabold text-5xl md:text-7xl lg:text-9xl tracking-tighter leading-[0.9] mb-6 text-white">
            <MotionSpan 
              {...(!isMobile && { variants: itemVariants })} 
              className="block"
            >
              {t.hero.title1 || "CODE."}
            </MotionSpan>
            
            <MotionSpan 
              {...(!isMobile && { variants: itemVariants })} 
              // Sur mobile : Blanc pur (plus rapide à peindre). Desktop : Gradient.
              className="block text-white md:text-transparent md:bg-clip-text md:bg-gradient-to-b md:from-white md:via-white md:to-white/40"
            >
              {t.hero.title2 || "CRAFT."}
            </MotionSpan>
            
            <MotionSpan 
              {...(!isMobile && { variants: itemVariants })} 
              // Sur mobile : Cyan simple. Desktop : Gradient complexe.
              className="block text-cyan-300 md:text-transparent md:bg-clip-text md:bg-gradient-to-r md:from-cyan-200 md:to-blue-500"
            >
              {t.hero.title3 || "SCALE."}
            </MotionSpan>
          </h1>

          <MotionP 
            {...(!isMobile && { variants: itemVariants })} 
            className="max-w-2xl mx-auto text-lg md:text-xl text-gray-400 font-light leading-relaxed mb-10"
          >
            {t.hero.subtitle}
          </MotionP>

          {/* Boutons d'action */}
          <MotionDiv 
            {...(!isMobile && { variants: itemVariants })}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              to="/contact"
              className="group relative px-8 py-4 bg-white text-black rounded-lg font-bold overflow-hidden hover:scale-[1.02] transition-transform duration-200 w-full sm:w-auto flex justify-center"
            >
              {/* Gradient désactivé sur mobile pour perf ou simplifié */}
              <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              <span className="relative flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                <span>{t.hero.cta1}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>

            <a 
              href="#projets"
              className="group px-8 py-4 border border-white/10 bg-white/5 text-white rounded-lg font-medium hover:bg-white/10 transition-colors md:backdrop-blur-sm flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <Code2 className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
              <span>{t.hero.cta2}</span>
            </a>
          </MotionDiv>
        </MotionDiv>
      </div>

      {/* --- BANDEAU DE CODE DÉFILANT (Desktop only) --- */}
      {/* Strictement caché sur mobile via CSS pour éviter tout calcul de layout */}
      <div className="hidden md:flex absolute bottom-0 w-full border-t border-white/5 bg-black/50 backdrop-blur-md py-3 overflow-hidden pointer-events-none">
        <div className="animate-marquee whitespace-nowrap flex gap-8 font-mono text-xs text-white/20">
          <span>REACT_VERSION: 19.0.0</span>
          <span>•</span>
          <span>NEXT_GEN_UI</span>
          <span>•</span>
          <span>PERFORMANCE_OPTIMIZED</span>
          <span>•</span>
          <span>SECURE_CONNECTION</span>
          <span>•</span>
          <span>NODE_ENV: PRODUCTION</span>
          <span>•</span>
          <span>SERVER_REGION: DAKAR_EDGE</span>
          {/* Duplication pour loop */}
          <span>REACT_VERSION: 19.0.0</span>
          <span>•</span>
          <span>NEXT_GEN_UI</span>
          <span>•</span>
          <span>PERFORMANCE_OPTIMIZED</span>
          <span>•</span>
          <span>SECURE_CONNECTION</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;