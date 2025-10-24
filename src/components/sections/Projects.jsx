import React from 'react';
import { ArrowRight } from 'lucide-react';

const Projects = ({ t }) => {
  const projects = [
    { name: "FinTech Dashboard", category: t.nav.services === "Services" ? "Finance" : "Finance", color: "bg-blue-600" },
    { name: "E-Commerce Platform", category: t.nav.services === "Services" ? "Retail" : "Retail", color: "bg-purple-600" },
    { name: "Health App", category: t.nav.services === "Services" ? "Santé" : "Health", color: "bg-green-600" },
    { name: "Social Network", category: "Social", color: "bg-pink-600" }
  ];

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
          {projects.map((project, i) => (
            <article 
              key={i} 
              className="group relative h-80 md:h-72 rounded-3xl overflow-hidden cursor-pointer"
              role="listitem"
              tabIndex="0"
              aria-label={`Projet ${project.name} - Catégorie: ${project.category}`}
            >
              <div className={`absolute inset-0 ${project.color} transition-transform duration-700 group-hover:scale-110`} aria-hidden="true" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60" aria-hidden="true" />
              <div className="relative h-full flex flex-col justify-end p-8">
                <div className="text-sm text-gray-300 mb-2">{project.category}</div>
                <h3 className="text-3xl font-bold mb-4">{project.name}</h3>
                <div className="flex items-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0" aria-hidden="true">
                  <span className="mr-2">{t.projects.viewProject}</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;