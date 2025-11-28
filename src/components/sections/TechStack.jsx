import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';

const technologies = [
  { name: 'React', color: 'hover:text-[#61DAFB]' },
  { name: 'Next.js', color: 'hover:text-white' },
  { name: 'TypeScript', color: 'hover:text-[#3178C6]' },
  { name: 'Node.js', color: 'hover:text-[#339933]' },
  { name: 'Tailwind', color: 'hover:text-[#06B6D4]' },
  { name: 'Supabase', color: 'hover:text-[#3ECF8E]' },
  { name: 'Vercel', color: 'hover:text-white' },
  { name: 'Framer Motion', color: 'hover:text-[#0055FF]' },
  { name: 'PostgreSQL', color: 'hover:text-[#4169E1]' },
  { name: 'Docker', color: 'hover:text-[#2496ED]' },
];

const items = [...technologies, ...technologies, ...technologies];

const TechStack = () => {
  const { t } = useTranslation();

  if (!t) return null;

  return (
    <>
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.33%); }
          }
          .animate-scroll {
            animation: scroll 40s linear infinite;
          }
          .animate-scroll:hover {
            animation-play-state: paused;
          }
        `}
      </style>

      <section className="w-full py-10 border-y border-white/5 bg-black/20 backdrop-blur-sm overflow-hidden">
        {/* Titre */}
        <div className="max-w-7xl mx-auto px-6 mb-6 text-center md:text-left">
          <p className="text-xs font-mono text-gray-500 uppercase tracking-[0.2em]">
            {t.techstack.title}
          </p>
        </div>

        {/* Bandeau animé */}
        <div className="relative w-full overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

          <div className="flex w-max animate-scroll">
            {items.map((tech, index) => (
              <div
                key={index}
                className={`flex items-center justify-center px-8 md:px-12 text-2xl md:text-3xl font-bold text-gray-800 ${tech.color} transition-colors duration-300 cursor-default font-mono select-none`}
              >
                {tech.name}
              </div>
            ))}
          </div>
        </div>

        {/* Phrase statique SEO */}
        <div className="max-w-7xl mx-auto px-6 mt-6 text-center md:text-left">
          <p className="text-sm text-gray-400 leading-relaxed">
            {t.techstack.description}
          </p>
        </div>
      </section>
    </>
  );
};

export default TechStack;