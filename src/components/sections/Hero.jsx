import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Code2, Terminal } from 'lucide-react';

const Hero = ({ t }) => {
  // 1. État d'initialisation optimisé
  // On part du principe que c'est mobile par défaut pour l'hydratation (Mobile First)
  // Cela évite le flash de contenu "Desktop" sur un téléphone.
  const [isMobile, setIsMobile] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Vérification immédiate après le mount
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();

    // Listener passif pour la performance
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkMobile, 200); // Debounce augmenté à 200ms
    };
    
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // 2. Memoization des variantes d'animation (Sauve du CPU)
  const variants = useMemo(() => ({
    container: {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: { staggerChildren: 0.05, delayChildren: 0.1 } 
      }
    },
    item: {
      hidden: { y: 20, opacity: 0 },
      visible: { 
        y: 0, 
        opacity: 1,
        transition: { type: "spring", stiffness: 100, damping: 15 }
      }
    }
  }), []);

  // 3. Helper pour le rendu conditionnel sans recréer de composants
  // Si mobile : on rend un div simple (0 overhead JS). Si Desktop : motion.div
  const Wrapper = isMobile ? 'div' : motion.div;
  const TextWrapper = isMobile ? 'span' : motion.span;
  const PWrapper = isMobile ? 'p' : motion.p;

  // Props dynamiques simplifiées pour éviter la pollution du code
  const animProps = (isContainer = false) => {
    if (isMobile) return {};
    return isContainer 
      ? { variants: variants.container, initial: "hidden", animate: "visible" }
      : { variants: variants.item };
  };

  return (
    <section 
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20"
      aria-label="Accueil Intello"
    >
      {/* --- DÉCOR TECHNIQUE (Optimisé : Rendu conditionnel strict) --- */}
      {/* On ne rend le décor que si on est monté et sur Desktop pour alléger le DOM Mobile */}
      {!isMobile && isMounted && (
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-white/5"></div>
          <div className="absolute right-6 top-0 bottom-0 w-px bg-white/5"></div>
          
          <div className="absolute top-32 left-10 font-mono text-[10px] text-white/20 tracking-widest">
            SYS.VER.2025.1
          </div>
          <div className="absolute bottom-10 right-10 font-mono text-[10px] text-white/20 tracking-widest flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500/50 rounded-full animate-pulse"></div>
            <span>SYSTEM_READY</span>
          </div>
          
          <div>
              <div className="absolute top-24 left-6 w-4 h-px bg-white/20"></div>
              <div className="absolute top-24 right-6 w-4 h-px bg-white/20"></div>
              <div className="absolute bottom-6 left-6 w-4 h-px bg-white/20"></div>
              <div className="absolute bottom-6 right-6 w-4 h-px bg-white/20"></div>
          </div>
        </div>
      )}

      {/* --- CONTENU PRINCIPAL --- */}
      <div className="relative z-10 w-full max-w-6xl px-6 md:px-12 will-change-transform">
        
        {/* Badge "Disponible" */}
        <Wrapper 
          {...(!isMobile && {
            initial: { opacity: 0, y: -10 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.1 }
          })}
          className="flex justify-center mb-8"
        >
          <div className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 md:backdrop-blur-sm flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              {!isMobile && <span className="animate-ping absolute h-full w-full rounded-full bg-cyan-400 opacity-75"></span>}
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="text-xs font-mono text-cyan-300 tracking-wider uppercase">
              {t?.hero?.status || "Available for new projects"}
            </span>
          </div>
        </Wrapper>

        {/* Gros Titre */}
        <Wrapper {...animProps(true)} className="text-center">
          <PWrapper 
            {...animProps()} 
            className="font-mono text-sm md:text-base text-white/40 mb-4 tracking-[0.2em] uppercase"
          >
            {t?.hero?.subtitle_prefix || "Architecting the Future"}
          </PWrapper>

          {/* H1 OPTIMISÉ LCP */}
          {/* content-visibility: auto aide le navigateur à prioriser le rendu */}
          <h1 className="font-extrabold text-5xl md:text-7xl lg:text-9xl tracking-tighter leading-[0.9] mb-6 text-white" style={{ contentVisibility: 'auto' }}>
            <TextWrapper {...animProps()} className="block">
              {t?.hero?.title1 || "CODE."}
            </TextWrapper>
            
            <TextWrapper 
              {...animProps()} 
              className="block text-white md:text-transparent md:bg-clip-text md:bg-gradient-to-b md:from-white md:via-white md:to-white/40"
            >
              {t?.hero?.title2 || "CRAFT."}
            </TextWrapper>
            
            <TextWrapper 
              {...animProps()} 
              className="block text-cyan-300 md:text-transparent md:bg-clip-text md:bg-gradient-to-r md:from-cyan-200 md:to-blue-500"
            >
              {t?.hero?.title3 || "SCALE."}
            </TextWrapper>
          </h1>

          <PWrapper 
            {...animProps()} 
            className="max-w-2xl mx-auto text-lg md:text-xl text-gray-400 font-light leading-relaxed mb-10"
          >
            {t?.hero?.subtitle}
          </PWrapper>

          {/* Boutons d'action */}
          <Wrapper 
            {...animProps()}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              to="/contact"
              className="group relative px-8 py-4 bg-white text-black rounded-lg font-bold overflow-hidden hover:scale-[1.02] transition-transform duration-200 w-full sm:w-auto flex justify-center items-center"
            >
              {!isMobile && <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />}
              <span className="relative flex items-center gap-2">
                <Terminal className="w-4 h-4 flex-shrink-0" />
                <span>{t?.hero?.cta1 || "Start a project"}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 flex-shrink-0" />
              </span>
            </Link>

            <a 
              href="#projets"
              className="group px-8 py-4 border border-white/10 bg-white/5 text-white rounded-lg font-medium hover:bg-white/10 transition-colors md:backdrop-blur-sm flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <Code2 className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors flex-shrink-0" />
              <span>{t?.hero?.cta2 || "View Work"}</span>
            </a>
          </Wrapper>
        </Wrapper>
      </div>

      {/* --- BANDEAU DE CODE DÉFILANT (Strictement Desktop) --- */}
      {!isMobile && isMounted && (
        <div className="absolute bottom-0 w-full border-t border-white/5 bg-black/50 backdrop-blur-md py-3 overflow-hidden pointer-events-none">
          <div className="animate-marquee whitespace-nowrap flex gap-8 font-mono text-xs text-white/20">
            <span>REACT_VERSION: 19.0.0</span><span>•</span>
            <span>NEXT_GEN_UI</span><span>•</span>
            <span>PERFORMANCE_OPTIMIZED</span><span>•</span>
            <span>SECURE_CONNECTION</span><span>•</span>
            <span>NODE_ENV: PRODUCTION</span><span>•</span>
            <span>SERVER_REGION: DAKAR_EDGE</span><span>•</span>
            <span>REACT_VERSION: 19.0.0</span><span>•</span>
            <span>NEXT_GEN_UI</span>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;