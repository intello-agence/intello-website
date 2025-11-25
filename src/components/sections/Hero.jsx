import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Code2, Terminal } from 'lucide-react';

const Hero = ({ t }) => {
  // Detection immédiate
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 768 : true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Memoization des variantes pour Desktop uniquement
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

  // RENDU CONDITIONNEL PUR : Pas de ternaire à l'intérieur des balises
  // Si Mobile : On rend du HTML pur sans Framer Motion (Gain LCP énorme)
  if (isMobile) {
    return (
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
        <div className="relative z-10 w-full max-w-6xl px-6 text-center">
          
          {/* Badge Static */}
          <div className="flex justify-center mb-8">
            <div className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 flex items-center gap-3">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              <span className="text-xs font-mono text-cyan-300 tracking-wider uppercase">
                {t?.hero?.status || "Available"}
              </span>
            </div>
          </div>

          {/* Titre Static - Blanc Pur pour peindre vite */}
          <p className="font-mono text-sm text-white/40 mb-4 tracking-[0.2em] uppercase">
            {t?.hero?.subtitle_prefix || "Architecting the Future"}
          </p>

          <h1 className="font-extrabold text-5xl tracking-tighter leading-[0.9] mb-6 text-white">
            <span className="block">{t?.hero?.title1 || "CODE."}</span>
            <span className="block text-white">{t?.hero?.title2 || "CRAFT."}</span>
            <span className="block text-cyan-300">{t?.hero?.title3 || "SCALE."}</span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg text-gray-400 font-light leading-relaxed mb-10">
            {t?.hero?.subtitle}
          </p>

          {/* Boutons Static */}
          <div className="flex flex-col gap-4 justify-center items-center">
            <Link to="/contact" className="px-8 py-4 bg-white text-black rounded-lg font-bold w-full flex justify-center items-center gap-2">
              <Terminal className="w-4 h-4" />
              <span>{t?.hero?.cta1 || "Start"}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="#projets" className="px-8 py-4 border border-white/10 bg-white/5 text-white rounded-lg font-medium w-full flex items-center justify-center gap-2">
              <Code2 className="w-4 h-4 text-gray-400" />
              <span>{t?.hero?.cta2 || "Work"}</span>
            </a>
          </div>
        </div>
      </section>
    );
  }

  // --- VERSION DESKTOP (Avec Animations) ---
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
      {/* Décor Desktop */}
      {isMounted && (
        <div className="absolute inset-0 pointer-events-none select-none">
           <div className="absolute left-6 top-0 bottom-0 w-px bg-white/5"></div>
           <div className="absolute right-6 top-0 bottom-0 w-px bg-white/5"></div>
           <div className="absolute top-32 left-10 font-mono text-[10px] text-white/20 tracking-widest">SYS.VER.2025.1</div>
        </div>
      )}

      <motion.div 
        initial="hidden"
        animate="visible"
        variants={variants.container}
        className="relative z-10 w-full max-w-6xl px-12 text-center"
      >
        <motion.div variants={variants.item} className="flex justify-center mb-8">
          <div className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="text-xs font-mono text-cyan-300 tracking-wider uppercase">
              {t?.hero?.status || "Available"}
            </span>
          </div>
        </motion.div>

        <motion.p variants={variants.item} className="font-mono text-base text-white/40 mb-4 tracking-[0.2em] uppercase">
          {t?.hero?.subtitle_prefix}
        </motion.p>

        <h1 className="font-extrabold text-7xl lg:text-9xl tracking-tighter leading-[0.9] mb-6 text-white">
          <motion.span variants={variants.item} className="block">{t?.hero?.title1}</motion.span>
          <motion.span variants={variants.item} className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40">
            {t?.hero?.title2}
          </motion.span>
          <motion.span variants={variants.item} className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-blue-500">
            {t?.hero?.title3}
          </motion.span>
        </h1>

        <motion.p variants={variants.item} className="max-w-2xl mx-auto text-xl text-gray-400 font-light leading-relaxed mb-10">
          {t?.hero?.subtitle}
        </motion.p>

        <motion.div variants={variants.item} className="flex flex-row gap-4 justify-center items-center">
            <Link to="/contact" className="group relative px-8 py-4 bg-white text-black rounded-lg font-bold overflow-hidden hover:scale-[1.02] transition-transform duration-200 flex items-center gap-2">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              <Terminal className="w-4 h-4" />
              <span>{t?.hero?.cta1}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a href="#projets" className="px-8 py-4 border border-white/10 bg-white/5 text-white rounded-lg font-medium hover:bg-white/10 transition-colors backdrop-blur-sm flex items-center justify-center gap-2">
              <Code2 className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
              <span>{t?.hero?.cta2}</span>
            </a>
        </motion.div>
      </motion.div>

      {isMounted && (
        <div className="absolute bottom-0 w-full border-t border-white/5 bg-black/50 backdrop-blur-md py-3 overflow-hidden pointer-events-none">
          <div className="animate-marquee whitespace-nowrap flex gap-8 font-mono text-xs text-white/20">
            <span>REACT_VERSION: 19.0.0</span><span>•</span><span>NEXT_GEN_UI</span>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;