// src/components/sections/Projects.jsx
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { projects as allProjects } from '../../data/projects';

const Projects = ({ t }) => {
  // Récupérer les 4 projets les plus récents (triés par date décroissante)
  const recentProjects = useMemo(() => {
    return [...allProjects]
      .sort((a, b) => {
        // Tri par date "YYYY-MM" décroissant (plus récent d'abord)
        const dateA = a.date || '0000-00';
        const dateB = b.date || '0000-00';
        return dateB.localeCompare(dateA);
      })
      .slice(0, 4); // Garder les 4 premiers
  }, []);

  // Couleurs par catégorie (mapping automatique)
  const categoryColors = {
    'Finance': 'bg-blue-600',
    'E-commerce': 'bg-purple-600',
    'Santé': 'bg-green-600',
    'Éducation': 'bg-amber-600',
    'Hospitalité': 'bg-red-600',
    'Immobilier': 'bg-teal-600',
    'Événementiel': 'bg-pink-600',
    'Web Design': 'bg-indigo-600'
  };

  return (
    <section 
      id="projets" 
      className="py-32 px-6 relative"
      aria-labelledby="projects-title"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 id="projects-title" className="text-5xl md:text-6xl font-bold mb-6">
            {t.projects.title} <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">{t.projects.titleHighlight}</span>
          </h2>
          <p className="text-xl text-gray-400">{t.projects.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6" role="list">
          {recentProjects.map((project, i) => (
            <Link
              key={project.id}
              to={`/portfolio/${project.id}`}
              className="group relative h-80 md:h-72 rounded-3xl overflow-hidden cursor-pointer block"
              role="listitem"
              aria-label={`Voir le projet ${project.title} - Catégorie: ${project.category}`}
            >
              {/* Image de fond */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${project.image})` }}
                aria-hidden="true"
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" aria-hidden="true" />

              {/* Overlay couleur catégorie (léger) */}
              <div 
                className={`absolute inset-0 ${categoryColors[project.category] || 'bg-gray-600'} opacity-20 mix-blend-multiply transition-opacity duration-300 group-hover:opacity-30`}
                aria-hidden="true"
              />

              {/* Contenu */}
              <div className="relative h-full flex flex-col justify-end p-8">
                <div className="text-sm text-gray-300 mb-2 uppercase tracking-wider">
                  {project.category}
                </div>
                <h3 className="text-3xl font-bold mb-2 line-clamp-2">
                  {project.title}
                </h3>
                <p className="text-gray-300 text-sm mb-4 line-clamp-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  {project.short}
                </p>
                <div className="flex items-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <span className="mr-2 font-semibold">{t.projects.viewProject}</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Lien vers portfolio complet */}
        <div className="text-center mt-16">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-gray-100 transition-all duration-300 hover:scale-105"
            aria-label="Voir tous nos projets"
          >
            <span>Voir tous les projets ({allProjects.length})</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Projects;